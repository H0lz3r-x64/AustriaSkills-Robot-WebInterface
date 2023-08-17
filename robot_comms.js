var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
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
            
            lastLocation = [scaleValue(data.X, upScale), scaleValue(data.Y, upScale)];
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        });
}

setInterval(fetchData, 500);