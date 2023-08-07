const resetButton = document.getElementById('reset-button');
const blackDrawButton = document.getElementById('black-draw-button')
const randomDrawButton = document.getElementById('random-draw-button')
const container = document.querySelector('.container');

let isDrawing = false;
let drawMode = 'black';

function changeColor(event) {
  if (isDrawing) {
    if (drawMode === 'black') {
        event.target.style.backgroundColor = 'black';
    } else if (drawMode === 'random') {
        const randomColor = getRandomColor();
        console.log('random color:', randomColor)
        event.target.style.backgroundColor = randomColor;
    }
  }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#'
    for (let k = 0; k < 6; k++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function startDrawing() {
  isDrawing = true;
}

function stopDrawing() {
  isDrawing = false;
}

const createGrid = (amtOfGrids) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  for (let i = 0; i < amtOfGrids; i++) {
    const row = document.createElement('div');
    row.classList.add('grid-row');

    for (let j = 0; j < amtOfGrids; j++) {
      const widthAndHeight = 960 / amtOfGrids;
      const gridBox = document.createElement('div');
      gridBox.classList.add('grid-box');
      gridBox.style.width = `${widthAndHeight}px`;
      gridBox.style.height = `${widthAndHeight}px`;

      gridBox.addEventListener('mousedown', startDrawing);
      gridBox.addEventListener('mousemove', changeColor);
      gridBox.addEventListener('mouseup', stopDrawing);

      row.appendChild(gridBox);
    }

    wrapper.appendChild(row);
  }

  container.appendChild(wrapper);
};

createGrid(16);

resetButton.addEventListener('click', () => {
  let userSize = Number(prompt('Please give dimension for grid:'));

  while (userSize > 100 || userSize < 1) {
    userSize = Number(prompt('Please choose a number from 1 through 100:'));
  }

  const wrapper = document.querySelector('.wrapper');

  if (!wrapper) {
    createGrid(userSize);
  } else {
    wrapper.remove();
    createGrid(userSize);
  }
});

blackDrawButton.addEventListener('click', () => {
    drawMode = 'black';
})

randomDrawButton.addEventListener('click', () => {
    drawMode = 'random';
})