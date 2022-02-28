export default class Piece {

    constructor(name , y , x , team , uri ) {
  
        if(typeof x == "string")
            x = parseInt(x)
  
        if(typeof y == "string")
            y = parseInt(y)  

      const pieceDomElement = document.createElement("div")
      pieceDomElement.id = `P${y}${x}`
      pieceDomElement.classList.add("piece")

      pieceDomElement.style.width = (window.innerHeight/8) + "px"
      pieceDomElement.style.height = `${(window.innerHeight/8)}px`
      
      pieceDomElement.style.top = `${(y*78.125) }px`
      pieceDomElement.style.left = `${(x*78.125)}px`

      pieceDomElement.style.backgroundImage = `url(../asset/${uri})`
      pieceDomElement.style.backgroundRepeat = "no-repeat"
      pieceDomElement.style.backgroundPosition = "center"
      pieceDomElement.style.backgroundSize = "70% 70%"

        this.name = name
        this.x = x
        this.y = y
        this.team = team
        this.pieceDomElement = pieceDomElement

        BOARD_STATE[y][x] = this

    }

    get domElment() {
        return this.pieceDomElement
    }

    get id() {
        return `P${this.y}${this.x}`
    }

    select() {
        throw `Abstrat class Piece instance can't be selected`
    }

    moveTo() {
        throw `Abstrat class Piece instance can't be moved`
    }
 
  }