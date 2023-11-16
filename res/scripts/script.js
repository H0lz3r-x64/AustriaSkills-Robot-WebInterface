var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var goalArray = new Array();
var wallArray = new Array();
var pointArray = new Array();
var qrAreaArray = new Array();
var goalsToPost = new Queue();

let upScale = 5;
let downScale = 0.2;

function scaleValue(value, scale) {
    return value / scale;
}

function exportJSON() {
    let data = {
        goals: goalArray,
        walls: wallArray,
        pickups: pointArray,
    };

    let jsonStr = JSON.stringify(data, null, 2);
    let jsonBlob = new Blob([jsonStr], { type: "application/json" });
    let downloadLink = document.createElement("a");

    downloadLink.href = URL.createObjectURL(jsonBlob);
    downloadLink.download = "data.json";

    downloadLink.click();
}

function addDotToList(x, y) {
    var list = document.getElementById("goalList");

    var item = document.createElement("li");
    item.appendChild(
        document.createTextNode("X: " + Math.round(x) + " Y: " + Math.round(y))
    );

    list.appendChild(item);
}

// let robotForm = document.getElementById("robotForm") ;

// robotForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     var x = document.getElementById("robotX").value;
//     var y = document.getElementById("robotY").value;

//     const url = "http://10.12.34.2:3000/robot_location";
//     const data = {
//         X: x,
//         Y: y,
//     };

//     fetch(url, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     })
//         .then((response) => response.json())
//         .catch((error) => {
//             console.error("Error:", error);
//         });
// });

let playStopBtn = document.getElementById("playstop-button");

playStopBtn.addEventListener("change", function (event) {
    // Start not in use since the robot will solely be started via the ControlStation
    // if (event.currentTarget.checked) {
    //     while (!goalsToPost.isEmpty) {
    //         var goal = goalsToPost.dequeue();

    //         postGoal(goal[0], goal[1]);
    //     }
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
