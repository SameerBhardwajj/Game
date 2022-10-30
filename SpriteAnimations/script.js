let playerState = "fall";
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function (e) {
    playerState = e.target.value;
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = '../Assets/shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;

let grameFrame = 0;
const staggerFrame = 3;
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7
    },
    {
        name: 'jump',
        frames: 7
    },
    {
        name: 'fall',
        frames: 7
    },
    {
        name: 'run',
        frames: 9
    },
    {
        name: 'dizzy',
        frames: 11
    },
    {
        name: 'sit',
        frames: 5
    },
    {
        name: 'roll',
        frames: 7
    },
    {
        name: 'bite',
        frames: 7
    },
    {
        name: 'ko',
        frames: 12
    },
    {
        name: 'getHit',
        frames: 4
    }
]

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let postionX = j * spriteWidth;
        let postionY = index * spriteHeight;
        frames.loc.push({ x: postionX, y: postionY })
        spriteAnimations[state.name] = frames;
    }
})

function animateLoop() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let postion = Math.floor(grameFrame / staggerFrame) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * postion;
    let frameY = spriteAnimations[playerState].loc[postion].y
    // ctx.fillRect(100, 50, 100, 100);
    // ctx.drawImage(image, sourceX, sourceY, sourceWith, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight)
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)
    // if (grameFrame % staggerFrame === 0)
    //     frameX < 6 ? frameX++ : frameX = 0

    grameFrame++
    requestAnimationFrame(animateLoop);
}

animateLoop()