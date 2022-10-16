import {Component, Input, Output} from "rete";
import g from "g.js";
import {PathSocket,NumSocket,PositionSocket} from "../Editor.vue";


class EllipseComponent extends Component
{
    constructor(){
        super("Ellipse");
        this.path = "Ellipse";
    }

    builder(node) {
        var position = new Input('pos',"Position",PositionSocket);
        var hrad = new Input('hradius',"H Radius",NumSocket);
        var vrad = new Input('vradius',"V Radius",NumSocket);

        var out1 = new Output('shape', "Path", PathSocket);
        return node
            .addInput(position)
            .addInput(hrad)
            .addInput(vrad)
            .addOutput(out1);
    }

    worker(node, inputs, outputs) {
        var pos = inputs['pos'].length?inputs['pos'][0]:{x:0,y:0};
        var hrad = inputs['hradius'].length?inputs['hradius'][0]:50;
        var vrad = inputs['vradius'].length?inputs['hradius'][0]:50;
        outputs['shape'] = g.ellipse(pos.x, pos.y, hrad*2, vrad*2);//node.data.num;
    }
}

export default EllipseComponent;
