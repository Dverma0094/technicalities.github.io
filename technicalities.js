const canvas = document.getElementById('mergedImageCanvas');
const ctx = canvas.getContext('2d');

const imagePaths = {
    background: 'img/Playground.png',
    football: 'img/Football.png'
};

const imageObjects = {};

const gifWidth = 1340;   
const gifHeight = 630; 

let frameIndex = 0;

function preloadImages(callback) {
    let loadedImages = 0;
    const totalImages = Object.keys(imagePaths).length;

    for (const key in imagePaths) {
        imageObjects[key] = new Image();
        imageObjects[key].src = imagePaths[key];
        imageObjects[key].onload = () => {
            loadedImages++;
            if (loadedImages === totalImages) {
                callback();
            }
        };
    }
}

function drawFrame() {
    ctx.clearRect(0, 0, gifWidth, gifHeight);

    
    ctx.drawImage(imageObjects.background, 0, 0, gifWidth, gifHeight);

   
    const footballY = gifHeight / 2 + Math.sin(frameIndex * 0.03) * (gifHeight / 2.8);

   
    ctx.drawImage(imageObjects.football, gifWidth / 2 - 50, footballY, 80, 80);

    frameIndex++;

    requestAnimationFrame(drawFrame);
}

function startAnimation() {
    canvas.width = gifWidth;    
    canvas.height = gifHeight;  
    preloadImages(() => {
        drawFrame();
    });
}

startAnimation();
