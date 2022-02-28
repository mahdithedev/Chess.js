import { Piece } from "."

export class WPawn extends Piece {

    static moves = {
        //only the pawn has this property
        firstMove:true,
        "1":{
            type:"vertical",
            j:"+1"
        }
    }
  
    constructor(x , y , team) {
        super("WPawn" , x , y , team)
    }
  
  }
  
export class BPawn extends Piece {
    
    static moves = {
        //only the pawn has this property
        firstMove:true,
        "1":{
            type:"vertical",
            j:"-1"
        }
    }
  
    constructor(x , y , team) {
        super("BPawn" , x , y , team)
    }
  
  }