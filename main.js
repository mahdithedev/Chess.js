import './style.css'
import {Piece , WPawn , BPawn , Rook , Bishop , Knight , Queen , King } from './lib/Pices'
import BOARD from "./lib/controller"

let changes = []

let selectedPice = undefined

const revertChanges = () => {

    changes.map(change => {

        if(change.action == "paint")
           BOARD.paint(change.query , change.oldColor)

        if(change.action == "putDot")
            BOARD.removeDot(change.query)

    })

    changes = []
  
}

const handleMovnent = (e) => {
  
  const y = e.target.id[1]
  const x = e.target.id[2]

  if(!selectedPice)
  return

  if(!BOARD_STATE[selectedPice.y][selectedPice.x].makeMove(y,x))
   selectedPice = undefined

  revertChanges()

}

const generateGrid = () => {

  for (let i = 0 ; i < 8 ; i++ ) {

      const row = document.createElement("div")
      row.classList.add("row")
      row.style.height = (window.innerHeight/8) + "px"

      const selectedRow = document.createElement("div")
      selectedRow.classList.add("row")
      selectedRow.style.height = (window.innerHeight/8) + "px"
      
      for(let j = 0 ; j < 8 ; j++) {
          
          const cell = document.createElement("div")
          cell.classList.add("cell")
          cell.style.width = (window.innerHeight/8) + "px"

          cell.id = `C${i}${j}`
          cell.style.backgroundColor = (-1)**(i+j) == 1 ? "rgb(193 152 89)" : "#966F33"

          cell.onclick = handleMovnent

          const selectedCell = document.createElement("div")
          selectedCell.classList.add("cell")
          selectedCell.style.width = (window.innerHeight/8) + "px"
          selectedCell.id = `S${i}${j}`

          const dot = document.createElement("div")
          dot.classList.add("dot")
          selectedCell.appendChild(dot)

          row.appendChild(cell)   
          selectedRow.appendChild(selectedCell)

      }

      BOARD.board.appendChild(row)

      document.getElementById("bordSelected").appendChild(selectedRow)

  }

}

const checkCurrentPlayer = (pieceState) => {
    if(currentTeam !== pieceState.team)
    return 0
    return 1
}

const before = (action , pieceState) => {

    if(selectedPice && action == "selection") {
        if(!BOARD_STATE[selectedPice.y][selectedPice.x].makeMove(pieceState.y , pieceState.x)) 
            selectedPice = undefined
        return false
    }

    if(changes.length > 0)
      revertChanges()

    if(action == "selection")
    return checkCurrentPlayer(pieceState)

    return true

}

const afterSelection = (state) => {

        selectedPice = state.selected

        changes.push(...state.changes)

}

const afterMove = () => {
    selectedPice = undefined
    currentTeam = -currentTeam
}

const after = (action , state) => {

    if(action == "selection")
    return afterSelection(state)

    if(action == "move")
    return afterMove()

}

const addPiece = piece => {

    piece.setOption("before" , before)
    piece.setOption("after" , after)

    const pieceDomElement = piece.domElment

    BOARD_STATE[piece.y][piece.x] = piece

    BOARD.board.appendChild(pieceDomElement)

}

const initPieces = () => {

    for(let i = 0 ; i < 8 ; i++)
        addPiece(new WPawn(6 , i , 1 , "default"))

    for(let i = 0 ; i < 8 ; i++)
        addPiece(new BPawn(1 , i , -1 , "default"))
    

}

generateGrid()
initPieces()