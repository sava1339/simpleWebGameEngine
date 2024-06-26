import { ArrayOfObjectInterface } from "../types/types";
import { BackgroundObject, PhysicalObject, Player } from "./classes/gameClassList";

const arrayOfObject:ArrayOfObjectInterface = {
    objects:[],
    physicalObject: [],
    backgroundObject: [],
};

arrayOfObject.backgroundObject.push(new BackgroundObject({
    objWidth: 100,
    objHeight: 100,
    x: 0,
    y: 0,
    unitX: "%",
    unitY: "%",
    color: "#4a1010",
    objPos: "bottom",
    img: "back.png"
},{
    paralax: 1,
    backgroundPos: "center",
    backgroundSize: "cover",
    backgroundRepeat: false
}));

arrayOfObject.physicalObject.push(new PhysicalObject({
    objWidth: 1700,
    objHeight: 150,
    x: 0,
    y: 0,
    unitX: "px",
    unitY: "px",
    color: "#4a1010",
    objPos: "bottom",
    img:""
},{
    isSolid: true,
}));

arrayOfObject.physicalObject.push(new PhysicalObject({
    objWidth: 2020,
    objHeight: 150,
    x: 0,
    y: 1000,
    unitX: "px",
    unitY: "px",
    color: "#4a1010",
    objPos: "bottom",
    img:""
},{
    isSolid: true,
}));

arrayOfObject.physicalObject.push(new PhysicalObject({
    objWidth: 100,
    objHeight: 200,
    x: 700,
    y: 150,
    unitX: "px",
    unitY: "px",
    color: "#3b3b1a",
    objPos: "bottom",
    img:""
},{
    isSolid: true,
}));

arrayOfObject.physicalObject.push(new PhysicalObject({
    objWidth: 100,
    objHeight: 400,
    x: 900,
    y: 150,
    unitX: "px",
    unitY: "px",
    color: "#3b3b1a",
    objPos: "bottom",
    img:""
},{
    isSolid: true,
}));

arrayOfObject.physicalObject.push(new PhysicalObject({
    objWidth: 100,
    objHeight: 600,
    x: 1200,
    y: 150,
    unitX: "px",
    unitY: "px",
    color: "#3b3b1a",
    objPos: "bottom",
    img:""
},{
    isSolid: true,
}));


arrayOfObject.physicalObject.push(new PhysicalObject({
    objWidth: 180,
    objHeight: 1920,
    x: -180,
    y: 0,
    unitX: "px",
    unitY: "px",
    color: "#4a1010",
    objPos: "bottom",
    img:""
},{
    isSolid: true,
}));


arrayOfObject.player = new Player({
    objWidth: 98,
    objHeight: 196,
    x:400,
    y: 300,
    unitX: "px",
    unitY: "px",
    color: "#08d453",
    objPos: "bottom",
    img: "player.png"
},{
    isSolid:true
},{
    initialWeightJump: 0.2,
    initialSpeed: 0.3,
    initialFallspeed:0.1
});

export default arrayOfObject;