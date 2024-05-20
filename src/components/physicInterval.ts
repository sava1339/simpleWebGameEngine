import { StartPosition } from "../types/types";
import arrayOfObject from "./Objects";

const physicsCalculationInterval:number = 10;
const mediumInterval:number = 100;
  let startPos:StartPosition = {
    x:10,
    y:300
}

//custom
setInterval(()=>{
    if(arrayOfObject.player != undefined){
      if(arrayOfObject.player.y <= -1000){
        arrayOfObject.player.y = startPos.y;
        arrayOfObject.player.x = startPos.x;
        arrayOfObject.player.fallMultiplier = 0;
        arrayOfObject.player.speedMultiplier = 0;
      }
    }
  },mediumInterval)

//base
const gameTick = setInterval(()=>{
    let player:HTMLElement | null = document.querySelector(".player");
    if(player?.style == undefined){
      return;
    }
    if(arrayOfObject.player == undefined){
        return;
    }
    arrayOfObject.player.mirror ? 
    player.style.transform = "scaleX(-1)" 
    : 
    player.style.transform = "scaleX(1)"

    player.style.left = arrayOfObject.player.x + "px";
    player.style.bottom = arrayOfObject.player.y + "px";
    arrayOfObject.player.controlJump("Space");
    arrayOfObject.player.controlMove("KeyA","KeyD");
    arrayOfObject.player.physicEmulation();
  },physicsCalculationInterval)