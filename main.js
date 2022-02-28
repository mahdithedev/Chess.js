import './style.css'
import {Piece , WPawn , BPawn , Rook , Bishop , Knight , Queen , King } from './lib/Pices'
import BOARD from "./lib/controller"

let SelectedTiles = []

let currentTeam = 1

let selectedPice = {}

const cleanSelections = () => {

  for(let i = 0 ; i < SelectedTiles.length ; i++) {

      let tile = SelectedTiles[i]

      if(tile.change == "dot")
      document.getElementById(tile.pos).style.opacity = "0%"

      if(tile.change == "color")
      document.getElementById(tile.pos).style.backgroundColor = tile.ogColor

  }    

  SelectedTiles = []
  
}

const handleMovnent = (e) => {
  
  const y = e.target.id[1]
  const x = e.target.id[2]

  if(!selectedPice)
    return

  let isValid = 0

  for(let i = 0 ; i < SelectedTiles.length ; i++) {
      
      const selectedTileY = SelectedTiles[i].pos[1]
      const selectedTileX = SelectedTiles[i].pos[2]

      if( selectedTileX === x && selectedTileY === y) {
          isValid = 1
          break
      }
  }

  if(!isValid)
    return

  const pieceDomElement = document.getElementById(`P${selectedPice.y}${selectedPice.x}`)

  pieceDomElement.style.top = `${( parseInt(y) * 78.125)}px`
  pieceDomElement.style.left = `${( parseInt(x) *78.125 )}px`

  pieceDomElement.id = `P${y}${x}`

  cleanSelections()

  const _y = parseInt(selectedPice.y)
  const _x = parseInt(selectedPice.x) 

  const temp = BOARD_STATE[_y][_x]
  temp.y = y
  temp.x = x
  
  BOARD_STATE[_y][_x] = undefined
  BOARD_STATE[y][x] = temp 

  currentTeam = -currentTeam

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

const handleSelection = async e => {

  const y = parseInt(e.target.id[1])
  const x = parseInt(e.target.id[2])

  const piece = BOARD_STATE[y][x]

  if( currentTeam !== piece.team )
  return

  if(selectedPice.name)
    cleanSelections()

  selectedPice = {...piece}

  let moves = {}

  if(piece.name == "WPawn")
      moves = WPawn.moves
  

  if(piece.name == "BPawn")
      moves = BPawn.moves


  const colorGreen = (x , y) => {

      const ogColor = document.getElementById(`C${y}${x}`).style.backgroundColor

      document.getElementById(`C${y}${x}`).style.backgroundColor = "green"

      SelectedTiles.push({
          pos:`C${y}${x}`,
          change:"color",
          ogColor
      })

  }

  const putDot = (x , y) => {

      document.getElementById(`S${y}${x}`).style.opacity = "100%"

      SelectedTiles.push({
          pos:`S${y}${x}`,
          change:"dot"
      })

  }

  const colorRed = (x , y) => {
      
      const ogColor = document.getElementById(`C${y}${x}`).style.backgroundColor

      document.getElementById(`C${y}${x}`).style.backgroundColor = "red"

      SelectedTiles.push({
          pos:`C${y}${x}`,
          change:"color",
          ogColor
      })

  }

  Object.keys(moves).forEach(key => {

      const allowedMove = moves[key]

      //sorry for this spagety code may refactor later
      
      if(allowedMove.type == "vertical") {

          let verticalSteps = parseInt(allowedMove.j[1])

          //only the pawn has this propert
          if(moves.firstMove ) {
              verticalSteps +=1;
          }

          if(allowedMove.j[0] == "+")
          for(let i = y ; i >= y-verticalSteps ; i--) {
              if(i==y)
              colorGreen(x,i)
              else if( BOARD_STATE[i][x]?.team === -currentTeam) {
                  if(piece.name === "BPawn" || piece.name === "WPawn")
                  break
                  colorRed(x,i)
                  break
              }
              else if( BOARD_STATE[i][x]?.team === currentTeam) {
                  break;
              }
              else
              putDot(x,i)               
          }
          else
           for(let i = y ; i <= y+verticalSteps ; i++) {
              if(i==y)
              colorGreen(x,i)
              else if( BOARD_STATE[i][x]?.team === -currentTeam ) {
                  colorRed(x,i)
                  break
              }
              else if( BOARD_STATE[i][x]?.team === currentTeam) {
                  break;
              }
              else
              putDot(x,i)               
          }

      }

  })

}

const addPiece = piece => {

    const pieceDomElement = piece.domElment

    BOARD_STATE[piece.y][piece.x] = piece

    BOARD.board.appendChild(pieceDomElement)

}

const initPieces = () => {

    addPiece( new WPawn(6 , 2 , 1 , "default") )
    addPiece( new WPawn(5 , 1 , -1 , "default") )

}

generateGrid()
initPieces()