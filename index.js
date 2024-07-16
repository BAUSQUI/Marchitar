let modelado;
let flor;
let ZeroRadious = 75;
let OneRadious = 150;
let pos;
let angle = 0; 
let orbitX, orbitY, orbitZ;
let currentState;
let showHibiscus = true;
let showFlower = false;
let showBackground = true;
let currentTexture;
let cancion;
let isGlitched = false;

function preload() {
    textura = loadImage("hibiscus_3.png");
    modelado = loadModel("3D_HIBISCUS.obj");
    flor = loadModel("FLOR1.obj");
    textura1 = loadImage("text2.png");
    textura2 = loadImage("text3.png");
    textura3 = loadImage("HIBISCUSROSA.png");
    cancion = loadSound("Catsu.mp3");
    currentTexture = textura;
}

function setup() {
    angleMode(DEGREES);
    createCanvas(windowWidth, windowHeight, WEBGL);

    let toggleMuteButton = document.getElementById('toggleMuteButton');
    toggleMuteButton.addEventListener('click', toggleMute);

    let button = document.getElementById('toggleButton');
    button.addEventListener('click', toggleFlower);

    let glitchButton = document.getElementById('glitchButton');
    glitchButton.addEventListener('click', toggleGlitchAndBackground);

    const img3 = document.getElementById('img3');
    const img4 = document.getElementById('img4');
    const img5 = document.getElementById('img5');
    const img6 = document.getElementById('img6');
    const hibDISPLAY = document.querySelector('.hibDISPLAY');
    const hibDISPLAY2 = document.querySelector('.hibDISPLAY2');
    const hibDISPLAY3 = document.querySelector('.hibDISPLAY3');
    const hibDISPLAY4 = document.querySelector('.hibDISPLAY4');

    // Evento para mostrar la imagen al hacer click 
    img3.addEventListener('click', function () {
        toggleImageVisibility(hibDISPLAY, [hibDISPLAY2, hibDISPLAY3, hibDISPLAY4]);
    });

    
    img4.addEventListener('click', function () {
        toggleImageVisibility(hibDISPLAY2, [hibDISPLAY, hibDISPLAY3, hibDISPLAY4]);
    });

    
    img5.addEventListener('click', function () {
        toggleImageVisibility(hibDISPLAY3, [hibDISPLAY, hibDISPLAY2, hibDISPLAY4]);
    });

    
    img6.addEventListener('click', function () {
        toggleImageVisibility(hibDISPLAY4, [hibDISPLAY, hibDISPLAY2, hibDISPLAY3]);
    });

   
    let textureButton1 = document.getElementById('textureButton1');
    textureButton1.addEventListener('click', () => changeTexture(textura));

    let textureButton2 = document.getElementById('textureButton2');
    textureButton2.addEventListener('click', () => changeTexture(textura1));

    let textureButton3 = document.getElementById('textureButton3');
    textureButton3.addEventListener('click', () => changeTexture(textura2));

    let textureButton4 = document.getElementById('textureButton4');
    textureButton4.addEventListener('click', () => changeTexture(textura3));
}

function toggleImageVisibility(visibleElement, hiddenElements) {
    visibleElement.style.visibility = 'visible';
    visibleElement.style.opacity = '1';

    hiddenElements.forEach(element => {
        element.style.visibility = 'hidden';
        element.style.opacity = '0';
    });
    
    
}

function draw() {
    if (showBackground) {
        background(0);
    }
    ambientLight(255, 255, 255);
    if (showHibiscus) {
        mostrarHibiscus();
    }
    if (showFlower) {
        mostrarFlower();
    }

    orbitControl();
}

function mostrarHibiscus() {
    texture(currentTexture);
    push();
    noStroke();
    translate(-200, 100, -100); 
    rotateZ(180);
    rotateY(-angle); 
    translate(-10, 0, 400);
    model(modelado);
    pop();

    angle += 0.8;
}

function mostrarFlower() {
    push();
    fill(0);
    stroke(255, 255, 255);
    rotateZ(180);
    translate(orbitX + 300, orbitY - 100, orbitZ); 
    model(flor);
    pop();

    let orbitRadius = 200;
    orbitX = orbitRadius * cos(angle);
    orbitY = orbitRadius * tan(angle);
    orbitZ = orbitRadius * sin(angle);
}

function toggleGlitchAndBackground() {
    toggleGlitch();      // Llama a la función para ralentizar el audio
    toggleBackground();  // Llama a la función para cambiar el fondo
}

function toggleFlower() {
    showFlower = !showFlower;
}

function toggleBackground() {
    showBackground = !showBackground;
}

function changeTexture(newTexture) {
    currentTexture = newTexture;
}

function toggleMute() {
    if (cancion.isPlaying()) {
        if (cancion.getVolume() > 0) {
            cancion.setVolume(0); 
        } else {
            cancion.setVolume(0.3); 
        }
    }
}

function toggleGlitch() {
    isGlitched = !isGlitched;
    if (isGlitched) {
        // Ralentizar el audio
        cancion.rate(0.5); 
    } else {
    
        cancion.rate(1); 
    }
}

function mousePressed() {
    if (!cancion.isPlaying()) {
        cancion.play();
    }
}

function tomarCaptura() {
    saveGif('mySketch', 3 , { delay: 1 });
    enlaceDescarga.download = 'mi_souvenir.GIF'; // 
    enlaceDescarga.click();
}