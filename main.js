console.log("started");

const MAP_WIDTH = 11;
const MAP_HEIGHT = 8;

var paused = true;

var ball = {
    x: 2,
    y: 0,
    xDirection: false, //true - right, false - left
    yDirection: false,
    speed: 250
}

var player = {
    x: 0,
    y: 0,
    score: 0
}

var computer = {
    x: MAP_WIDTH-1,
    y: 2,
    score: 0,
    lvl: 1.25
}

var mapArr = [];

document.getElementById('map').style.width = MAP_WIDTH*32+"px";

document.addEventListener('keyup', function(event) {
    if (event.code == 'KeyW' || event.code == 'ArrowUp') {
        if(player.y > 0) {
            player.y--;
            render();
        }
    } else if (event.code == 'KeyS' || event.code == 'ArrowDown') {
        if(player.y < MAP_HEIGHT-2) {
            player.y++;
            render();
        }
    }
    if(event.code == 'Space') {
        paused = !paused;
    }
});

renderMap();

var timer = setInterval(function() { 
        if(!paused) {
            document.getElementById("paused").style.display = 'none';
            loop(); 
        } else {
            document.getElementById("paused").style.display = 'block';
        }
    }, ball.speed);
let autopilot = setInterval(computerPilot, ball.speed * computer.lvl);

function computerPilot() {
    if(ball.y > computer.y) {
        computer.y++;
    } else {
        if(ball.y != computer.y) {
            computer.y--;
        }
    }
    if(computer.y == MAP_HEIGHT-1) {
        computer.y--;
    }
}

function loop() {
    
    if(ball.x == 0) {
        console.log("YOU LOOSE");
        computer.score++;
        document.getElementById("scoreComp").innerText = computer.score;
        ball.xDirection = !ball.xDirection;
    }
    if(ball.x == MAP_WIDTH-1) {
        console.log("YOU WIN");
        player.score++;
        document.getElementById("scorePlayer").innerText = player.score;
        ball.xDirection = !ball.xDirection;
    }

    if(ball.x == player.x+1 && !ball.xDirection) {
        if(ball.y == player.y || ball.y == player.y+1) {
            ball.xDirection = !ball.xDirection;
            console.log("player collision");
        }
        if(ball.y == player.y-1 && ball.yDirection) {
            //отражение под углом
            ball.xDirection = !ball.xDirection;
            ball.yDirection = !ball.yDirection;
        }
        if(ball.y == player.y+2 && !ball.yDirection) {
            //отражение под углом
            ball.xDirection = !ball.xDirection;
            ball.yDirection = !ball.yDirection;
        }
    }

    if(ball.x == computer.x-1 && ball.xDirection) {
        if(ball.y == computer.y || ball.y == computer.y+1) {
            ball.xDirection = !ball.xDirection;
        }
        if(ball.y == computer.y-1 && ball.yDirection) {
            ball.xDirection = !ball.xDirection;
            ball.yDirection = !ball.yDirection;
        }
        if(ball.y == computer.y+2 && !ball.yDirection) {
            ball.xDirection = !ball.xDirection;
            ball.yDirection = !ball.yDirection;
        }
    }

    //отражение от стенок горизонтальных
    if(ball.y == 0 || ball.y == MAP_HEIGHT-1) {
        ball.yDirection = !ball.yDirection;
    } 
    
    if(ball.xDirection) {
        ball.x++;
    } else {
        ball.x--;
    }
    if(ball.yDirection) {
        ball.y++;
    } else {
        ball.y--;
    }
    render();
}

function render() {
    var map = document.getElementById('map');
    var nodes = map.childNodes;

    for(var i = 0; i < MAP_HEIGHT; i++) {
        for(var j = 0; j < MAP_WIDTH; j++) {
            c = i * MAP_WIDTH + j;
            if((player.y == i || player.y + 1 == i) && player.x == j) {
                nodes[c].className = 'player';
            } else if((computer.y == i || computer.y + 1 == i) && computer.x == j) {
                nodes[c].className = 'bot';
            } else if(ball.y == i && ball.x == j) {
                nodes[c].className = 'ball';
            } else {
                nodes[c].className = 'block';
            }
        }
    }
    //clearTimeout(timer); //когда надоест.
}

function renderMap() {
    for(var i = 0; i < MAP_HEIGHT; i++) {
        for(var j = 0; j < MAP_WIDTH; j++) {
            let div = document.createElement('div');
            if((player.y == i || player.y + 1 == i) && player.x == j) {
                div.className = 'player';
            } else if((computer.y == i || computer.y + 1 == i) && computer.x == j) {
                div.className = 'bot';
            } else if(ball.y == i && ball.x == j) {
                div.className = 'ball';
            } else {
                div.className = 'block';
            }
            document.getElementById('map').append(div);
        }
    }
}