var RobotRender = new Image();
var xElement = document.getElementById("xPos");
var yElement = document.getElementById("yPos");
var lastX = 0;
var lastY = 0;
const robot_path = [[]];

console.log("canvas");
var ox = 0,
    oy = 0,
    px = 0,
    py = 0,
    scx = 1,
    scy = 1;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.lineWidth = 20;
ctx.strokeStyle = "#ff0000";

// not working StylePropertyMapReadOnly, so not in use
// canvas.onmousedown = (e) => {
//     px = e.x;
//     py = e.y;
//     canvas.onmousemove = (e) => {
//         ox -= e.x - px;
//         oy -= e.y - py;
//         px = e.x;
//         py = e.y;
//     };
// };

// canvas.onmouseup = () => {
//     canvas.onmousemove = null;
// };

// canvas.onwheel = (e) => {
//     let bfzx = (afzx = bfzy = afzy = 0);
//     canvas[(bfzx, bfzy)] = StoW(e.x, e.y);
//     scx -= (10 * scx) / e.deltaY;
//     scy -= (10 * scy) / e.deltaY;
//     [afzx, afzy] = StoW(e.x, e.y);
//     ox += bfzx - afzx;
//     oy += bfzy - afzy;
//     console.log("mw whell");
// };

function draw() {
    window.requestAnimationFrame(draw);
    ctx.clearRect(lastX, lastY, 500 * scx, 500 * scy);
    var x = parseInt(xElement.innerHTML);
    var y = parseInt(yElement.innerHTML);
    [x, y] = WtoS(x, y);
    lastX = x;
    lastY = y;

    robot_path.push([x + (500 * scx) / 2, y + (500 * scy) / 2]);
    ctx.beginPath();
    ctx.moveTo(robot_path[0][0], robot_path[0][1]);

    robot_path.forEach((value) => {
        console.log(value[0], value[1]);
        ctx.lineTo(value[0], value[1]);
        ctx.moveTo(value[0], value[1]);
    });
    ctx.stroke();
    ctx.drawImage(RobotRender, x, y, 500 * scx, 500 * scy);
}

RobotRender.onload = draw;
RobotRender.src = "./res/images/robot_render.svg";

/**
 * The function WtoS converts world coordinates (wx, wy) to screen coordinates (sx, sy) using scaling
 * factors (scx, scy) and an origin point (ox, oy).
 * @param wx - The parameter "wx" represents the x-coordinate in the world coordinate system.
 * @param wy - The parameter "wy" represents the y-coordinate in the world coordinate system.
 * @returns an array containing the values of `sx` and `sy`.
 */
function WtoS(wx, wy) {
    let lox = ox;
    let loy = oy;
    let sx = (wx - lox) * scx;
    let sy = (wy - loy) * scy;
    return [sx, sy];
}

/**
 * The function StoW converts screen coordinates to world coordinates.
 * @param sx - The parameter "sx" represents the x-coordinate in the source coordinate system.
 * @param sy - The parameter "sy" represents the y-coordinate in the source coordinate system.
 * @returns The function `StoW` returns an array containing the values of `wx` and `wy`.
 */
function StoW(sx, sy) {
    let lox = ox;
    let loy = oy;
    let wx = sx / scx + lox;
    let wy = sy / scy + loy;
    return [wx, wy];
}
