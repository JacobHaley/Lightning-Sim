var song;
var amp; // volume

var multiplier = 1;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function preload() {
    song = loadSound('../songs/masterpiece.mp3');
}

// var colors = [[255, 150, 150], [0, 0, 255], [200, 200, 10]]
var colors = [[0, 0, 255]];

function random_color() {
    let r = Math.floor(rng(0, colors.length-1));

    return {r: colors[r][0], g: colors[r][1], b: colors[r][2]}
}

setInterval(() => {
    let c = random_color();
    stroke(c.r, c.g, c.b);
}, 10 * 1000)

function replace_song(name) {
    song.pause();
    record = [];
    record_avg = 0;
    song = loadSound('../songs/'+name+'.mp3');
    song.play();
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    song.play();
    amp = new p5.Amplitude();
    frameRate(25);
    stroke(255, 150, 150);
}

var record = [];
var record_avg = 0;

function draw() {
    let b = map(amp.getLevel(), 0, 1, 10, 0);

    background(b, b, b, 240);

    let f = map(amp.getLevel(), 0, 1, 0.3, 9);
    strokeWeight(f);

    next_stems_min = Math.floor(map(amp.getLevel(), 0, 1, 0, 1));
    next_stems_max = Math.floor(map(amp.getLevel(), 0, 1, 2, 6));

    multiplier = Math.floor(map(amp.getLevel(), 0, 1, 1, 8));

    for (let i = 0; i < trees.length; i++){
        if (trees[i].dead == false){
            trees[i].live();
        }
    }

    let a = 0;
    for (let i = 0; i < record.length; i++) {
        a += record[i];
    }

    record_avg = a / record.length;
    record_avg += record_avg/4;

    if (amp.getLevel() >= record_avg) {
        for (let i = 0; i < multiplier; i++) {
            trees.push(new Tree(1, rng(300, width-300), 0));
        }
    }

    record.push(amp.getLevel());
}

function mousePressed() {
    if (song.isPlaying()) {
        song.pause();
    }else {
        song.play();
    }
}
