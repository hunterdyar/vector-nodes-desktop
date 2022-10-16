import {Component, Input, Output} from "rete";
import {PositionSocket, NumSocket,NumControl} from "../Editor.vue";
import g from "g.js";

//todo: rename this to Vector or Point
//todo: data values are not working

// import PosControl from "@/components/PosControl";
class PositionComponent extends Component {
    constructor(){
        super("Position");
    }

    builder(node) {
        this.path = "Math";
        var x = new Input('x',"X",NumSocket);
        var y = new Input('y',"Y",NumSocket);
        var out1 = new Output('pos', "Position", PositionSocket);
        return node.addControl(new NumControl(this.editor, 'x'))
            .addControl(new NumControl(this.editor, 'y'))
            .addOutput(out1).addInput(x).addInput(y);
    }

    //todo: The data is null, and needs to come from nodes.

    worker(node, inputs, outputs) {
        var x1 = inputs['x'].length?inputs['x'][0]:node.data.x;
        var y1 = inputs['y'].length?inputs['y'][0]:node.data.y;

        outputs['pos'] = g.makePoint(x1,y1);
    }
}

export default PositionComponent;
