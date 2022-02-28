import { Piece } from "."

export default class King extends Piece {

    static moves = {
  
        "1":{
            type:"horizontal",
            i:"+1",
        },
        "2":{
            type:"vertical",
            j:"+1",
        },
        "3":{
            type:"horizontal",
            i:"-1",
        },
        "4":{
            type:"vertical",
            j:"-1"
        },
        "5":{
            type:"diagonal",
            i:"+1",
            j:"+1"
        },
        "6":{
            type:"diagonal",
            i:"-1",
            j:"+1"
        },
        "7":{
            type:"diagonal",
            i:"-1",
            j:"-1"
        },
        "8":{
            type:"diagonal",
            i:"+1",
            j:"-1"
        },
    }
  
    constructor(x , y ,team) {
        super("King" , x , y , team)
    }
  
  }