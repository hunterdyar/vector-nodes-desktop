import {Component, Input, Output} from "rete";
import g from "g.js";
import {PathSocket, NumSocket, PositionSocket} from "../Editor.vue";

class RectComponent extends Component
{
    constructor(){
        super("Rect");
    }

    builder(node) {
        this.path = "Shapes";
        var position = new Input('pos',"Position",PositionSocket);
        var size = new Input('size',"Size",PositionSocket);
        var round = new Input('radius',"Corner Radius",NumSocket);

        var out1 = new Output('shape', "Rectangle", PathSocket);
        return node.addOutput(out1)
            .addInput(position)
            .addInput(size)
            .addInput(round);
    }

    worker(node, inputs, outputs) {

            var pos = inputs['pos'].length?inputs['pos'][0]:{x:0,y:0};
            var size = inputs['size'].length?inputs['size'][0]:{x:100,y:100};
            var rad = inputs['radius'].length?inputs['radius'][0]:0;

            outputs['shape'] = g.rect(pos, size.x, size.y, rad);//node.data.num;
    }
}

export default RectComponent;
