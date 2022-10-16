import {Component, Input, Output} from "rete";
import g from "g.js";
import {PathSocket,NumSocket,PositionSocket} from "../Editor.vue";


//todo: make ellipse and circle components
class CircleNode extends Component
{
    constructor(){
        super("Circle");
        this.path = "Circle";
    }

    builder(node) {
        var position = new Input('pos',"Position",PositionSocket);
        var rad = new Input('radius',"Radius",NumSocket);
        var out1 = new Output('shape', "Path", PathSocket);
        return node
            .addInput(position)
            .addInput(rad)
            .addOutput(out1);
    }

    worker(node, inputs, outputs) {
        var pos = inputs['pos'].length?inputs['pos'][0]:{x:0,y:0};
        var rad = inputs['radius'].length?inputs['radius'][0]:100;
        outputs['shape'] = g.ellipse(pos.x, pos.y, rad*2, rad*2);//node.data.num;
    }
}

export default CircleNode;
