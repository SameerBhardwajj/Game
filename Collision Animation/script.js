const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 700;

const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();

class Explosion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.spriteWidth = 200;
        this.spritHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spritHeight * 0.7;
        this.image = new Image();
        this.image.src = '../Assets/boom.png';
        this.sound = new Audio();
        this.sound.src = '../Assets/sounds/Fire_impact.wav';
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
    }

    update() {
        if (this.frame === 0) this.sound.play()
        this.timer++;
        this.timer % 10 === 0 ? this.frame++ : null
    }
    draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spritHeight, 0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
        ctx.restore()
    }

}

window.addEventListener('click', function (e) {
    let positionX = e.x - canvasPosition.left
    let positionY = e.y - canvasPosition.top
    // ctx.fillStyle = 'white'
    // ctx.fillRect(positionX - 25, positionY - 25, 50, 50)
    explosions.push(new Explosion(positionX, positionY))
})

// animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < explosions.length; i++) {
        explosions[i].update()
        explosions[i].draw()
        if (explosions[i].frame > 5) {
            explosions.splice(i, 1)
            i--
        }
    }
    requestAnimationFrame(animate)
}
animate()