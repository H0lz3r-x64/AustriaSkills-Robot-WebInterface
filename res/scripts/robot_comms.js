var retriesLeft = 3;
var errorOverlay = document.getElementById("errorOverlay");
var errorReport = document.getElementById("errorReport");
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

// us this one for localhost debugging
// const location_endpoint = "http://127.0.0.1:5000/robot_status";
const location_endpoint = "http://10.12.34.2:3000/robot_status";

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(`HTTP error! Status: ${response.statusText}`);
    }
    return response;
};

const fetchFailed = (error) => {
    errorOverlay.style.display = "flex";
    if (retriesLeft > 0) {
        errorReport.textContent = "Retrying" + ".".repeat(4 - retriesLeft);
        console.log(
            "Error occured while trying to fetch resource. Remaining retries left: " +
                retriesLeft
        );
        retriesLeft -= 1;
        return;
    }
    errorReport.textContent =
        "After resolving the problem, please reload the page";
    clearInterval(intervalID);
    throw Error(error);
};

function fetchData() {
    fetch(location_endpoint)
        // Error handling
        .then(handleErrors)
        // pass the response to json
        .then((response) => response.json())
        // map our data
        .then((data) => {
            ctx.fillStyle = "red";

            xPos.innerHTML = parseInt(data.xPos) + " mm";
            yPos.innerHTML = parseInt(data.yPos) + " mm";
            rot.innerHTML = parseFloat(data.rot) + " deg";
            elevatorPosition.innerHTML = data.elevatorPosition;
            carriagePosition.innerHTML =
                parseFloat(data.carriagePosition) + "/100 %";
            gripperStatus.innerHTML = data.gripperStatus;
            IRSensorLeft.innerHTML = parseFloat(data.IRSensorLeft);
            IRSensorRight.innerHTML = parseFloat(data.IRSensorRight);
            USSensorLeft.innerHTML = parseFloat(data.USSensorLeft) + " mm";
            USSensorRight.innerHTML = parseFloat(data.USSensorRight) + " mm";
            lineFollowerSensor.innerHTML = data.lineFollowerSensor;
            errorOverlay.style.display = "none";
        })
        .catch((error) => fetchFailed(error));
}

const intervalID = setInterval(fetchData, 500);
