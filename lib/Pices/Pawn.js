import { Piece } from "."
import BOARD from "../controller"

export class WPawn extends Piece {

    constructor(y , x , team , uri ) {

        if(uri === "default")
        uri = "WP.png"

        super("WPawn" , y , x , team , uri )

        this.firstMove = true
        this.domElment.onclick = this.select.bind(this)

    }

    select() {

        let verticalSteps = 1

        if(this.firstMove)
          verticalSteps++

        if( this.y-1 >= 0 && this.x-1 >= 0 && BOARD_STATE[this.y-1][this.x-1]?.team === -this.team ) {
            BOARD.paint(`#C${this.y-1}${this.x-1}` , "red")
        }

        for(let currentY = this.y ; currentY >= this.y-verticalSteps && currentY >= 0 ; currentY--) {

            if(currentY == this.y)
            BOARD.paint(`#C${this.y}${this.x}` , "green")

            else if(BOARD_STATE[currentY][this.x])
                break

            else {
               BOARD.putDot(`${currentY}${this.x}`) 
            }

        }
    }
  
}
  
export class BPawn extends Piece {

    constructor(y , x , team , uri ) {

        if(uri === "default")
         uri = "BP.png"

        super("BPawn" , y , x , team , uri )

        this.firstMove = true

    }
  
}