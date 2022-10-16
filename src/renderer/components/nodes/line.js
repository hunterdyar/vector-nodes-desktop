import {Component, Input, Output} from "rete";
import g from "g.js";
import {PathSocket, PositionSocket} from "../Editor.vue";

class LineComponent extends Component
{

    constructor(){
        super("Line");
    }

    builder(node) {
        this.path = "Shapes";
        var start = new Input('start',"Start",PositionSocket);
        var end = new Input('end',"End",PositionSocket);

        var out1 = new Output('path', "Path", PathSocket);
        return node.addOutput(out1)
            .addInput(start)
            .addInput(end);
    }

    worker(node, inputs, outputs) {
        var start = inputs['start'].length?inputs['start'][0]:{x:-25,y:0};
        var end = inputs['end'].length?inputs['end'][0]:{x:25,y:0};
        outputs['path'] = g.line(start, end);//node.data.num;

    }
}

export default LineComponent;
