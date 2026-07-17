const board = document.querySelector(".board");
const modal = document.querySelector(".modal");
const btn = document.querySelector(".btn-start");

const startgamemodal = document.querySelector(".startgame");
const gameovermodal = document.querySelector(".game-over");
const restartbtn = document.querySelector(".restart-btn");   

const score_element = document.querySelector("#score");
const highscore_element = document.querySelector("#highscore");
const time_element = document.querySelector("#time");

const blockwidth = 50
const blockheight = 50

const cols = Math.floor(board.clientWidth/blockwidth);
const rows = Math.floor(board.clientHeight/blockheight);


let score = 0;
let highscore = 0;
let time = `0-0`;

// for (let i = 0; i <rows*cols; i++) {       //another method to append blocks in board
//     const block = document.createElement("div");
//     block.classList.add("block");
//     board.appendChild(block); 
// }


let interval_id = null;
let timerinterval_id = null;

let food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
const blocks = [];

let snake = [{
    x: 1,y:3
// },{
//     x: 1,y:4
// },{
//     x: 1,y:5    
}]

//my thought

// modal.classList.remove("hide");
// btn.addEventListener("click", ()=>{
// modal.classList.add("hide");
// interval_id = setInterval(() =>{
//     render();
// },300)
// })

//actual
// btn.addEventListener("click", ()=>{
//     modal.style.display = "none"; 
//     interval_id = setInterval(() => {
//         render()
//     },300);
// })

let direction = "down";

for (let row = 0; row<rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);  
        // console.log(row,col); 
        // block.innerText = [row,col]; //used to print coordinates on screen 
        blocks[`${row}-${col}`] = block
    }
}


function render(){

    let head = null;
    
    blocks[`${food.x}-${food.y}`].classList.add("food")


    if (direction === "left") {
        head = {x:snake[0].x,y:snake[0].y-1}

    }else if(direction === "right"){
        head = {x:snake[0].x,y:snake[0].y+1}
    }else if(direction === "up"){
        head = {x:snake[0].x-1,y:snake[0].y}
    }else if(direction === "down"){
        head = {x:snake[0].x+1,y:snake[0].y}
    }

    if (head.x<0 || head.x >=rows || head.y<0 || head.y>=cols) {
        // console.log(score);


        // alert("Game over");

        modal.style.display = "flex";
        startgamemodal.style.display = "none";
        gameovermodal.style.display = "flex";


        clearInterval(interval_id);
        return;
    }

    if (head.x === food.x && head.y === food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
        blocks[`${food.x}-${food.y}`].classList.remove("add");
        snake.unshift(head);
        score++;
        highscore++;
        // console.log(count);
        score_element.innerText = score;    //score add
    }

    snake.forEach(segment =>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");

    })

    snake.unshift(head);   //appends element at top
    snake.pop();
    
    snake.forEach(segment =>{
        // console.log(segment)
        // console.log(blocks[[segment.x,segment.y]])  //accessing that blocks
        blocks[`${segment.x}-${segment.y}`].classList.add("fill");

    })

}

// interval_id = setInterval(() =>{
//     render();
// },300)

btn.addEventListener("click", ()=>{
    modal.style.display = "none"; 
    interval_id = setInterval(() => {
        render()
    },300);

    //time setting
    timerinterval_id = setInterval(() =>{
        let [min,sec] = time.split("-").map(Number)  //destructuring
        if (sec ==59) {
            min+=1;
            sec=0;
        }else{
            sec+=1;
        }

        time = `${min}-${sec}`;
        time_element.innerText = time;
    },1000)

})



restartbtn.addEventListener("click",restartgame);

function restartgame(){
    if (score => highscore) {
        highscore_element.innerText = highscore;
    }
    time_element.innerText = "0-0";
    time = '0-0';
    score= 0;
    highscore = 0;
    score_element.innerText = "0";

    blocks[`${food.x}-${food.y}`].classList.remove("food");
    snake.forEach(segment =>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");

    })

    modal.style.display = "none";
    snake = [{x: 1,y:3}];
    direction = "down";
    food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
    interval_id = setInterval(() => {
        render()
    },300);
}

addEventListener("keydown", (event)=>{
    // console.log(event.key)
    if (event.key === "ArrowUp") {
        direction = "up";
    }else if (event.key === "ArrowDown") {
        direction = "down";
    }else if (event.key === "ArrowRight") {
        direction = "right";
    }else if (event.key === "ArrowLeft") {
        direction = "left";
    }
})


