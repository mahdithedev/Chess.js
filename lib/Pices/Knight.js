import { Piece } from ".";
import BOARD from "../controller";

export default class Knight extends Piece {

    constructor(y , x , team , uri , options = undefined ) {

        if(uri.toLowerCase() === "white")
         uri = "WKN.png"
        else if(uri.toLowerCase() === "black")
         uri = "BKN.png"

        super( "Knight" , y , x , team , uri , options )

        this.domElment.onclick = this.select.bind(this)
        this.options = options

    }

    select() {

        if(this.options?.before && typeof this.options?.before == "function")
            if(!this.options.before("selection" , this.state)) return

        const changes = []

        changes.push(BOARD.paint(`#C${this.y}${this.x}` , "green"))

        if( this.x + 2 <= 7 ) {

            if(this.y + 1 <= 7 && !(BOARD_STATE[this.y+1][this.x+2]?.team === this.team)) 
             if(BOARD_STATE[this.y+1][this.x+2]?.team === -this.team)
              changes.push(BOARD.paint(`#C${this.y+1}${this.x + 2}` , "red"))
             else
              changes.push(BOARD.putDot(`#S${this.y+1}${this.x + 2}`))

            if(this.y - 1 >= 0 && !(BOARD_STATE[this.y-1][this.x+2]?.team === this.team) )
              if(BOARD_STATE[this.y-1][this.x+2]?.team === -this.team)
               changes.push(BOARD.paint(`#C${this.y-1}${this.x + 2}` , "red"))
              else
               changes.push(BOARD.putDot(`#S${this.y-1}${this.x + 2}`))

        }

        if( this.x - 2 >= 0 ) {

            if(this.y + 1 <= 7 && !(BOARD_STATE[this.y+1][this.x-2]?.team === this.team) )
             if(BOARD_STATE[this.y+1][this.x-2]?.team === -this.team)
              changes.push(BOARD.paint(`#C${this.y+1}${this.x - 2}` , "red"))
             else
              changes.push(BOARD.putDot(`#S${this.y+1}${this.x - 2}`))

            if(this.y - 1 >= 0 && !(BOARD_STATE[this.y-1][this.x-2]?.team === this.team) )
              if(BOARD_STATE[this.y-1][this.x-2]?.team === -this.team)
               changes.push(BOARD.paint(`#C${this.y-1}${this.x - 2}` , "red"))
              else
               changes.push(BOARD.putDot(`#S${this.y-1}${this.x - 2}`))

        }

        if( this.y + 2 <= 7 ) {

            if(this.x + 1 <= 7 && !(BOARD_STATE[this.y+2][this.x+1]?.team === this.team) )
             if(BOARD_STATE[this.y+2][this.x+1]?.team === -this.team)
              changes.push(BOARD.paint(`#C${this.y+2}${this.x + 1}` , "red"))
             else
              changes.push(BOARD.putDot(`#S${this.y+2}${this.x + 1}`))

            if(this.x - 1 >= 0 && !(BOARD_STATE[this.y+2][this.x-1]?.team === this.team) )
              if(BOARD_STATE[this.y+2][this.x-1]?.team === -this.team)
               changes.push(BOARD.paint(`#C${this.y+2}${this.x - 1}` , "red"))
              else
               changes.push(BOARD.putDot(`#S${this.y+2}${this.x - 1}`))

        }

        if( this.y - 2 >= 0 ) {

            if(this.x + 1 <= 7 && !(BOARD_STATE[this.y-2][this.x+1]?.team === this.team) )
             if(BOARD_STATE[this.y-2][this.x+1]?.team === -this.team)
              changes.push(BOARD.paint(`#C${this.y-2}${this.x + 1}` , "red"))
             else
              changes.push(BOARD.putDot(`#S${this.y-2}${this.x + 1}`))

            if(this.x - 1 >= 0 && !(BOARD_STATE[this.y-2][this.x-1]?.team === this.team) )
              if(BOARD_STATE[this.y-2][this.x-1]?.team === -this.team)
               changes.push(BOARD.paint(`#C${this.y-2}${this.x - 1}` , "red"))
              else
               changes.push(BOARD.putDot(`#S${this.y-2}${this.x - 1}`))

        }

        if(this.options?.after && typeof this.options?.after == "function")
        this.options.after("selection" , {selected:{y:this.y,x:this.x} , changes})

    }

    makeMove(y , x) {
        
        if(this.options?.before && typeof this.options?.before == "function")
          if(!this.options.before("move" , this.state)) return 

        if(
            !(Math.abs(this.x - x) == 2 && Math.abs(this.y - y) == 1 ) &&
            !(Math.abs(this.y - y) == 2 && Math.abs(this.x - x) == 1 )
        )
        return false

       if(BOARD_STATE[y][x]?.team === this.team)
        return false

        if(BOARD_STATE[y][x]?.team === -this.team ) 
            document.querySelector(`#P${y}${x}`).remove()

       this.moveTo(y,x)

       if(this.options?.after && typeof this.options?.after == "function")
         this.options.after("move" , {})

       return true

    }
  
}
  