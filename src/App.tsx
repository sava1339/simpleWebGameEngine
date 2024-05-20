import './App.css'
import arrayOfObject from './components/Objects'
import './components/physicInterval';

function App() {
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
  return (
    <div className='main relative border-8 border-gray-900'>
      <div className='ui absolute text-[32px] top-[40px] left-[50px] z-[999] w-full h-full'>
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
          className='object z-[99] physic_obj player flex justify-center absolute'></div>
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