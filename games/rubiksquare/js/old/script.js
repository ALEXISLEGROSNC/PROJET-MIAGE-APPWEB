
const movementTime = 200; // 0.2s
const defaultRandomizeMovementsCount = 3;

window.init = function () {
  console.log("Page et ressources prêtes à l'emploi");
  var grid = document.getElementById("grille");
  generateGrid(grid);
}

window.onload = window.init();

function generateGrid(grid) {
  grid.innerHTML = '';
  var currentX = 0;
  var currentY = 0;
  for (var i = 0; i < 5 * 5; i++) {
    var cell = document.createElement('div');
    cell.setAttribute('data-x', currentX);
    cell.setAttribute('data-y', currentY);
    cell.classList.add('c' + (currentX + 1));
    cell.style.transition = "transform " + movementTime + "ms";

    grid.appendChild(cell);
    currentX++;
    if (currentX == 5) {
      currentX = 0;
      currentY++;
    }
  }

  attachOnclickEvents(grid);
  refreshPositions(grid);
}

var mouseClickX, mouseClickY;
var isMouseDown = false;

function attachOnclickEvents() {
  var grid = document.getElementById('grille');
  var elements = grid.getElementsByTagName('div');
  Array.from(elements).forEach(element => {
    let startX, startY;

    element.onmousedown = function(event) {
      startX = event.clientX;
      startY = event.clientY;

      document.onmousemove = function(event) {
        let isAlreadyInAWinningState = window.checkForWin(grid);
        let diffX = event.clientX - startX;
        let diffY = event.clientY - startY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX > 0) {
            moveRight(element);
          } else {
            moveLeft(element);
          }
        } else {
          if (diffY > 0) {
            moveDown(element);
          } else {
            moveUp(element);
          }
        }

        document.onmousemove = null;
        if(window.checkForWin(grid) && !isAlreadyInAWinningState){
          // wait(movementTime).then(() => {
          //   alert("Bravo, vous avez gagné !");
          // });
        }
      };

      document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  });
}

function moveUp(domCell) {
  var grid = document.getElementById("grille");
  var domCells = grid.getElementsByTagName('div');

  var columnCells = Array.from(domCells).filter(element => parseInt(element.dataset.x) === parseInt(domCell.dataset.x));

  columnCells.forEach(cell => {
    var y = parseInt(cell.dataset.y);
    cell.dataset.y = (y + 4) % 5;
  });

  refreshPositions(grid);
}

function moveDown(domCell) {
  var grid = document.getElementById("grille");
  var domCells = grid.getElementsByTagName('div');

  var columnCells = Array.from(domCells).filter(element => parseInt(element.dataset.x) === parseInt(domCell.dataset.x));

  columnCells.forEach(cell => {
    var y = parseInt(cell.dataset.y);
    cell.dataset.y = (y + 1) % 5;
  });

  refreshPositions(grid);
}

function moveLeft(domCell) {
  var grid = document.getElementById("grille");
  var domCells = grid.getElementsByTagName('div');

  var rowCells = Array.from(domCells).filter(element => parseInt(element.dataset.y) === parseInt(domCell.dataset.y));

  rowCells.forEach(cell => {
    var x = parseInt(cell.dataset.x);
    cell.dataset.x = (x + 4) % 5;
  });

  refreshPositions(grid);  
}

function moveRight(domCell) {
  var grid = document.getElementById("grille");
  var domCells = grid.getElementsByTagName('div');
  
  var rowCells = Array.from(domCells).filter(element => parseInt(element.dataset.y) === parseInt(domCell.dataset.y));

  rowCells.forEach(cell => {
    var x = parseInt(cell.dataset.x);
    cell.dataset.x = (x + 1) % 5;
  });

  refreshPositions(grid);
}


function refreshPositions(grid){
  var elements = grid.getElementsByTagName('div');
  Array.from(elements).forEach(element => {
    element.style.transform = "translate(" + (element.dataset.x * 100) + "px," + (element.dataset.y * 100) + "px)";
  });
}

window.randomize = async function(numMoves) {
  var grid = document.getElementById("grille");
  var elements = Array.from(grid.getElementsByTagName('div'));
  var moves = [moveLeft, moveRight, moveUp, moveDown];
  var numMoves = numMoves?numMoves:defaultRandomizeMovementsCount; // A changer pour augmenter ou diminuer la difficulté

  for (var i = 0; i < numMoves; i++) {
    var randomElement = elements[Math.floor(Math.random() * elements.length)];
    var randomMove = moves[Math.floor(Math.random() * moves.length)];
    randomMove(randomElement);
    refreshPositions(grid);
    await wait(50); // Attendre 0,5s
  }
}

function DomFromCell(x, y) {
  var grid = document.getElementById("grille");
  var elements = grid.getElementsByTagName('div');
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (parseInt(element.getAttribute('data-x')) === x && parseInt(element.getAttribute('data-y')) === y) {
      return element;
    }
  }
  return null;
}

function CellFromDom(domCell) {
  return {
    x: parseInt(domCell.getAttribute('data-x')),
    y: parseInt(domCell.getAttribute('data-y'))
  };
}



window.checkForWin = function() {
  var grid = document.getElementById("grille");
  var couleurs = getGridColors(grid);

  // check colonnes
  for (var x = 0; x < 5; x++) {
    var couleur = couleurs[0][x];
    var win = true;
    for (var y = 0; y < 5; y++) {
      if (couleurs[y][x] !== couleur) {
        win = false;
        break;
      }
    }
    if (win) {
      return true;
    }
  }

  // check lignes
  for (var y = 0; y < 5; y++) {
    var couleur = couleurs[y][0];
    var win = true;
    for (var x = 0; x < 5; x++) {
      if (couleurs[y][x] !== couleur) {
        win = false;
        break;
      }
    }
    if (win) {
      return true;
    }
  }
  // sinon , false
  return false;
}

function getGridColors() {
  var grid = document.getElementById("grille");
  var domCells = grid.getElementsByTagName('div');
  var colors = Array(5).fill(null).map(() => Array(5).fill(null));

  Array.from(domCells).forEach(cell => {
    var x = parseInt(cell.dataset.x);
    var y = parseInt(cell.dataset.y);
    var colorClass = Array.from(cell.classList).find(cls => /^c\d+$/.test(cls));
    colors[y][x] = colorClass;
  });

  return colors;
}
window.getGridColors = getGridColors();

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}