import { Piece } from ".";

export default class Knight extends Piece {

    static moves = {
  
        "1":{
            type:"transport",
            i:"+2",
            j:"-1",            
        },
        "2":{
            type:"transport",
            i:"+2",
            j:"-1",            
        },
        "3":{
            type:"transport",
            i:"+1",
            j:"+2",
        },
        "4":{
            type:"transport",
            i:"-1",
            j:"+2",
        },
        "5":{
            type:"transport",
            i:"-2",
            j:"+1"
        },
        "6":{
            type:"transport",
            i:"-2",
            j:"-1"
        },
        "7":{
            type:"transport",
            i:"+1",
            j:"-2",
        },
        "8":{
            type:"transport",
            i:"-1",
            j:"-2",
        }
    }
  
    constructor(x , y , team) {
        super("Knight" , x , y , team)
    }
  
  }
  