let playStopBtn = document.getElementById("playstop-button");
var robotPath = document.getElementById("robot-path");
let draw_path = false;

robotPath.addEventListener("change", function (event) {
    if (event.currentTarget.checked) {
        draw_path = true;
        return;
    }
    debugger;
    draw_path = false;
});

playStopBtn.addEventListener("change", function (event) {
    // Start not in use since the robot will solely be started via the ControlStation
    // if (event.currentTarget.checked) {
    //
    //     console.log("Start");
    //     return;
    // }

    // stop functioniality
    const url = "http://10.12.34.2:3000/stop";

    fetch(url, {
        method: "GET",
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error:", error);
        });
    console.log("Stop");
});
