var canvasContainer = document.getElementById('canvasContainer');
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var goalArray = new Array();
var wallArray = new Array();

let upScale = 5;
let downScale = 0.2;

function scaleValue(value, scale) {
    return value / scale;
}

function exportJSON(){
    let data = {
        goals: goalArray,
        walls: wallArray
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

    let startX = document.getElementById("startX").value;
    let startY = document.getElementById("startY").value;
    let width = document.getElementById("endX").value - startX;
    let height = document.getElementById("endY").value - startY;

    ctx.fillRect(startX, startY, width, height);

    wallArray.push([startX, startY, width, height]);

});