import { BackgroundObject, ObjectClass, PhysicalObject, Player } from "../components/classes/gameClassList";

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