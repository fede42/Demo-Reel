var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    canvas2 = document.getElementById('canvas2'),
    ctx2 = canvas2.getContext('2d'),
    // full screen dimensions
    cw = window.innerWidth,
    ch = window.innerHeight,
    charArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    maxCharCount = 100,
    fallingCharArr = [],
    fontSize = 10,
    maxColums = cw / (fontSize);
canvas.width = canvas2.width = cw;
canvas.height = canvas2.height = ch;


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.draw = function(ctx) {

    this.value = charArr[randomInt(0, charArr.length - 1)].toUpperCase();
    this.speed = randomFloat(2, 7);


    ctx2.fillStyle = "rgba(255,255,255,0)";
    ctx2.font = fontSize + "px san-serif";
    ctx2.fillText(this.value, this.x, this.y);

    ctx.fillStyle = "#0F6";
    //ctx.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    ctx.font = fontSize + "px san-serif";
    ctx.fillText(this.value, this.x, this.y);

    this.y += this.speed;
    if (this.y > ch) {
        this.y = randomFloat(-100, 0);
        this.speed = randomFloat(2, 5);
    }
}

for (var i = 0; i < maxColums; i++) {
    fallingCharArr.push(new Point(i * fontSize, randomFloat(-document.body.scrollHeight, 0)));
}

jQuery(function($) {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    $(window).resize(function() {
        if (windowWidth != $(window).width() || windowHeight != $(window).height()) {
            if (window.matchMedia("(max-width: 767px)").matches) {
                // The viewport is less than 768 pixels wide
                //document.write("This is a mobile device.");

            } else {
                location.reload();
                //document.write("This is a tablet or desktop.");
            }
            return;
        }
    });
});

$(window).on("orientationchange", function(event) { location.reload(); });

var update = function() {
    ch = document.body.scrollHeight,
        ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, cw, ch);

    ctx2.clearRect(0, 0, cw, ch);

    var i = fallingCharArr.length;

    while (i--) {
        fallingCharArr[i].draw(ctx);
        var v = fallingCharArr[i];
    }

    requestAnimationFrame(update);
}

update();