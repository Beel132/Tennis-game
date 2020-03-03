var canvas;
var canvasCTX;
var bolinhaX = 50;
var velocidadeBolinhaX = 10;
var bolinhaY = 50;
var velocidadeBolinhaY = 4;

var space = 12;

var FbarY = 250;
var SbarY = 250;

const _barHeight = 100;
const _barThick = 10;
canvas = document.getElementById(`canvas`);

// placar

var colors = ['#fff', '#0F7C74', '#48AA7D', '#97D477', '#F9F871', '#C8F8FF', '#0f4c75', '#bbe1fa', '#D3FBD8', '#4A9084', '#74EBB1', '#00A3ED', '#173E4F', '#99AEBB'];
var pos = Math.floor(Math.random() * (colors.length + 1));
var yourScore;

var yourScoreN = 0;

// highscore

var scoreHighTXT;
var scoreHigh;
var local;

// rapido ao decorrer do jogo

// var fps;
// var fast;

mousePos = (e) => {

    var rect = canvas.getBoundingClientRect();
    var raiz = document.documentElement;
    var mouseX = e.clientX - rect.left - raiz.scrollLeft;
    var mouseY = e.clientY - rect.top - raiz.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };

}

window.onload = () => {

    fps = 60;

    canvasCTX = canvas.getContext(`2d`);

    yourScore = document.getElementById(`you`);
    scoreHighTXT = document.getElementById(`high`);

    yourScore.innerHTML = yourScoreN++;

    // set highScore
    local = localStorage.getItem('highScore');

    if (!local)
        scoreHigh = 0;
    else
        scoreHigh = parseInt(local);

    setInterval(() => {
        move();
        drawer();
    }, 500 / fps);

    canvas.addEventListener('mousemove', function (e) {
        var mPos = mousePos(e);
        FbarY = mPos.y;
    })

}

pcMove = () => {
    SbarY < bolinhaY - 35 ?
        SbarY += 6 : SbarY > bolinhaY + 35 ?
        SbarY -= 6 : null
}

move = () => {

    pcMove();

    bolinhaX += velocidadeBolinhaX;
    bolinhaY += velocidadeBolinhaY;

    // bolinha atinge parede aliada

    if (bolinhaX <= _barThick + space) {
        if (bolinhaY >= FbarY - _barHeight / 2 && bolinhaY <= FbarY + _barHeight / 2) {
            velocidadeBolinhaX = -velocidadeBolinhaX;

            // placar
            yourScore.innerHTML = yourScoreN++;

            pos == colors.length ? pos = 0 : pos++

        } else
            resetBola();
    }

    // bolinha atinge parede inimiga

    if (bolinhaX > (canvas.width - _barThick) - space)
        if (bolinhaY > SbarY - _barHeight / 2 && bolinhaY < SbarY + _barHeight / 2)
            velocidadeBolinhaX = -velocidadeBolinhaX;
        else
            resetBola();

    // bolinha atinge teto / chão

    if (bolinhaY > canvas.height - space / 2 || bolinhaY < space - space / 2)
        velocidadeBolinhaY = -velocidadeBolinhaY;

}

drawer = () => {

    // back
    color(0, 0, canvas.width, canvas.height, '#1b262c');

    // barrinha esquerda
    color(0, FbarY - (_barHeight / 2), _barThick, _barHeight, 'white');

    // barrinha direita
    color(canvas.width - _barThick, SbarY - _barHeight / 2, _barThick, _barHeight, 'white');

    // bolinha
    desenharBolinha(bolinhaX, bolinhaY, 10, yourScoreN % 2 == 0 ? colors[pos] : colors[pos])

    // score
    scoreHighTXT.innerHTML = `Melhor Pontuação <br> <span>${scoreHigh}</span>`;

    if (yourScoreN > scoreHigh) {
        scoreHigh = yourScoreN - 1;
        localStorage.setItem('highScore', yourScoreN - 1);
    }

}

color = (leftX, topY, w, h, cor) => {

    canvasCTX.fillStyle = cor;
    canvasCTX.fillRect(leftX, topY, w, h);

}

desenharBolinha = (cX, cY, radius, cor) => {

    canvasCTX.fillStyle = cor;
    canvasCTX.beginPath();
    canvasCTX.arc(cX, cY, radius, 0, Math.PI * 2, true);
    canvasCTX.fill()

}

resetBola = () => {

    velocidadeBolinhaX = -velocidadeBolinhaX;
    bolinhaX = canvas.width / 2;
    bolinhaY = canvas.height / (Math.random() * 20);

    yourScore.innerHTML = 0;
    yourScoreN = 1;

    pos = 0;

}
