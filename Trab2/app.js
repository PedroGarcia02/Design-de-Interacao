const grid = document.querySelector(".grid")
const resultDisplay = document.querySelector(".results")
const totalresultDisplay = document.querySelector(".resultstotal")
let currentShooterIndex = 202
const width = 15
const aliensRemoved = []
let invadersId
let isGoingRight = true
let direction = 1
let results = 0
let resultstotal = 0;

const shootsound = new Audio("/audio/shoot.wav")
shootsound.volume = 0.1;
const killsound = new Audio("/audio/invaderkilled.wav")
killsound.volume = 0.1;
const explosionsound = new Audio("/audio/explosion.wav")
explosionsound.volume = 0.2;


if(localStorage.getItem("total")) {
    resultstotal = localStorage.getItem("total");
}

totalresultDisplay.innerHTML = resultstotal

function start () {
    const startbtn = document.getElementById("start");
    startbtn.remove();

for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div")
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll(".grid div"))


const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add("invader")
        }
    }
}

draw()

squares[currentShooterIndex].classList.add("shooter")

function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove("invader")
    }
}

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove("shooter")
    switch (e.key) {
        case "ArrowLeft":
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
            break
        case "ArrowRight":
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1
            break
    }
    squares[currentShooterIndex].classList.add("shooter")
}

document.addEventListener("keydown", moveShooter)

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
    remove()
    

    if (rightEdge && isGoingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1
            direction = -1
            isGoingRight = false
        }
    }

    if (leftEdge && !isGoingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1
            direction = 1
            isGoingRight = true
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }

    draw()

    if (squares[currentShooterIndex].classList.contains("invader")) {
        resultDisplay.innerHTML = "GAME OVER"
        clearInterval(invadersId)
        explosionsound.play();
        setTimeout(end, 500);
    }

    if (aliensRemoved.length === alienInvaders.length) {
        resultDisplay.innerHTML = "YOU WIN"
        clearInterval(invadersId)
        setTimeout(end, 500);
    }
}

invadersId = setInterval(moveInvaders, 600)

function end() {
    grid.remove()
    let button = document.createElement('BUTTON');
    let text = document.createTextNode("Restart");
    let myDiv = document.getElementById("restart")
    myDiv.classList.add("restarton")
    button.appendChild(text);
    button.classList.add("resetbtn")
    myDiv.appendChild(button);
    button.setAttribute("onclick", "reload()");
}

function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex
    if(e.key == "ArrowUp") {
        shootsound.play() 
    }
    function moveLaser() {

        if(currentLaserIndex > 0) {
        squares[currentLaserIndex].classList.remove("laser")    
    }
        currentLaserIndex -= width

        if(currentLaserIndex > 0) {
        squares[currentLaserIndex].classList.add("laser")
    
        

        if (squares[currentLaserIndex].classList.contains("invader")) {
            squares[currentLaserIndex].classList.remove("laser")
            squares[currentLaserIndex].classList.remove("invader")
            squares[currentLaserIndex].classList.add("boom")

            setTimeout(() => squares[currentLaserIndex].classList.remove("boom"), 300)
            clearInterval(laserId)

            killsound.play();

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
            results++
            resultstotal++
            resultDisplay.innerHTML = results
            totalresultDisplay.innerHTML = resultstotal
            localStorage.setItem("total", resultstotal);
        }
    }
}

    if (e.key === "ArrowUp") {
        laserId = setInterval(moveLaser, 100) // velocidade que o tiro anda
    }
}

document.addEventListener('keydown', shoot)

}

function reload() {
    location.reload();
}