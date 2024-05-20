import { BackgroundObject, ObjectClass, PhysicalObject, Player } from "../components/classes/gameClassList";

export interface ObjectInterface {
    id?:number,
    objWidth?:number,
    objHeight?:number,
    x?:number,
    y?:number,
    objPos?:string,
    color?:string,
    unitX?:string,
    unitY?:string,
    img?:string
}
export interface BackgroundInterface {
    paralax?:number,
    backgroundPos?:string,
    backgroundSize?:string,
    backgroundRepeat?: boolean,
}
export interface PhysicalObjectInterface {
    isSolid?:boolean
}
export interface PlayerInterface {
    weightJump: number,
    speed:number,
    fallspeed:number,
}

export interface ArrayOfObjectInterface {
    objects: ObjectClass[],
    physicalObject: PhysicalObject[],
    backgroundObject: BackgroundObject[],
    player?: Player
}
export interface StartPosition {
    x:number,
    y:number
}