var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var robotX = document.getElementById("currentX");
var robotY = document.getElementById("currentY");
var lastLocation = [0, 0];
const location_endpoint = 'http://10.12.34.2:3000/robot_location';

function scaleValue(value, scale) {
    return value / scale;
}

function fetchData() {
    fetch(location_endpoint)
        .then(response => response.json())
        .then(data => {
            ctx.fillStyle = "red";
            
            ctx.clearRect(lastLocation[0] - 1, lastLocation[1] - 1, 12, 12);

            ctx.fillRect(scaleValue(data.X, upScale), scaleValue(data.Y, upScale), 10, 10);
            console.log("X: " + data.X + "\nY: " + data.Y + "\nScaledX: " + scaleValue(data.X, upScale) + "\nScaledY: " + scaleValue(data.Y, upScale));
            
            lastLocation = [scaleValue(data.X, upScale), scaleValue(data.Y, upScale)];

            robotX.innerHTML = parseInt(data.X);
            robotY.innerHTML = parseInt(data.Y);
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        });
}

setInterval(fetchData, 500);