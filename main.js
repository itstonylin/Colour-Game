// variables
let rgbValue, lives, currentMode;
let gameOver = false;
let topArea = document.getElementById("game-info-container");
// runs 3 functions when page loads
window.onload = function () {
    colourGenerator();
    livesCounter();
    initializeLives(1);
};

// displays randomly chosen colours for each box and chooses the
// rgb value to be guessed
colourGenerator = () => {
    let values = [];
    let box, tempRGBValue, chosenColourNum;
    // chooses a random number from 1 - 8 and the box that corresponds to that number will be the
    // box needed to be clicked to win
    chosenColourNum = Math.floor(Math.random() * 8) + 1;

    for (let i = 0; i < 8; i++) {
        // generates the rgb colour
        for (let x = 0; x < 3; x++) {
            values[x] = Math.floor(Math.random() * 256);
            console.log(values[x]);
        }
        // puts the rgb values into string
        tempRGBValue = "rgb(" + values[0] + ", " + values[1] + ", " + values[2] + ")";
        console.log(tempRGBValue);
        // prints chosen rgb value to user
        if (i === chosenColourNum) {
            console.log("BOX # " + (chosenColourNum + 1));
            document.getElementById("chosen-colour-value").innerHTML = tempRGBValue;
            rgbValue = tempRGBValue;
        }
        // shows the colour to each box
        box = document.getElementById("colour" + (i + 1));
        box.style.backgroundColor = tempRGBValue;
        box.style.transition = "1s linear";
    }
};

// function that decrements the lives
let livesCounter = () => {
    lives--;
    document.getElementById("lives").innerHTML = "<i class='fas fa-heart heart-icon'> X" + lives;
};

// function that resets the colours after the game
let changeColoursAfterGame = (individualBox, colour) => {
    // changes the colours to green or red depending on if the user wins or loses
    individualBox.style.opacity = "1";
    individualBox.style.transition = "1s linear";
    topArea.style.backgroundColor = colour;
    topArea.style.transition = "1s linear";
    individualBox.style.backgroundColor = colour;
    individualBox.style.transition = "1s linear";

    // game is over
    gameOver = true;
};

// function that sets up the lives for each game
let initializeLives = (modeNum) => {
    // modeNum --> easy button = 1 || insane button = 4
    if (modeNum === 1) {
        lives = 4;
    } else if (modeNum === 2) {
        lives = 3;
    } else if (modeNum === 3) {
        lives = 2;
    } else if (modeNum === 4) {
        lives = 1;
    }
    currentMode = modeNum;
    document.getElementById("lives").innerHTML = "<i class='fas fa-heart heart-icon'> X" + lives;
};

// function that resets the game
let reset = () => {
    topArea.style.backgroundColor = "#0099ff";
    document.querySelectorAll(".box").forEach((item, buttonNum) => {
        item.style.opacity = "1";
        item.style.transtion = "1s linear";
    });
    initializeLives(currentMode);
    colourGenerator();
    gameOver = false;
};

function changeClass(buttonElement, classRef) {
    // remove all existing classes starting with "colorbutton"
    buttonElement.classList.forEach((className) => {
        // two same lines for game starting off on easy mode
        if (className.startsWith("colorbutton")) buttonElement.classList.remove(className);
        if (className.startsWith("colorbutton")) buttonElement.classList.remove(className);
    });
    // add the new class
    buttonElement.classList.add("colorbutton-" + classRef);
}

// resets the game when the difficulty changes
document.querySelectorAll(".difficulty-button").forEach((gameMode, buttonNum) => {
    gameMode.addEventListener("click", function () {
        document.querySelectorAll(".difficulty-button").forEach((item) => {
            changeClass(item, 0);
        });
        initializeLives(buttonNum + 1);
        changeClass(this, buttonNum + 1);
        reset();
    });
});

// changes the box to disappear when clicked and changes the boards colours
// to green or red when user wins or loses, respectively.
document.querySelectorAll(".box").forEach((item) => {
    item.addEventListener("click", function () {
        let boxColour = window.getComputedStyle(item);
        // if user wins, change all boxes to green
        if (boxColour.backgroundColor === rgbValue) {
            document.querySelectorAll(".box").forEach((individualBox) => {
                changeColoursAfterGame(individualBox, "rgb(51, 165, 50)");
            });
        } else {
            if (gameOver === false) {
                item.style.opacity = "0";
                item.style.transition = "1s linear";
                livesCounter();
                // if user losers, change all boxes to red
                if (lives === 0) {
                    document.querySelectorAll(".box").forEach((individualBox) => {
                        changeColoursAfterGame(individualBox, "rgb(204,50,50)");
                    });
                }
            }
        }
    });
});

// generate new colours and resets the page to its default colour
let resetButton = document.getElementById("generate-colour-button");
resetButton.addEventListener("click", reset);
