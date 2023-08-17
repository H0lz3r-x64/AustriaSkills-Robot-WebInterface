var canvasContainer = document.getElementById('canvasContainer');
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var goalArray = new Array();
var wallArray = new Array();
var pointArray = new Array();

let upScale = 5;
let downScale = 0.2;

function scaleValue(value, scale) {
    return value / scale;
}

function exportJSON(){
    let data = {
        goals: goalArray,
        walls: wallArray,
        pickups: pointArray
    }

    let jsonStr = JSON.stringify(data, null, 2);
    let jsonBlob = new Blob([jsonStr], { type: "application/json" });
    let downloadLink = document.createElement('a');

    downloadLink.href = URL.createObjectURL(jsonBlob);
    downloadLink.download = 'data.json';

    downloadLink.click();
}

function addDotToList(x, y){
    var list = document.getElementById("goalList");

    var item = document.createElement("li");
    item.appendChild(document.createTextNode("X: " + Math.round(x) + " Y: " + Math.round(y)));

    list.appendChild(item);
}

function createDot(x, y){
    var dot = document.createElement('div');
    dot.style.left = `${x-2.5}px`;
    dot.style.top = `${y-2.5}px`;

    dot.className = 'dot';

    var textElement = document.createElement('span');
    textElement.textContent = goalArray.length;
    textElement.style.fontSize = "10px";
    textElement.style.color = "green";

    dot.appendChild(textElement);

    x = Math.round(scaleValue(x, downScale));
    y = Math.round(scaleValue(y, downScale));

    canvasContainer.appendChild(dot);
    addDotToList(x, y);

    goalArray.push([x, y, goalArray.length]);
}

canvasContainer.addEventListener('click', function(event) {
    var x = event.clientX - canvasContainer.getBoundingClientRect().left;
    var y = event.clientY - canvasContainer.getBoundingClientRect().top;

    createDot(x, y);
});

let goalForm = document.getElementById("goalForm")

goalForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let x = document.getElementById("goalX").value;
    let y = document.getElementById("goalY").value;

    createDot(scaleValue(x, upScale), scaleValue(y, upScale));
});

let exportButton = document.getElementById('exportButton');

exportButton.addEventListener('click', function() {
    exportJSON();
});

let wallForm = document.getElementById("wallForm");

wallForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let startX = scaleValue(document.getElementById("startX").value, upScale);
    let startY = scaleValue(document.getElementById("startY").value, upScale);
    let endX = scaleValue(document.getElementById("endX").value, upScale);
    let endY = scaleValue(document.getElementById("endY").value, upScale);
    let width = parseInt(document.getElementById("wallWidth").value);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);

    ctx.strokeStyle = "black";
    ctx.lineWidth = width;

    ctx.stroke();
    ctx.closePath();

    wallArray.push([scaleValue(startX, downScale), scaleValue(startY, downScale), scaleValue(endX, downScale), scaleValue(endY, downScale), width]);
});

let pointForm = document.getElementById("pickupForm");

pointForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let x = scaleValue(document.getElementById("pickupX").value, upScale);
    let y = scaleValue(document.getElementById("pickupY").value, upScale);
    let rotation = parseInt(document.getElementById("pickupRot").value);

    ctx.fillStyle = "green";
    ctx.fillRect(x, y, 8, 8);

    let centerX = x + 4;
    let centerY = y + 4;

    let distanceFromRect = 5;
    let offsetX = distanceFromRect * Math.cos(rotation * Math.PI / 180);
    let offsetY = distanceFromRect * Math.sin(rotation * Math.PI / 180);

    let arrowStartX = centerX - offsetX;
    let arrowStartY = centerY - offsetY;

    let arrowLength = 20;
    let endX = arrowStartX - arrowLength * Math.cos(rotation * Math.PI / 180);
    let endY = arrowStartY - arrowLength * Math.sin(rotation * Math.PI / 180);

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(arrowStartX, arrowStartY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    let arrowheadLength = 10;
    let angle1 = (rotation - 30) * Math.PI / 180;
    let angle2 = (rotation + 30) * Math.PI / 180;

    let arrowheadX1 = arrowStartX - arrowheadLength * Math.cos(angle1);
    let arrowheadY1 = arrowStartY - arrowheadLength * Math.sin(angle1);
    let arrowheadX2 = arrowStartX - arrowheadLength * Math.cos(angle2);
    let arrowheadY2 = arrowStartY - arrowheadLength * Math.sin(angle2);

    ctx.beginPath();
    ctx.moveTo(arrowStartX, arrowStartY);
    ctx.lineTo(arrowheadX1, arrowheadY1);
    ctx.moveTo(arrowStartX, arrowStartY);
    ctx.lineTo(arrowheadX2, arrowheadY2);
    ctx.stroke();


    pointArray.push([scaleValue(x, downScale), scaleValue(y, downScale), rotation]);
});