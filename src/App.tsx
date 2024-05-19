import { useEffect } from 'react';
import './App.css'
import arrayOfObject from './components/Objects'
import { PhysicalObject } from './components/classes/gameClassList';
import { StartPosition } from './types/types';

function App() {
  const physicsCalculationInterval:number = 10;
  const mediumInterval:number = 100;
  let startPos:StartPosition = {
    x:0,
    y:0
  }
  let moveDirection:number = 0;
  let jumpCommand:boolean = false;
  let canJump:boolean = true;
  let jumpLoop:number = 0;
  let speedMultiplier:number = 0.1;
  let fallMultiplier:number = 0.1;
  setInterval(()=>{
    const player:HTMLElement | null = document.querySelector(".player");
    if(player?.style != undefined){
      if(+player.style.bottom.slice(0,-2) <= -1000){
        player.style.bottom = startPos.y + "px";
        player.style.left = startPos.x + "px";
        fallMultiplier = 0;
        speedMultiplier = 0;
      }
    }
  },mediumInterval)
  setInterval(()=>{
    const player:HTMLElement | null = document.querySelector(".player");
    if(player?.style == undefined){
      return;
    }
    if(arrayOfObject?.player == undefined){
      return;
    }
    const playerX = +player.style.left.slice(0,-2);
    const playerY = +player.style.bottom.slice(0,-2);
    const playerW = +player.style.width.slice(0,-2);
    const playerH = +player.style.height.slice(0,-2);
    const playerRight = playerX + playerW;
    let move = true;
    if(jumpLoop >= 9){
      jumpCommand = false;
      canJump = false;
      jumpLoop = 0;
    }
    if(jumpCommand && canJump){
      if(arrayOfObject.player?.objPos === "bottom"){
        player.style.bottom = String(playerY +arrayOfObject.player.weightJump * 150 - jumpLoop) + "px";
      }
      jumpLoop++
      move = false;
    }
    if(moveDirection == 0){
      speedMultiplier = 0;
    }
    if(moveDirection != 0){
      speedMultiplier = speedMultiplier >= 10 ? 10 : speedMultiplier + speedMultiplier/10 +0.1
      const moveSpeed = ((arrayOfObject.player.speed * 20 + (speedMultiplier / 2)) + (!jumpCommand && !canJump ? arrayOfObject.player.weightJump*25 : 0) + (jumpCommand && canJump ? arrayOfObject.player.weightJump*35 : 0))
      if(moveDirection == 1){
        player.style.transform = "scaleX(-1)";
        player.style.left = (playerX + moveSpeed) + "px"
      }
      if(moveDirection == 2){
        player.style.transform = "scaleX(1)";
        player.style.left = (playerX - moveSpeed) + "px"
      }
    }
    arrayOfObject.physicalObject.map((el:PhysicalObject)=>{
      if(!el.objIsSolid){
        return;
      }
      //фикс переменных
      if(el.unitX.slice(-1) == "%"){
        el.unitX = el.unitX + "%";
      }
      if(el.unitY.slice(-1) == "%"){
        el.unitX = el.unitY + "%";
      }
      //отталкивание вниз игрока
      const checkX: boolean = playerX + playerW > el.x + 15 && playerX < el.x + el.objWidth - 15;
      if(+player.style.bottom.slice(0,-2) <= +el.y + el.objHeight && (playerH + playerY >= +el.y + el.objHeight) && checkX){
        player.style.bottom = String(+el.y + el.objHeight) + "px"
        move = false;
        canJump = true;
        if(fallMultiplier >= 4.5){
          console.log("сука больно!");
        }
        fallMultiplier = 0;
        return;
      }
      //отталкивание вверх игрока
      if(+player.style.bottom.slice(0,-2) + playerH > +el.y && playerY < +el.y && checkX){
        player.style.bottom = String(+el.y - playerH) + "px"
        move = false;
        canJump = true;
        fallMultiplier = 0;
      }
      //отталкивание вправо игрока
      const checkY:boolean = playerY + playerH > el.y && playerY < el.y + el.objHeight;
      const elCenterX:number = el.x + (el.objWidth / 2); 
      if(playerRight > el.x && playerRight < elCenterX && checkY){
        player.style.left = String(+el.x - playerW + 1) + "px";
        if(moveDirection == 0 || moveDirection == 2){
          player.style.left = String(+el.x - playerW) + "px";
        }
        speedMultiplier = 0;
      }
      //отталкивание влево игрока
      if(playerX < el.x + el.objWidth && playerX > elCenterX && checkY){
        player.style.left = String(+el.x + el.objWidth - 1) + "px";
        if(moveDirection == 0 || moveDirection == 1){
          player.style.left = String(+el.x + el.objWidth) + "px";
        }
        speedMultiplier = 0;
      }
    })
    if(!move){
      return;
    }
    if(arrayOfObject.player?.objPos === "bottom"){
      canJump = false;
      fallMultiplier = fallMultiplier + 0.2
      player.style.bottom = String(+player.style.bottom.slice(0,-2) - (arrayOfObject.player?.fallspeed * 100) * fallMultiplier) + "px";
    }
  },physicsCalculationInterval)
  document.addEventListener('keydown',(e)=>{
    if(e.code === "Space"){
      jumpCommand = true;
      return;
    }
    if(e.code === "KeyD"){
      moveDirection = 1;
      return;
    }
    if(e.code === "KeyA"){
      moveDirection = 2;
      return;
    }
  })
  document.addEventListener('keyup',(e)=>{
    if((e.code === "KeyD" && moveDirection == 1) || (e.code === "KeyA" && moveDirection == 2)){
      moveDirection = 0;
      speedMultiplier = 0.1;
    }
  })
  const customSpeedInputHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
    if(arrayOfObject.player == undefined){
      return;
    }
    arrayOfObject.player.speed = +e.target.value;
  }
  const customJumpInputHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
    if(arrayOfObject.player == undefined){
      return;
    }
    arrayOfObject.player.weightJump = +e.target.value;
  }
  useEffect(()=>{
    startPos.x = arrayOfObject.player?.x || 0;
    startPos.y = arrayOfObject.player?.y || 0;
  },[])
  return (
    <div className='main relative border-8 border-gray-900'>
      <div className='ui fixed text-[32px] top-[40px] left-[50px] z-[999] w-full h-full'>
        <p className='text-[48px] text-[#ffffff] font-bold'>Dev settings</p>
        <div className='mb-4'>
          <label className='text-[#ffffff]' htmlFor="speed">Скорость: </label>
          <input id='speed' onChange={customSpeedInputHandler} type="text" />
        </div>
        <div className='my-4'>
          <label className='text-[#ffffff]' htmlFor="jump">Прыжок: </label>
          <input id='jump' onChange={customJumpInputHandler} type="text" />
        </div>
      </div>
      <div className='objects'>
        {arrayOfObject.physicalObject.map(el=>
          <div 
          style={{
            width:el.objWidth + el.unitX,
            height:el.objHeight + el.unitY,
            top: el.objPos === "top" ? el.y : "none",
            bottom: el.objPos === "bottom" ? el.y : "none",
            left:el.x,
            background: el.img === "" ? el.color : `url(./${el.img})`
          }}
          key={el.id}
          id={"phys_obj_"+el.id}
          className='object z-[99] physic_obj absolute'> 
            {el.objIsSolid ?
              <div className='solid w-full h-full'>

              </div>
              :
              null
            }
          </div>
        )}
        {arrayOfObject.player ? 
        <div 
          style={{
            width:arrayOfObject.player.objWidth + arrayOfObject.player.unitX,
            height:arrayOfObject.player.objHeight + arrayOfObject.player.unitY,
            top: arrayOfObject.player.objPos === "top" ? arrayOfObject.player.y : "none",
            bottom: arrayOfObject.player.objPos === "bottom" ? arrayOfObject.player.y : "none",
            left:arrayOfObject.player.x,
            background: arrayOfObject.player.img === "" ? arrayOfObject.player.color : `url(./${arrayOfObject.player.img})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transform: "scaleX(-1)"
          }}
          className='object z-[99] physic_obj player flex justify-center absolute'> 
            {arrayOfObject.player.objIsSolid ?
              <div className='solid w-[65%] h-full'>

              </div>
              :
              null
            }
        </div>
        :
        null
        }
      </div>
      <div className='background h-full relative z-[0]'>
        {arrayOfObject.backgroundObject.map(el=>
          <div
          style={{
            width:el.objWidth + el.unitX,
            height:el.objHeight + el.unitY,
            top: el.objPos === "top" ? el.y : "none",
            bottom: el.objPos === "bottom" ? el.y : "none",
            left:el.x,
            backgroundImage: el.img === "" ? "none" : `url(./${el.img})`, 
            backgroundPosition: el.backgroundPos,
            backgroundRepeat: el.backgroundRepeat ? "repeat" : "no-repeat",
            backgroundSize: el.backgroundSize
          }}
           key={el.id}>

          </div>
        )}
      </div>
    </div>
  )
}

export default App