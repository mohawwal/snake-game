let playBoard = document.querySelector(".wrapper .play-board")
let highScoresElement = document.querySelector(".high-score")
let movingArrows = document.querySelectorAll(".movingArrows i")

let gameOver = false
let foodX, foodY;
let snakeX = 4, snakeY=20;
let snakeBody =[];
let velocityX =0, velocityY = 0;
let setIntervalId

let highScore = localStorage.getItem("high-score");
highScoresElement.innerText = `high-Scores: ${highScore}`

const handleGameOver =()=> {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...")
    location.reload()
}

//change the food poison randomly
const changeFoodPoison = () => {
    foodX = Math.floor(Math.random() * 30) + 1
    foodY = Math.floor(Math.random() * 30) + 1
}

// Function to handle arrow clicks
const handleArrowClick = (e) => {
    const direction = e.target.getAttribute("data-direction");
  
    // Change the direction based on the arrow clicked
    if (direction === "up" && velocityY !== 1) {
      velocityX = 0;
      velocityY = -1;
    } else if (direction === "down" && velocityY !== -1) {
      velocityX = 0;
      velocityY = 1;
    } else if (direction === "left" && velocityX !== 1) {
      velocityX = -1;
      velocityY = 0;
    } else if (direction === "right" && velocityX !== -1) {
      velocityX = 1;
      velocityY = 0;
    }
  };
  
  // Add a click event listener to each arrow icon
  movingArrows.forEach((arrow) => {
    arrow.addEventListener("click", handleArrowClick);
  });
  
  // Function to handle key presses
  const changeDirection = (e) => {
    //change the direction based on the key press
    if (e.key === "ArrowUp" && velocityY !== 1) {
      velocityX = 0;
      velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY !== -1) {
      velocityX = 0;
      velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX !== 1) {
      velocityX = -1;
      velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX !== -1) {
      velocityX = 1;
      velocityY = 0;
    }
  };
  
  // Add a keydown event listener to handle key presses
  document.addEventListener("keydown", changeDirection);
  


const initGame = () => {
    const scores = document.querySelector(".scores")
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`

    //update the snake head in the position of the velocity
    snakeX += velocityX
    snakeY += velocityY;

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPoison()
        snakeBody.push([foodX, foodY])

        const currentScore = snakeBody.length - 1
        scores.innerText = `Scores: ${currentScore}`
        

        if(currentScore > highScore) {
            highScore = currentScore;
            localStorage.setItem("high-score", highScore);
            highScoresElement.innerText = `High Scores: ${highScore}`
        }
        
    }

    for (let i =snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }


    snakeBody[0] = [snakeX, snakeY];

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }
   

    for(let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
        //check if the snake head hit the body
        if(i !== 0 && snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]) {
            gameOver = true
        }
    }
    playBoard.innerHTML = htmlMarkup
}
changeFoodPoison()
setIntervalId = setInterval(initGame, 125)

document.addEventListener("keydown", changeDirection);