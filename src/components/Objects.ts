import { ArrayOfObjectInterface } from "../types/types";
import { BackgroundObject, PhysicalObject, Player } from "./classes/gameClassList";

const arrayOfObject:ArrayOfObjectInterface = {
    objects:[],
    physicalObject: [],
    backgroundObject: [],
};

arrayOfObject.backgroundObject.push(new BackgroundObject(100,100,0,0,"%","%","#4a1010","bottom","back.png",1,"center","cover",false));

arrayOfObject.physicalObject.push(new PhysicalObject(19200,150,0,0,"px","px","#4a1010","bottom","",true));

// arrayOfObject.physicalObject.push(new PhysicalObject(150,75,400,200,"px","px","#4a1010","bottom","",true));
// arrayOfObject.physicalObject.push(new PhysicalObject(150,75,600,400,"px","px","#4a1010","bottom","",true));
// arrayOfObject.physicalObject.push(new PhysicalObject(150,75,300,600,"px","px","#4a1010","bottom","",true));
// arrayOfObject.physicalObject.push(new PhysicalObject(150,75,100,600,"px","px","#4a1010","bottom","",true));

// arrayOfObject.physicalObject.push(new PhysicalObject(150,25,1100,200,"px","px","#4a1010","bottom","",true));
// arrayOfObject.physicalObject.push(new PhysicalObject(150,75,900,400,"px","px","#4a1010","bottom","",true));

// arrayOfObject.physicalObject.push(new PhysicalObject(200,1920,-200,0,"px","px","#4a1010","bottom","",true));
// arrayOfObject.physicalObject.push(new PhysicalObject(200,1920,1800,0,"px","px","#4a1010","bottom","",true));
// arrayOfObject.physicalObject.push(new PhysicalObject(100,50,0,0,"%","px","#4a1010","top","",false));

arrayOfObject.physicalObject.push(new PhysicalObject(30,30,1500,300,"px","px","#4a1010","bottom","",true));


arrayOfObject.player = new Player(98,196,10,500,"px","px","#08d453","bottom","player.png",true,0.2,0.3,0.1);

export default arrayOfObject;