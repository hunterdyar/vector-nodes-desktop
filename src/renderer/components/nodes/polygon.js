//https://g.js.org/ref/polygon.html
import {Component, Input, Output} from "rete";
import g from "g.js";
import {PathSocket, PositionSocket,NumSocket} from "../Editor.vue";
import {radians} from "g.js/src/libraries/img/util";

class PolygonNode extends Component
{

    constructor(){
        super("Polygon");
    }

    builder(node) {
        this.path = "Shapes";
        var center = new Input('center',"Center",PositionSocket);
        var radius = new Input('radius',"Radius",NumSocket);
        var sides = new Input('sides',"Sides",NumSocket);

        var out1 = new Output('path', "Path", PathSocket);
        return node.addOutput(out1)
            .addInput(center)
            .addInput(radius)
            .addInput(sides)
    }

    worker(node, inputs, outputs) {
        var center = inputs['center'].length?inputs['center'][0]:{x:0,y:0};
        var radius = inputs['radius'].length?inputs['radius'][0]:25;
        var sides = inputs['sides'].length?inputs['sides'][0]:5;

        outputs['path'] = g.polygon(center, radius,sides,true);//node.data.num;

    }
}

export default PolygonNode;
