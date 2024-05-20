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
    weightJump: number = 0.2;
    speed:number = 0.2;
    fallspeed:number = 0.15;
    move:boolean = true;
    jumpCommand:boolean = false;
    canJump:boolean = true;
    jumpLoop:number = 0;
    fallMultiplier:number = 0.1;
    moveDirection:number = 0;
    speedMultiplier:number = 0.1;
    constructor(
        object:Object,
        physicalObj:PhysicalObjectInterface,
        player:PlayerInterface){
            super(object,physicalObj);
            this.weightJump = player.weightJump;
            this.speed = player.speed;
            this.fallspeed = player.fallspeed
        }
    controlJump(keyJump:string){
        if(this.jumpLoop >= 9){
            this.jumpCommand = false;
            this.canJump = false;
            this.jumpLoop = 0;
            this.move = true;
        }
        if(this.jumpCommand && this.canJump){
            if(this.objPos === "bottom"){
                this.y = this.y + this.weightJump * 150 - this.jumpLoop;
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
        const moveSpeed = ((this.speed * 20 + (this.speedMultiplier / 2)) + (!this.jumpCommand && !this.canJump ? this.weightJump*25 : 0) + (this.jumpCommand && this.canJump ? this.weightJump*35 : 0))
        if(this.moveDirection == 1){
            this.mirror = true;
            this.x = this.x + moveSpeed;
        }
        if(this.moveDirection == 2){
            this.mirror = false;
            this.x = this.x - moveSpeed;
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
        const playerX = this.x;
        const playerY = this.y;
        const playerW = this.objWidth;
        const playerH = this.objHeight;
        const playerRight = playerX + playerW;
        arrayOfObject.physicalObject.map((el:PhysicalObject)=>{
            if(!el.objIsSolid){
                return;
            }
            if(arrayOfObject.player == undefined){
                return;
            }
            //отталкивание вниз игрока
            const checkX: boolean = playerX + playerW > el.x + 15 && playerX < el.x + el.objWidth - 15;
            if(arrayOfObject.player.y <= +el.y + el.objHeight && (playerH + playerY >= +el.y + el.objHeight) && checkX){
                arrayOfObject.player.y = +el.y + el.objHeight;
                arrayOfObject.player.move = false;
                this.canJump = true;
                if(this.fallMultiplier >= 4.5){
                console.log("сука больно!");
                }
                this.fallMultiplier = 0;
                return;
            }
            //отталкивание вверх игрока
            if(arrayOfObject.player.y + playerH > +el.y && playerY < +el.y && checkX){
                arrayOfObject.player.y = +el.y - playerH;
                arrayOfObject.player.move = false;
                this.canJump = true;
                this.fallMultiplier = 0;
            }
            //отталкивание вправо игрока
            const checkY:boolean = playerY + playerH > el.y && playerY < el.y + el.objHeight;
            const elCenterX:number = el.x + (el.objWidth / 2); 
            if(playerRight > el.x && playerRight < elCenterX && checkY){
                arrayOfObject.player.x = +el.x - playerW + 1;
                if(this.moveDirection == 0 || this.moveDirection == 2){
                    arrayOfObject.player.x = +el.x - playerW;
                }
                this.speedMultiplier = 0;
            }
            //отталкивание влево игрока
            if(playerX < el.x + el.objWidth && playerX > elCenterX && checkY){
                arrayOfObject.player.x = +el.x + el.objWidth - 1;
                if(this.moveDirection == 0 || this.moveDirection == 1){
                    arrayOfObject.player.x = +el.x + el.objWidth;
                }
                this.speedMultiplier = 0;
            }
        })
        if(!this.move){
            this.move = true;
            return;
        }
        if(this.objPos === "bottom"){
            this.canJump = false;
            this.fallMultiplier = this.fallMultiplier + 0.2
            this.y = this.y - (this.fallspeed * 100) * this.fallMultiplier;
        }
    }
}