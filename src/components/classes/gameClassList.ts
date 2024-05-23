import {BackgroundInterface, ObjectInterface, PhysicalObjectInterface, PlayerInterface } from "../../types/types";
import arrayOfObject from "../Objects";

let idPrimaryKey = 0;
export class ObjectClass {
    id:number = 0;
    objWidth:number = 0;
    objHeight:number = 0;
    x:number = 0;
    y:number = 0;
    objPos: string = "top"
    color:string = "";
    unitX:string = "px";
    unitY:string = "px";
    img:string = "";
    mirror:boolean = false;
    constructor(object:ObjectInterface){
        this.id = idPrimaryKey;
        this.objWidth = object.objWidth || 0;
        this.objHeight = object.objHeight || 0;
        this.x = object.x || 0;
        this.y = object.y || 0;
        this.unitX = object.unitX || "px";
        this.unitY = object.unitY || "px";
        this.color = object.color || "";
        this.objPos = object.objPos || "bottom";
        this.img = object.img || "";
        idPrimaryKey++;
    }
}
export class BackgroundObject extends ObjectClass{
    paralax: number = 1;
    backgroundPos:string = "center";
    backgroundSize:string = "cover";
    backgroundRepeat: boolean = false;
    constructor(
        object:ObjectInterface,
        background:BackgroundInterface,
    ){
        super(object);
        this.paralax = background.paralax || 1;
        this.backgroundPos = background.backgroundPos || "center";
        this.backgroundSize = background.backgroundSize || "cover";
        this.backgroundRepeat = background.backgroundRepeat || false;
    }
}
export class PhysicalObject extends ObjectClass{
    objIsSolid: boolean = false;
    constructor(
        object:Object,
        physicalObj:PhysicalObjectInterface){
        super(object);
        this.objIsSolid = physicalObj.isSolid || false;
    }
}
export class Player extends PhysicalObject{
    initialWeightJump: number = 0.2;
    weightJump: number = 0.2;
    initialSpeed:number = 0.2;
    speed:number = 0.2;
    initialFallspeed:number = 0.15;
    fallspeed:number = 0.15;
    move:boolean = true;
    jumpCommand:boolean = false;
    canJump:boolean = true;
    jumpLoop:number = 0;
    fallMultiplier:number = 0.1;
    moveDirection:number = 0;
    speedMultiplier:number = 0.1;
    solidXContact:boolean = false;
    solidBottomYContact:boolean = false;
    solidTopYContact:boolean = false;
    rightMove:boolean = true;
    leftMove:boolean = true;
    constructor(
        object:Object,
        physicalObj:PhysicalObjectInterface,
        player:PlayerInterface){
            super(object,physicalObj);
            this.initialWeightJump = player.initialWeightJump;
            this.initialFallspeed = player.initialFallspeed
            this.initialSpeed = player.initialSpeed
        }
    controlJump(keyJump:string){
        if(this.jumpLoop >= Math.floor(this.initialWeightJump * 40)){
            this.jumpCommand = false;
            this.canJump = false;
            this.jumpLoop = 0;
            this.move = true;
        }
        if(this.jumpCommand && this.canJump){
            if(this.objPos === "bottom"){
                if(!this.solidTopYContact){
                    this.weightJump = this.initialWeightJump * 150 - this.jumpLoop;
                }
                this.y = this.y + this.weightJump;
            }
            this.jumpLoop++;
            this.move = false;
        }
        document.addEventListener('keydown',(e)=>{
            if(e.code === keyJump){
                this.jumpCommand = true;
                return;
            }
        })
    }
    controlMove(keyLeft:string,keyRight:string){
        if(this.moveDirection == 0){
            this.speedMultiplier = 0;
        }
        if(this.moveDirection != 0){
        this.speedMultiplier = this.speedMultiplier >= 10 ? 10 : this.speedMultiplier + this.speedMultiplier/10 +0.5
        if(!this.solidXContact){
            this.speed = (this.initialSpeed * 20 + (this.speedMultiplier / 2) + (!this.jumpCommand && !this.canJump ? this.initialWeightJump*25 : 0) + (this.jumpCommand && this.canJump ? this.initialWeightJump*35 : 0));
        }
        if(this.moveDirection == 1 && this.rightMove){
            this.mirror = true;
            this.x = this.x + this.speed;
        }
        if(this.moveDirection == 2 && this.leftMove){
            this.mirror = false;
            this.x = this.x - this.speed;
        }
        }
        document.addEventListener('keydown',(e)=>{
            if(e.code === keyRight){
              this.moveDirection = 1;
              return;
            }
            if(e.code === keyLeft){
              this.moveDirection = 2;
              return;
            }
          })
          document.addEventListener('keyup',(e)=>{
            if((e.code === keyRight && this.moveDirection == 1) || (e.code === keyLeft && this.moveDirection == 2)){
              this.moveDirection = 0;
              this.speedMultiplier = 0.1;
            }
          })
    }
    
