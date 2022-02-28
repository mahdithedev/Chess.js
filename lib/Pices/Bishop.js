import { Piece } from "."

export default class Bishop extends Piece {

    static moves = {
  
        "1":{
            type:"diagonal",
            i:"+7",
            j:"+7",
        },
        "2":{
            type:"diagonal",
            i:"-7",
            j:"+7"
        },
        "3":{
            type:"diagonal",
            i:"-7",
            j:"-7"
        },
        "4":{
            type:"diagonal",
            i:"+7",
            j:"-7"
        },
    }
  
    constructor(x , y , team) {
        super( "Bishop" , x , y , team)
    }
  
  }