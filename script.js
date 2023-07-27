var canvas = document.getElementById('canvas');

var goalArray = new Array();

function scaleValue(value, scale) {
    return value / scale;
}

function exportJSON(){
    let data = {
        goals: goalArray
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

    x = Math.round(scaleValue(x, 0.2));
    y = Math.round(scaleValue(y, 0.2));

    canvas.appendChild(dot);
    addDotToList(x, y);

    goalArray.push([x, y]);
}

canvas.addEventListener('click', function(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left;
    var y = event.clientY - canvas.getBoundingClientRect().top;

    createDot(x, y);
});

let loginForm = document.getElementById("goalForm")

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let x = document.getElementById("goalX").value;
    let y = document.getElementById("goalY").value;

    createDot(scaleValue(x, 5), scaleValue(y, 5));
});

let exportButton = document.getElementById('exportButton');

exportButton.addEventListener('click', function() {
    exportJSON();
});