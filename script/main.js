var c = document.getElementById("can");
var ctx = c.getContext("2d");

let w = c.clientWidth;
let h = c.clientHeight;
let w_gap = 50; // w / 5;
let h_gap = 50; // h / 5;
let border = 50;

let K = 6 - 2;

function reset_coords() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ff7043";
}



reset_coords();

function abs(x) {
    return x < 0 ? -x : x;
}

function hcf(a, b) {
    while (a != b) {
        if (a > b)
            a = a - b;
        else
            b = b - a;
    }
    return a;
}

function distance2(x1, y1, x2, y2) {
    x1 /= w_gap;
    x2 /= w_gap;
    y1 /= h_gap;
    y2 /= h_gap;

    if (x1 == x2)
        return abs(y1 - y2) - 1;

    if (y1 == y2)
        return abs(x1 - x2) - 1;

    return hcf(abs(x1 - x2), abs(y1 - y2)) - 1;
}


function draw_line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function draw_circle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
}

function drawBoard() {
    for (x0 = border; x0 <= w - border; x0 += w_gap) {
        for (y0 = border; y0 <= h - border; y0 += h_gap) {
            draw_circle(x0, y0, 2);
        }
    }
}

function draw_lines(x0, y0, x1, y1) {
    draw_line(x0, y0, x1, y1);

    //if (distance2(x1, y0, x0, y1) >= K)
    //draw_line(x1, y0, x0, y1);
    //if (distance2(x0, y1, x1, y0) >= K)
    //draw_line(x0, y1, x1, y0);
    //if (distance2(x0, y0, x1, y1) >= K)
    //draw_line(x0, y0, x1, y1);
    //draw_line(x1, y1, x0, y0);

}

for (let x1 = border; x1 <= w - border; x1 += w_gap) {
    for (let x0 = border; x0 <= w - border; x0 += w_gap) {
        if (distance2(x0, border, x1, h - border) >= K)
            draw_lines(x0, border, x1, h - border);
    }
}

for (let x1 = border; x1 <= w - border; x1 += w_gap) {
    for (let y0 = border; y0 <= h - border; y0 += h_gap) {
        if (distance2(border, y0, x1, h - border) >= K)
            draw_lines(border, y0, x1, h - border);
    }
}

for (let y1 = border; y1 <= h - border; y1 += h_gap) {
    for (let x0 = border; x0 <= w - border; x0 += w_gap) {
        if (distance2(x0, border, w - border, y1) >= K)
            draw_lines(x0, border, w - border, y1);
    }
}

for (let y1 = border; y1 <= h - border; y1 += h_gap) {
    for (let y0 = border; y0 <= h - border; y0 += h_gap) {
        if (distance2(border, y0, w - border, y1) >= K)
            draw_lines(border, y0, w - border, y1);
    }
}

drawBoard();





/*


for (x0 = border + w_gap; x0 < w - w_gap; x0 += w_gap) {
    draw_lines(x0, y0, x1, y1);
}
reset_coords();
for (y0 = border + h_gap; y0 < h - h_gap; y0 += h_gap) {
    draw_lines(x0, y0, x1, y1);
}
reset_coords();

for (x1 = border + w_gap; x1 < w; x1 += w_gap) {
    draw_lines(x0, y0, x1, y1);
}
reset_coords();

for (y1 = border + h_gap; y1 < h; y1 += h_gap) {
    draw_lines(x0, y0, x1, y1);
}
reset_coords();
*/