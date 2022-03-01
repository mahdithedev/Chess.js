import { Piece } from "."
import BOARD from "../controller"

export default class Rook extends Piece {

    constructor(y , x , team , uri , options = undefined ) {

        if(uri.toLowerCase() === "white")
         uri = "WR.png"
        else if(uri.toLowerCase() === "black")
         uri = "BR.png"

        super( "Rook" , y , x , team , uri , options )

        this.domElment.onclick = this.select.bind(this)
        this.options = options

    }

    select() {

        if(this.options?.before && typeof this.options?.before == "function")
            if(!this.options.before("selection" , this.state)) return

        const changes = []

        changes.push(BOARD.paint(`#C${this.y}${this.x}` , "green"))

        for(let i = this.x + 1 ; i <= 7 ; i++)
         if(BOARD_STATE[this.y][i]?.team === this.team)
            break
         else if(BOARD_STATE[this.y][i]?.team === -this.team) {
            changes.push(BOARD.paint(`#C${this.y}${i}` , "red"))
            break
         }
         else
            changes.push(BOARD.putDot(`#S${this.y}${i}`))

        for(let i = this.x - 1 ; i >= 0 ; i--)
            if(BOARD_STATE[this.y][i]?.team === this.team)
             break
            else if(BOARD_STATE[this.y][i]?.team === -this.team) {
                changes.push(BOARD.paint(`#C${this.y}${i}` , "red"))
                break
            }
            else
               changes.push(BOARD.putDot(`#S${this.y}${i}`))

        for(let i = this.y - 1 ; i >= 0 ; i--)
            if(BOARD_STATE[i][this.x]?.team === this.team)
            break
            else if(BOARD_STATE[i][this.x]?.team === -this.team) {
                changes.push(BOARD.paint(`#C${i}${this.x}` , "red"))
                break
            }
            else
                changes.push(BOARD.putDot(`#S${i}${this.x}`))

        for(let i = this.y + 1; i <= 7 ; i++)
            if(BOARD_STATE[i][this.x]?.team === this.team)
             break
            else if(BOARD_STATE[i][this.x]?.team === -this.team) {
                changes.push(BOARD.paint(`#C${i}${this.x}` , "red"))
                break
            }
            else
                changes.push(BOARD.putDot(`#S${i}${this.x}`))

        if(this.options?.after && typeof this.options?.after == "function")
        this.options.after("selection" , {selected:{y:this.y,x:this.x} , changes})

    }

    makeMove(y , x) {

        if(this.options?.before && typeof this.options?.before == "function")
          if(!this.options.before("move" , this.state)) return 

        if(
             !(this.y-y == 0 && this.x-x !== 0) &&
             !(this.x-x == 0 && this.y-y !== 0)
         )
         return false

        if(BOARD_STATE[y][x]?.team === this.team)
         return false

        //if it goes horizantly
        if(this.y-y == 0) {
            //if it goes to lef
            if(this.x-x > 0) {
                for(let i = this.x - 1 ; i > x ; i--)
                 if(typeof BOARD_STATE[this.y][i] !== "undefined") return false
            } else {
                for(let i = this.x + 1 ; i < x ; i++)
                 if(typeof BOARD_STATE[this.y][i] !== "undefined") return false
            }
        }
        //if it goes vertically 
        else {
            //if it goes up
            if(this.y - y > 0) {
                for(let i = this.y - 1 ; i > y ; i--)
                 if(typeof BOARD_STATE[i][this.x] !== "undefined") return false
            } else {
                for(let i = this.y + 1 ; i < y ; i++)
                 if(typeof BOARD_STATE[i][this.x] !== "undefined") return false
            }
        }

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
  