    physicEmulation(){
        const playerLeftX = this.x;
        const playerBottomY = this.y;
        const playerW = this.objWidth;
        const playerH = this.objHeight;
        const playerRightX = playerLeftX + playerW;
        const playerTopY = playerBottomY + playerH;
        if(!this.rightMove){
            this.rightMove = true;
        }
        if(!this.leftMove){
            this.leftMove = true;
        }
        arrayOfObject.physicalObject.forEach((el:PhysicalObject)=>{
            if(!el.objIsSolid){
                return;
            }
            if(arrayOfObject.player == undefined){
                return;
            }
            const objectLeftX = el.x;
            const objectBottomY = el.y;
            const objectW = el.objWidth;
            const objectH = el.objHeight;
            const objectRightX = objectLeftX + objectW;
            const objectTopY = objectBottomY + objectH;

            const checkX = playerRightX >= objectLeftX && playerLeftX <= objectRightX;
            const checkY = playerTopY >= objectBottomY && playerBottomY <= objectTopY;

            const futureBottom = playerBottomY - this.fallspeed;
            if(objectTopY >= futureBottom && playerBottomY > objectBottomY && checkX){
                this.fallspeed = playerBottomY - objectTopY;
                if(this.fallspeed <= 0){
                    this.fallspeed = 0;
                    this.move = false;
                }
                this.fallMultiplier = 0;
                this.canJump = true;
                this.solidBottomYContact = true;
                if(objectTopY > playerBottomY && playerBottomY - objectTopY < 0){
                    this.y = objectTopY;
                }
            }else{
                this.solidBottomYContact = false;
            }
            const futureTop = playerTopY + this.weightJump;
            if(objectBottomY <= futureTop && playerTopY < objectBottomY && checkX){
                this.weightJump = objectBottomY - playerTopY;
                this.jumpCommand = false;
                this.canJump = false;
                this.jumpLoop = 0;
                this.move = true;
                this.y = this.y + this.weightJump;
                this.solidTopYContact = true;
            }else{
                this.solidTopYContact = false;
            }

            const futureRight = playerRightX + this.speed;
            if(objectLeftX <= futureRight && playerRightX < objectLeftX + 0.01 && checkY){
                this.rightMove = false;
                this.x = this.x + (objectLeftX - playerRightX) - 0.001;
                this.speedMultiplier = 0;
                this.solidXContact = true;
            }else{
                this.solidXContact = false;
            }
            const futureLeft = playerLeftX - this.speed;
            if(objectRightX >= futureLeft && playerLeftX > objectRightX - 0.01 && checkY){
                this.leftMove = false;
                this.x = objectRightX + 0.001;
                this.speedMultiplier = 0;
                this.solidXContact = true;
            }else{
                this.solidXContact = false;
            }
            return;
        })
        if(!this.move){
            this.move = true;
            return;
        }
        if(this.objPos === "bottom"){
            this.canJump = false;
            this.jumpCommand = false;
            this.fallMultiplier = this.fallMultiplier + 0.2;
            if(!this.solidBottomYContact){
                this.fallspeed = (this.initialFallspeed * 100) * this.fallMultiplier;
            }
            this.y = this.y - this.fallspeed;
        }
    }
}