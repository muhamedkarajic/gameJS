
var pickerSize = 40;




function validMove(keyCode, index) {

    var x = 0, y = 0;


    if (keyCode == '38' && index - pickerSize >= 0)//up
    {
        index -= blockSize;
        y = -100;
    }
    else if (keyCode == '40' && index + pickerSize < pickerSize * pickerSize)//down
    {
        index += blockSize;
        y = 100;
    }
    else if (keyCode == '37' && (index) % pickerSize != 0)//left
    {
        index--;
        x = -100;
    }
    else if (keyCode == '39' && (index + 1) % pickerSize != 0)//right
    {
        index++;
        x = 100;
    }
    else
        index = -1;

    if (index != -1 && rectangles[index].classList.contains("remove"))
        index = -1;

    return {
        index: index,
        x: x,
        y: y
    };
    // Return it
}



function moveAsteroid(asteroidIndex, lastDirection) {
    let index = validMove(lastDirection, asteroidIndex);

    if (index.index == -1 || rectangles[index.index].classList.contains("remove")) {
        rectangles[asteroidIndex].classList.remove("asteroid");
    }
    else {
        
        if (asteroidIndex != index.index)
            rectangles[asteroidIndex].classList.remove("asteroid");
        if (!rectangles[index.index].classList.contains("remove")) {
            rectangles[index.index].classList.add("asteroid");
            asteroidIndex = index.index;
            
            setTimeout(function () {
                moveAsteroid(asteroidIndex, lastDirection);
            }, 200);

        }

        


        // if (asteroidIndex == enemyIndex) {
        //     document.getElementById('gameOver').innerHTML = '<p>YOU KILLED THE ENEMY!</p>';
        //     document.getElementById('gameOver').style.visibility = 'visible';
        //     rectangles[asteroidIndex].id = "";
        //     rectangles[enemyIndex].id = "";
        // }
        // else if (asteroidIndex == player.index) {
        //     document.getElementById('gameOver').innerHTML = '<p>ENEMY KILLED PLAYER!</p>';
        //     document.getElementById('gameOver').style.visibility = 'visible';
        //     rectangles[asteroidIndex].id = "";
        //     rectangles[player].id = "";
        // }
    }


}






var rectangles = document.getElementsByClassName("rectangle");

var player = {
    index: (pickerSize * pickerSize) / 2 + pickerSize / 2,
    id: 'player',
    disableKey: false,
    lastDirection: "38",
    currentDirection: "38",
    lockDirection: false,
    asteroidIndex: (pickerSize * pickerSize) / 2 + pickerSize / 2,
    move: function (keyCode) {
        if (!this.disableKey) {
            this.disableKey = true;
            let index = validMove(keyCode, this.index);
            
            if (index.index != -1) {
                // document.getElementById('audio').play();
                if (keyCode != '70')
                    this.currentDirection = keyCode;
                if (!this.lockDirection)
                    this.asteroidIndex = player.index;
                if (this.index == enemyIndex) {
                    document.getElementById('gameOver').innerHTML = '<p>Game Over!</p>';
                    document.getElementById('gameOver').style.visibility = 'visible';
                }


                rectangles[this.index].style.webkitTransition = 'transform 300ms';
                rectangles[this.index].style.transform = "translate(" + index.x + "%," + index.y + "%)";

                setTimeout(function () {
                    player.disableKey = false;
                    player.animation(index.index);
                }, 300);
            }
            else
            {
                if (keyCode == '70' && !this.lockDirection) {
                    this.lastDirection = this.currentDirection;
                    moveAsteroid(this.asteroidIndex, this.lastDirection);
                }
                this.disableKey = false;
            }
        }
    },
    animation: function (index) {
        rectangles[this.index].id = "";
        rectangles[index].id = this.id;

        rectangles[this.index].style.webkitTransition = 'transform 0ms';
        rectangles[this.index].style.transform = "translate(0%,0%)";
        this.index = index;
    }
};

for (var i = 0; i < pickerSize * pickerSize; i++) {
    var div = document.createElement("div");
    div.className = "rectangle";
    div.dataset.color = i;
    div.disabled = true;
    document.getElementById("picker").appendChild(div);
}


rectangles[player.index].id = player.id;

var enemyIndex = (pickerSize * pickerSize) / 2 + 2;
rectangles[enemyIndex].id = "enemy";



var l = 5;
var rectangleNumbers = [];
var rectanglePath = [];
var x;
var blockSize = 40;

function checkKey(e) {
    e = e || window.event;
    player.move(e.keyCode);
}



document.onkeydown = checkKey;

function randomMove() {
    var e = parseInt((Math.random() * 4) + 37);



    let index = validMove(e, enemyIndex);
    if (index.index != -1) {
        moveAsteroid(enemyIndex, e);
        rectangles[enemyIndex].id = "";
        rectangles[index.index].id = "enemy";
        enemyIndex = index.index;
        if (rectangles[player.index].classList.contains("remove"))
            console.log("The enemy is dead!");
    }
    else
        randomMove();
}

setInterval(randomMove, 500);


function RandomLocation(x = 0) {
    var number;
    do {
        number = parseInt(Math.random() * (pickerSize * pickerSize));
    } while (rectangles[number].classList.contains("remove") || player.index === number);


    if (x < (pickerSize * pickerSize) / 4) {
        setTimeout(function () {
            rectangles[number].classList.add("remove");
            RandomLocation(++x);
        }, 50);
    }
}

RandomLocation();




// function resetFocus () {
//     let scrollTop = document.body.scrollTop;
//     let body = document.body;

//     let tmp = document.createElement('input');
//     tmp.style.opacity = 0;
//     body.appendChild(tmp);
//     tmp.focus();
//     body.removeChild(tmp);
//     body.scrollTop = scrollTop;
// }

// while(rectangleNumbers.length < l)
// {
//     x = parseInt(Math.random() * rectangles.length);
//     if(!rectangleNumbers.includes(rectangles[x].dataset.color))
//         rectangleNumbers.push(rectangles[x].dataset.color);
// }

// console.log(rectangleNumbers);

// function FindColorIndex(colorName)
// {
//     for(var i = 0; i < rectangles.length; i++)
//     {
//         console.log(colorName + " " + rectangleNumbers[i]);
//         if(colorName === rectangles[i].dataset.color)
//             return i;
//     }
//     return -1;
// }

// function EnableButtons()
// {
//     for(var i = 0; i < rectangles.length; i++)
//     {
//         rectangles[i].disabled = false;
//     }
// }

// function FocuseRecursion(x = 0)
// {
//     if(x < l)
//     {
//         setTimeout(function(){
//             rectangles[FindColorIndex(rectangleNumbers[x])].focus();
//             FocuseRecursion(++x);
//         }, 1000); 
//     }
//     else
//         setTimeout(function(){
//             resetFocus();
//             EnableButtons();
//         }, 1000); 

// }

// FocuseRecursion();

// for(var i = 0; i < rectangles.length; i++)
// {
//     rectangles[i].addEventListener('click', function(){
//         if(rectanglePath.length < l)
//         {
//             rectanglePath.push(this.dataset.color);
//             console.log(rectanglePath);
//         }
//         else
//         {
//             for(var i = 0; i < l; i++)
//                 if(rectanglePath[i] != rectangleNumbers[i])
//                 {
//                     console.log("Nije ispravno");
//                     return;
//                 }
//             console.log("Ispravno");
//         }
//     });
// }


