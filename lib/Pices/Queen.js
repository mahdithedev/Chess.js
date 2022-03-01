import { Piece } from "."
import BOARD from "../controller"

export default class  extends Piece {

    constructor(y , x , team , uri , options = undefined ) {

        if(uri.toLowerCase() === "white")
         uri = "WQ.png"
        else if(uri.toLowerCase() === "black")
         uri = "BQ.png"

        super( "Queen" , y , x , team , uri , options )

        this.domElment.onclick = this.select.bind(this)
        this.options = options

    }

    select() {

        if(this.options?.before && typeof this.options?.before == "function")
            if(!this.options.before("selection" , this.state)) return

        const changes = []

        changes.push(BOARD.paint(`#C${this.y}${this.x}` , "green"))

        for(let i = this.x + 1 , j = this.y - 1 ; i <= 7 && j >= 0 ; i++ , j-- ) {
            if(BOARD_STATE[j][i]?.team == this.team)
                break
            if(BOARD_STATE[j][i]?.team == -this.team) {
                changes.push(BOARD.paint(`#C${j}${i}` , "red"))
                break
            }
            else
             changes.push(BOARD.putDot(`#S${j}${i}`))
        }

        for(let i = this.x + 1 , j = this.y + 1 ; i <= 7 && j <= 7 ; i++ , j++ ) {
            if(BOARD_STATE[j][i]?.team == this.team)
                break
            if(BOARD_STATE[j][i]?.team == -this.team) {
                changes.push(BOARD.paint(`#C${j}${i}` , "red"))
                break
            }
            else
             changes.push(BOARD.putDot(`#S${j}${i}`))
        }

        for(let i = this.x - 1 , j = this.y - 1 ; i >= 0 && j >= 0 ; i-- , j-- ) {
            if(BOARD_STATE[j][i]?.team == this.team)
                break
            if(BOARD_STATE[j][i]?.team == -this.team) {
                changes.push(BOARD.paint(`#C${j}${i}` , "red"))
                break
            }
            else
             changes.push(BOARD.putDot(`#S${j}${i}`))
        }

        for(let i = this.x - 1 , j = this.y + 1 ; i >= 0 && j <= 7 ; i-- , j++ ) {
            if(BOARD_STATE[j][i]?.team == this.team)
                break
            if(BOARD_STATE[j][i]?.team == -this.team) {
                changes.push(BOARD.paint(`#C${j}${i}` , "red"))
                break
            }
            else
             changes.push(BOARD.putDot(`#S${j}${i}`))
        }

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
            !(Math.abs(this.x-x) === Math.abs(this.y-y)) &&
            !(this.y-y == 0 && this.x-x !== 0) &&
            !(this.x-x == 0 && this.y-y !== 0)
            )
          return false

        if(BOARD_STATE[y][x]?.team === this.team)
         return false

         //if it goes to right
        if(this.x - x < 0 && (Math.abs(this.x-x) === Math.abs(this.y-y))) {
            //if it goes up
            if(this.y - y > 0) {
                for(let i = this.x + 1 , j = this.y - 1 ; i < x && j > y ; i++ , j-- )
                 if(typeof BOARD_STATE[j][i] !== "undefined") return false
            } else {
                for(let i = this.x + 1 , j = this.y + 1 ; i < x && j < y ; i++ , j++ )
                 if(typeof BOARD_STATE[j][i] !== "undefined") return false
            }
        } else if((Math.abs(this.x-x) === Math.abs(this.y-y))) {
            if(this.y - y > 0) {
                for(let i = this.x - 1 , j = this.y - 1 ; i > x && j > y ; i-- , j-- )
                 if(typeof BOARD_STATE[j][i] !== "undefined") return false
            } else {
                for(let i = this.x - 1 , j = this.y + 1 ; i > x && j < y ; i-- , j++ )
                 if(typeof BOARD_STATE[j][i] !== "undefined") return false
            }
        }

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