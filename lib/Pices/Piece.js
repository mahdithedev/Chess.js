export default class Piece {

    constructor(name , x , y , team ) {
  
        if(typeof x == "string")
            x = parseInt(x)
  
        if(typeof y == "string")
            y = parseInt(y)
  
        this.name = name
        this.x = x
        this.y = y
        this.team = team
  
    }
  }