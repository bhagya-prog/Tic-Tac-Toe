let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 2000);
    if (turnO == false) {
        trail.style.background = " #191913";
    }
});

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hidden");
    document.body.style.overflow = "hidden";
    count = 0;
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
                disableBoxes();
                showWinner(pos1Val);
            }
        }
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.classList.add("o-color");
            box.classList.remove("x-color");
            turnO = false;
            count++;
        } else {
            box.innerText = "X";
            box.classList.add("x-color");
            box.classList.remove("o-color");
            turnO = true;
            count++;
        }
        box.disabled = true;
        if (count == 9) {
            msg.innerText = `The match was a DRAW`;
            msgContainer.classList.remove("hidden");
            document.body.style.overflow = "hidden";
            count = 0;
        }
        checkWinner();
    })
})

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);