import { Piece } from "."

export default class Rook extends Piece {

  

    static moves = {
  
        "1":{
            type:"horizontal",
            i:"+7",
        },
        "2":{
            type:"vertical",
            j:"+7"
        },
        "3":{
            type:"horizontal",
            i:"-7",
        },
        "4":{
            type:"vertical",
            j:"-7",
        }
    }
  
    constructor(x , y, team) {
        super("Rook" , x , y , team)
    }
  
  }
  