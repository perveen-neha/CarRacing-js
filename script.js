const score = document.querySelector(".score");
const game = document.querySelector(".game")
const startScreen = document.querySelector(".startScreen")
const gameArea = document.querySelector(".gameArea")

let keys = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowLeft : false,
    ArrowRight : false
}

let player = {speed:5, score:0};

startScreen.addEventListener("click", start)
document.addEventListener("keydown", pressOn)
document.addEventListener("keyup", pressOff)

function pressOn(e)
{
    e.preventDefault();
    keys[e.key] = true;
    
}

function pressOff(e)
{
    e.preventDefault();
    keys[e.key] = false
   
}

function moveLines() {
    let lines= document.querySelectorAll(".line")
    lines.forEach(function(line){
        if(line.y > 1000)
            line.y-=1200;
        line.y+=player.speed;
        
        line.style.top = line.y + "px"
    })
    
   
}

function isCollide(car, enemy)
{
    let c = car.getBoundingClientRect();
    let e = enemy.getBoundingClientRect();
    
    
    return !((c.bottom < e.top) || (c.top > e.bottom) || (c.right < e.left) || (c.left > e.right) )
}

function moveEnemy(car) {
    let enemies= document.querySelectorAll(".enemy")
    enemies.forEach(function(enemy){
        if(isCollide(car,enemy)) endGame();
        if(enemy.y > 1000)
        {
            enemy.y=-600;
            enemy.style.left = Math.floor(Math.random()*150) +"px"
        }
        enemy.y+=player.speed;
        
        enemy.style.top = enemy.y + "px"
    })
    
   
}


function playGame(){
    let car = document.querySelector(".car")
    moveLines()
    moveEnemy(car)

    let road = gameArea.getBoundingClientRect();
    
    if(player.start == true)
    {
        if(keys.ArrowDown && player.y <road.bottom-100) {player.y+=player.speed ;}
        if(keys.ArrowLeft && player.x > 0) {player.x-=player.speed}
        if(keys.ArrowRight && player.x < road.width-50) {player.x+=player.speed}
        if(keys.ArrowUp && player.y > road.top-60) {player.y-=player.speed}

        car.style.left = player.x+'px';
        car.style.top = player.y+'px';
        player.score++;
        score.innerText = "score: " + player.score;
       window.requestAnimationFrame(playGame)
    }
}


function endGame() {
    player.start = false;
    score.innerHTML = "Game Over <br> Score : " + player.score;
    startScreen.classList.remove("hide")
}

function start() {
    player.start = true;
    player.score=0;
    gameArea.innerHTML="";
    // gameArea.classList.remove("hide")
    startScreen.classList.add("hide")
    for(let i=0; i<10; ++i)
    {
        let line = document.createElement("div")
        line.classList.add("line");
        line.y=i*150;
        line.style.top = (i*150)+'px';
        gameArea.appendChild(line)
    }
    window.requestAnimationFrame(playGame);
    let car = document.createElement("div");
    car.innerHTML = "car";
    car.setAttribute("class","car");
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for(let i=0; i<3; ++i)
    {
        let enemy = document.createElement("div")
        enemy.classList.add("enemy");
        enemy.y=((i+1)*600)*-1;
        enemy.style.top = enemy.y +'px';
        enemy.style.left = Math.floor(Math.random()*150) +"px";
        enemy.style.backgroundColor = "red"
        gameArea.appendChild(enemy)
    }
    
}
