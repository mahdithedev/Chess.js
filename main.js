import './style.css'
import {Piece , WPawn , BPawn , Rook , Bishop , Knight , Queen , King } from './lib/Pices'

const BOARD = {
  board:document.querySelector("#bord")
}

const BOARD_STATE = []

for(let i = 0 ; i < 8 ; i++)
BOARD_STATE.push([
  undefined , undefined , undefined , undefined , undefined , undefined , undefined , undefined
])

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

const addPiece = (pieceObj , uri = "") => {

      const {x,y} = pieceObj

      BOARD_STATE[y][x] = pieceObj

      const piece = document.createElement("div")
      piece.id = `P${y}${x}`
      piece.classList.add("piece")

      piece.style.width = (window.innerHeight/8) + "px"
      piece.style.height = `${(window.innerHeight/8)}px`
      
      piece.style.top = `${(y*78.125) }px`
      piece.style.left = `${(x*78.125)}px`

      piece.onclick = handleSelection

      piece.style.backgroundImage = `url(../asset/${uri})`
      piece.style.backgroundRepeat = "no-repeat"
      piece.style.backgroundPosition = "center"
      piece.style.backgroundSize = "70% 70%"

      // piece.appendChild(innerImage)

      BOARD.board.appendChild(piece)

}

const initPieces = () => {

  addPiece(new Rook(0 , 7 , 1) , "WR.png")
  addPiece(new Knight(1 , 7 , 1) , "WKN.png")
  addPiece(new Bishop(2 , 7 , 1) , "WB.png")
  addPiece(new King(3 , 7 ,1) , "WK.png")
  addPiece(new Queen(4 , 7 , 1) , "WQ.png")
  addPiece(new Bishop(5 , 7 , 1) , "WB.png")
  addPiece(new Knight(6 , 7 , 1) , "WKN.png")
  addPiece(new Rook(7 , 7 , 1) , "WR.png")

  for(let i = 0 ; i < 8 ; i++)
      addPiece( new WPawn(i , 6 , 1) , "WP.png" )

  addPiece(new Rook(0 , 0 , -1) , "BR.png")
  addPiece(new Knight(1 , 0 , -1) , "BKN.png")
  addPiece(new Bishop(2 , 0 , -1) , "BB.png")
  addPiece(new King( 3 , 0 ,-1) , "BK.png")
  addPiece(new Queen(4 , 0 , -1) , "BQ.png")
  addPiece(new Bishop(5 , 0 , -1) , "BB.png")
  addPiece(new Knight(6 , 0 , -1) , "BKN.png")
  addPiece(new Rook(7 , 0 , -1) , "BR.png")

  for(let i = 0 ; i < 8 ; i++)
      addPiece( new BPawn(i , 1 , -1) , "BP.png")


}

generateGrid()
initPieces()