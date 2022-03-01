import { Piece } from "."
import BOARD from "../controller"

export class WPawn extends Piece {

    constructor(y , x , team , uri , options = undefined ) {

        if(uri === "default")
        uri = "WP.png"

        super("WPawn" , y , x , team , uri , options )

        this.firstMove = true
        this.domElment.onclick = this.select.bind(this)
        this.options = options

    }

    select() {

        if(this.options?.before && typeof this.options?.before == "function")
            if(!this.options.before("selection" , this.state)) return
            

        let verticalSteps = 1

        if(this.firstMove)
          verticalSteps++

        const changes = []

        if( this.y-1 >= 0 && this.x-1 >= 0 && BOARD_STATE[this.y-1][this.x-1]?.team === -this.team )
            changes.push(BOARD.paint(`#C${this.y-1}${this.x-1}` , "red"))

        if( this.y-1 >= 0  && this.x+1 <= 7 && BOARD_STATE[this.y-1][this.x+1]?.team === -this.team )
            changes.push(BOARD.paint(`#C${this.y-1}${this.x+1}` , "red"))
        

        for(let currentY = this.y ; currentY >= this.y-verticalSteps && currentY >= 0 ; currentY--) {

            if(currentY == this.y)
            changes.push(BOARD.paint(`#C${this.y}${this.x}` , "green"))

            else if(BOARD_STATE[currentY][this.x])
                break

            else {
               changes.push(BOARD.putDot(`#S${currentY}${this.x}`)) 
            }

        }

        if(this.options?.after && typeof this.options?.after == "function")
        this.options.after("selection" , {selected:{y:this.y,x:this.x} , changes})

    }

    makeMove(y , x) {

        if(this.options?.before && typeof this.options?.before == "function")
          if(!this.options.before("move" , this.state)) return 

        if(
             !(this.x - x == 0 && this.y-y == 1 && !BOARD_STATE[y][x]) &&
             !(this.x - x == 0 && this.y-y == 2 && this.firstMove && !BOARD_STATE[y][x] ) &&
             !(Math.abs(this.x - x) == 1 && this.y-y == 1 && BOARD_STATE[y][x] )
         )
         return false

        if(BOARD_STATE[y][x]?.team === this.team)
         return false

         if(BOARD_STATE[y][x]?.team === -this.team ) 
             document.querySelector(`#P${y}${x}`).remove()

        this.moveTo(y,x)

        if(this.options?.after && typeof this.options?.after == "function")
          this.options.after("move" , {})

        if(this.firstMove)
        this.firstMove = false

        return true

    }
  
}
  
export class BPawn extends Piece {

    constructor(y , x , team , uri ) {

        if(uri === "default")
         uri = "BP.png"

        super("BPawn" , y , x , team , uri )

        this.firstMove = true
        this.domElment.onclick = this.select.bind(this)

    }

    select() {

        if(this.options?.before && typeof this.options?.before == "function")
        if(!this.options.before("selection" , this.state)) return

        const changes = []

        let verticalSteps = 1

        if(this.firstMove)
          verticalSteps++

          if( this.y+1 <= 7 && this.x-1 >= 0 && BOARD_STATE[this.y+1][this.x-1]?.team === -this.team )
          changes.push(BOARD.paint(`#C${this.y+1}${this.x-1}` , "red"))
      
          if( this.y+1 <= 7  && this.x+1 <= 7 && BOARD_STATE[this.y+1][this.x+1]?.team === -this.team )
          changes.push(BOARD.paint(`#C${this.y+1}${this.x+1}` , "red"))

        for(let currentY = this.y ; currentY <= this.y+verticalSteps && currentY <= 7 ; currentY++ ) {

            if(currentY == this.y)
            changes.push(BOARD.paint(`#C${this.y}${this.x}` , "green"))

            else if(BOARD_STATE[currentY][this.x])
                break

            else {
               changes.push(BOARD.putDot(`#S${currentY}${this.x}`)) 
            }

        }

        if(this.options?.after && typeof this.options?.after == "function")
          this.options.after("selection" , {selected:{y:this.y,x:this.x} , changes})

    }

    makeMove(y , x) {

        if(this.options?.before && typeof this.options?.before == "function")
          if(!this.options.before("move" , this.state)) return

        if(
             !(this.x - x == 0 && this.y-y == -1) &&
             !(this.x - x == 0 && this.y-y == -2 && this.firstMove) &&
             !(Math.abs(this.x - x) == 1 && this.y-y == -1 && BOARD_STATE[y][x]?.team === -this.team )
         ) return false
         

        if(BOARD_STATE[y][x]?.team == this.team)
         return false

        if(this.x - x == 0 && this.y-y == -1 && BOARD_STATE[y][x])
         return false

        if(this.x - x == 0 && this.y-y == -2 && this.firstMove && BOARD_STATE[y][x])
         return false

         if(BOARD_STATE[y][x]?.team === -this.team ) 
             document.querySelector(`#P${y}${x}`).remove()

         this.moveTo(y,x)

        if(this.options?.after && typeof this.options?.after == "function")
          this.options.after("move" , {})

        if(this.firstMove)
          this.firstMove = false

        return true

    } 
}