var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var xPos = document.getElementById("xPos");
var yPos = document.getElementById("yPos");
var rot = document.getElementById("rot");
var elevatorPosition = document.getElementById("elevatorPosition");
var carriagePosition = document.getElementById("carriagePosition");
var gripperStatus = document.getElementById("gripperStatus");
var IRSensorLeft = document.getElementById("IRSensorLeft");
var IRSensorRight = document.getElementById("IRSensorRight");
var USSensorLeft = document.getElementById("USSensorLeft");
var USSensorRight = document.getElementById("USSensorRight");
var lineFollowerSensor = document.getElementById("lineFollowerSensor");

var lastLocation = [0, 0];
const location_endpoint = "http://10.12.34.2:3000/robot_status";

function fetchData() {
    fetch(location_endpoint)
        .then((response) => response.json())
        .then((data) => {
            ctx.fillStyle = "red";

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            lastLocation = [
                scaleValue(data.X, upScale),
                scaleValue(data.Y, upScale),
            ];
            
            xPos.innerHTML = parseInt(data.X) + " mm";
            yPos.innerHTML = parseInt(data.Y) + " mm";
            rot.innerHTML = parseFloat(data.ROT) + " deg";
            elevatorPosition.innerHTML =
                toString(data.elevatorPosition);
            carriagePosition.innerHTML =
                parseFloat(data.carriagePosition) + "/100 %";
            gripperStatus.innerHTML = toString(data.gripperStatus);
            IRSensorLeft.innerHTML = parseInt(data.IRSensorLeft);
            IRSensorRight.innerHTML = parseInt(data.IRSensorRight);
            USSensorLeft.innerHTML = parseInt(data.USSensorLeft) + " mm";
            USSensorRight.innerHTML = parseInt(data.USSensorRight) + " mm";
            lineFollowerSensor.innerHTML = toString(data.lineFollowerSensor);

            var centerX = scaleValue(data.X, upScale);
            var centerY = scaleValue(data.Y, upScale);
            var radius = 14;

            var points = [];
            for (var i = 0; i < 6; i++) {
                var angle = (Math.PI / 3) * i;
                var x = centerX + radius * Math.cos(angle);
                var y = centerY + radius * Math.sin(angle);
                points.push({ x: x, y: y });
            }

            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (var i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.closePath();
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillRect(centerX - 5 / 2, centerY - 5 / 2, 5, 5);
            redraw();
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
        });
}

setInterval(fetchData, 500);
