var RobotRender = new Image();
var xElement = document.getElementById("xPos");
var yElement = document.getElementById("yPos");
var rotElement = document.getElementById("rot");
var canvas = document.getElementById("canvas");

const robot_path = [];

console.log("canvas");
var ox = 0,
    oy = canvas.height,
    px = 0,
    py = 0,
    scx = 1,
    scy = 1;

var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var x = parseInt(xElement.innerHTML);
    var y = parseInt(yElement.innerHTML);
    var rot = parseInt(rotElement.innerHTML);

    // return if x or y not valid yet
    if (typeof x == "undefined" || isNaN(x)) {
        return;
    }
    if (typeof y == "undefined" || isNaN(y)) {
        return;
    }

    // translate to screen cords
    [x, y] = WtoS(x, y);
    let robWidth = 500 * scx,
        robHeight = 500 * scy;

    let robCornerDrawX = x - robWidth / 2,
        robCornerDrawY = y - robHeight / 2;
    // push the center of the current robots sceeen space point
    robot_path.push([robCornerDrawX, robCornerDrawY]);

    if (draw_path) {
        drawRobotPath();
    }

    // draw actual robot render with rotation
    drawRotatedImage(
        ctx,
        RobotRender,
        robCornerDrawX,
        robCornerDrawY,
        robWidth,
        robHeight,
        rot
    );

    // reset rotation
    ctx.setTransform(1, 0, 0, 1, 0, 0); // is much quicker than save and restore
    debugger;
}

/**
 * The function `drawRobotPath` is used to draw the path of the robot on a canvas element in JavaScript.
 */
function drawRobotPath() {
    // draw the robot's path
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;

    ctx.moveTo(robot_path[0][0], robot_path[0][1]);
    robot_path.forEach((value) => {
        ctx.lineTo(value[0], value[1]);
        ctx.moveTo(value[0], value[1]);
    });
    ctx.stroke();
    // draw robots starting point or at least it's point after site load
    ctx.beginPath();
    ctx.strokeStyle = "#ff0000";
    ctx.arc(
        robot_path[0][0],
        robot_path[0][1],
        ctx.lineWidth * 2,
        0,
        2 * Math.PI,
        false
    );
    ctx.strokeStyle = "black";
    ctx.fill();
    ctx.stroke();
}

/**
 * The function `drawRotatedImage` takes a canvas context, an image, coordinates, dimensions, and
 * rotation angle, and draws the image rotated on the canvas.
 * @param ctx - The ctx parameter is the 2D rendering context of the canvas element on which you want
 * to draw the rotated image.
 * @param image - The "image" parameter refers to the image object that you want to draw on the canvas.
 * This can be an HTMLImageElement, HTMLVideoElement, HTMLCanvasElement, or ImageBitmap object.
 * @param x - The x parameter represents the x-coordinate of the top-left corner of the image on the
 * canvas.
 * @param y - The parameter "y" represents the y-coordinate of the top-left corner of the image on the
 * canvas.
 * @param w - The parameter "w" represents the width of the image.
 * @param h - The parameter "h" in the function "drawRotatedImage" represents the height of the image
 * that you want to draw.
 * @param degrees - The "degrees" parameter in the "drawRotatedImage" function represents the angle of
 * rotation in degrees. It determines how much the image will be rotated clockwise around its center
 * point.
 */

function drawRotatedImage(ctx, image, x, y, w, h, degrees) {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);
    ctx.rotate((degrees * Math.PI) / 180.0);
    ctx.translate(-x - w / 2, -y - h / 2);
    ctx.drawImage(image, x, y, w, h);
    ctx.restore();
}

/* The code `RobotRender.onload = draw;` sets the `onload` event handler for the `RobotRender` image.
When the image is loaded, the `draw` function will be called to start rendering the image on the
canvas. */
RobotRender.onload = draw;
RobotRender.src = "./res/images/robot_render.svg";

/**
 * The function WtoS converts world coordinates (wx, wy) to screen coordinates (sx, sy) in a HTML5
 * canvas.
 * @param wx - The parameter "wx" represents the x-coordinate in the world coordinate system.
 * @param wy - The parameter "wy" represents the y-coordinate in the world coordinate system.
 * @returns an array containing the calculated values of `sx` and `sy`.
 */
function WtoS(wx, wy) {
    let lox = ox;
    let loy = oy;
    // formulars this way since the actual html5 canvas origin (0,0) is left upper corner, we want it in the left lower corner tho
    // also necessary to set oy to the canvas height prior
    let sx = (lox + wx) * scx; // add world x to origin x to achieve an world x increase showing as direction right
    let sy = (loy - wy) * scy; // substract world y from origin y to achieve an world y increase showing as direction up
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
    let wy = sy / scy - loy; //untested
    return [wx, wy];
}
