let playStopBtn = document.getElementById("playstop-button");

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
