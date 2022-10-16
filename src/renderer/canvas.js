import g from 'g.js';

var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d', {willReadFrequently: true});
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;//todo: this is to small by the size of the menu bar, but we have to redo sizing anyway and make the canvas non-resizable.
ctx.translate(canvas.width / 2, canvas.height / 2);
var doClear = false;

function clearCanvas()
{
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}

window.api.onDraw((_event, shape) => {
    //hack, we only clear right before drawing. This prevents flickering when waiting while between clear then processing, ipc communication, and draw
    if(doClear)
    {
        clearCanvas();
        doClear = false;
    }
    //we have the shape data, but not the functions (ie from the prototype).
    //we have to convert the shape to a prototype, and i don't know how (javascript is a silly place)
    //so we make a new one ('empty') and replace its data with the serialized data ('shape').

    //i spent a long time trying to send a refernece to canvas element or context between windows, until finally discovering
    //that the inter=process-communication serializes things, and doesn't just like... use ... memory....
    //its all on top of the chromium browser bs where each tab is its own process. security! it's all runtime code
    //so we need secure communication...between windows in an app.... fine. i think hate electron?

    var empty = g.rect({x: 0, y: 0}, 0, 0);
    empty.commands = shape.commands;
    empty.fill = shape.fill;
    empty.stroke = shape.stroke;
    empty.strokeWidth = shape.strokeWidth;

    empty.draw(ctx);
});

window.api.onClear((_event, force) => {
    if(force){
        clearCanvas();
        doClear = false;
    }else {
        doClear = true;
    }
});



