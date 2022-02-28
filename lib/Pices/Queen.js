import { Piece } from "."

export default class Queen extends Piece { 

    static moves = {
        
        "1":{
            type:"horizontal",
            i:"+7",
        },
        "2":{
            type:"vertical",
            j:"+7",
        },
        "3":{
            type:"horizontal",
            i:"-7",
        },
        "4":{
            type:"vertical",
            j:"-7"
        },
        "5":{
            type:"diagonal",
            i:"+7",
            j:"+7"
        },
        "6":{
            type:"diagonal",
            i:"-7",
            j:"+7"
        },
        "7":{
            type:"diagonal",
            i:"-7",
            j:"-7"
        },
        "8":{
            type:"diagonal",
            i:"+7",
            j:"-7"
        },
    }
  
    constructor(x , y , team) {
        super("Queen" , x , y , team)
    }
  
  }
  