let boxes = document.querySelectorAll(".box")
let resetBtn = document.querySelector(".reset")
let msg = document.querySelector(".msg")

// This will be used to keep track of who's chance it is: playerO or playerX
let turnO = true;

// List of all winning patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
]

// Resetting a game
const resetGame = () => {
    turnO = true
    enableBoxes()
    msg.classList.add("hide")

    for (let box of boxes) {
        box.classList.remove("hide")
    }

    if (resetBtn.innerText === "New Game") {
        resetBtn.innerText = "Reset"
    }
}

resetBtn.addEventListener("click", resetGame)

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            // playerO
            box.innerText = "O"
            turnO = false
        }
        else {
            // playerX
            box.innerText = "X"
            turnO = true
        }

        // Disabling the clicked button so that the value doesn't change
        box.disabled = true

        // Checking after each turn if someone has won the game or not
        checkWinner()
    })
})

// Disable all boxes once a winner is declared
const disableBoxes = () => {
    for (let box of boxes) {
        console.log("boxes")
        box.disabled = true
    }
}

// To enable all boxes to start a new game
const enableBoxes = () => {
    for (let box of boxes) {
        console.log("boxes")
        box.disabled = false
        // Setting the innerText of each box as empty
        box.innerText = ""
    }
}

// Message to declare the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations! The winner is ${winner}`
    msg.classList.remove("hide")

    for (let box of boxes) {
        box.classList.add("hide")
    }

    disableBoxes()
    resetBtn.innerText = "New Game"
    resetBtn.style.width = "15vw"
}

// Winner checker function
const checkWinner = () => {
    winPatterns.forEach((pattern) => {
        let pos1Val = boxes[pattern[0]].innerText
        let pos2Val = boxes[pattern[1]].innerText
        let pos3Val = boxes[pattern[2]].innerText

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val)
            }
        }
    })
}