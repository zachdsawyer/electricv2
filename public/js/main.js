//User interface related
var gui = {
    numToAdd: ko.observable(),
    addCircle: createCircles,
    circleList: ko.observableArray(),
};

gui.numToAdd.subscribe(function (newVal) {

    if (!_.isFinite(Number.parseInt(newVal)))
        gui.numToAdd(1);
});

//Drawing related
// http://pixijs.download/dev/docs/index.html
var app = new PIXI.Application({
    view: document.getElementById('surface'),
    antialias: true,
    backgroundColor: 0xfff1f1,
    height: 700,
    width: 1200,
    autoResize: true
});

var circles = [];

function createCircle() {
    var g = new PIXI.Graphics();
    //drawing instructions
    g.lineWidth = 1;
    g.lineColor = 0x521312;
    g.drawCircle(0, 0, 40);
    g.moveTo(0, 0);
    g.lineTo(40, 0);

    //Convert to texture and set it on a sprite
    var sprite = new PIXI.Sprite(g.generateCanvasTexture());
    sprite.x = _.random(50, 1150);
    sprite.y = _.random(50, 650);
    sprite.anchor.x = .5;
    sprite.anchor.y = .5;

    circles.push(sprite);

    //let the gui system know we changed it
    gui.circleList(circles);

    app.stage.addChild(sprite);
}

function createCircles() {
    var num = gui.numToAdd() || 1;

    for (let i = 0; i < num; i++) {
        createCircle()
    }
}

//per frame updates
app.ticker.add(function () {
    for (let i = 0; i < circles.length; i++) {
        const c = circles[i];
        c.rotation += .01;
    }
});

ko.applyBindings(gui, document.getElementById('gui-container'));