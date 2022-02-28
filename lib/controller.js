//this is the game-board controller

const BOARD = {

    board:document.querySelector("#bord"),

    paint:(query , color) => {
        
        const element = document.querySelector(query)

        if(!element)
         throw `document.querySelector(${query}) returned \'null\'`

        const oldColor = element.style.backgroundColor

        element.style.backgroundColor = color

        return oldColor

    },

    putDot:(id) => {
      document.getElementById(`S${id}`).style.opacity = "100%"
    },

    removeDot:(id) => {
      document.getElementById(`S${id}`).style.opacity = "0%"
    }

}

export default BOARD