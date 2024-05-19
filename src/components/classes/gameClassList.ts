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
    constructor(width:number = 0,height:number = 0,x:number = 0,y:number = 0,unitX:string = "px",unitY:string = "px",color:string = "",pos:string = "top",img:string = ""){
        this.id = idPrimaryKey;
        this.objWidth = width;
        this.objHeight = height;
        this.x = x;
        this.y = y;
        this.unitX = unitX;
        this.unitY = unitY;
        this.color = color;
        this.objPos = pos;
        this.img = img;
        idPrimaryKey++;
    }
}
export class BackgroundObject extends ObjectClass{
    paralax: number = 1;
    backgroundPos:string = "center";
    backgroundSize:string = "cover";
    backgroundRepeat: boolean = false;
    constructor(
        width:number = 0,height:number = 0,x:number = 0,y:number = 0,unitX:string = "px",unitY:string = "px",color:string = "",pos:string = "top",img:string = "",
        paralax:number = 1, backgroundPos:string = "center", backgroundSize:string = "cover",backgroundRepeat: boolean = false,
    ){
        super(width,height,x,y,unitX,unitY,color,pos,img);
        this.paralax = paralax;
        this.backgroundPos = backgroundPos;
        this.backgroundSize = backgroundSize;
        this.backgroundRepeat = backgroundRepeat;
    }
}
export class PhysicalObject extends ObjectClass{
    objIsSolid: boolean = false;
    constructor(
        width:number = 0,height:number = 0,x:number = 0,y:number = 0,unitX:string = "px",unitY:string = "px",color:string = "",pos:string = "top",img:string = "",
        isSolid:boolean = false){
        super(width,height,x,y,unitX,unitY,color,pos,img);
        this.objIsSolid = isSolid;
    }
}
export class Player extends PhysicalObject{
    weightJump: number = 0.2;
    speed:number = 0.2;
    fallspeed:number = 0.15;
    constructor(
        width:number = 0,height:number = 0,x:number = 0,y:number = 0,unitX:string = "px",unitY:string = "px",color:string = "",pos:string = "top",img:string = "",
        isSolid:boolean = true,
        weightJump:number = 0.2, speed:number = 0.2, fallspeed:number = 0.15){
            super(width,height,x,y,unitX,unitY,color,pos,img,isSolid);
            this.weightJump = weightJump;
            this.speed = speed;
            this.fallspeed = fallspeed
        }
}