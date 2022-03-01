//this is the game-board controller

const BOARD = {

    board:document.querySelector("#bord"),

    paint:(query , color) => {
        

        const element = document.querySelector(query)

        if(!element)
         throw `document.querySelector(${query}) returned \'null\'`

        const oldColor = element.style.backgroundColor

        element.style.backgroundColor = color

        return {query , action:"paint" , oldColor}

    },

    putDot:(query) => {

      document.querySelector(query).style.opacity = "100%"
      return {query , action:"putDot"}

    },

    removeDot:(query) => {

      document.querySelector(query).style.opacity = "0%"
      return {query , action:"removeDot"}
      
    }

}

export default BOARD