import {Component, Input, Output} from "rete";
import g from "g.js";
import {NumSocket,PositionSocket, PointsSocket} from "../Editor.vue";


//todo: make ellipse and circle components
class GridNode extends Component
{
    constructor(){
        super("Grid");
        this.path = "Circle";
    }

    builder(node) {
        var columns = new Input('col-count',"Columns",NumSocket);
        var rows = new Input('row-count',"Rows",NumSocket);
        var colWidth = new Input('col-width',"Col Width",NumSocket);
        var rowHeight = new Input('row-height',"Row Height",NumSocket);
        var center = new Input('center',"Center",PositionSocket);

        var out1 = new Output('points', "Points", PointsSocket);
        return node
            .addInput(columns)
            .addInput(rows)
            .addInput(colWidth)
            .addInput(rowHeight)
            .addInput(center)
            .addOutput(out1);
    }

    worker(node, inputs, outputs) {
        var c = inputs['col-count'].length?inputs['col-count'][0]:10;
        c = g.floor(c);
        var r = inputs['row-count'].length?inputs['row-count'][0]:10;
        r = g.floor(r);
        var cw = inputs['col-width'].length?inputs['col-width'][0]:20;
        var rh = inputs['row-height'].length?inputs['row-height'][0]:20;
        var center = inputs['center'].length?inputs['row-height'][0]:{x:0,y:0};
        outputs['points'] = g.grid(c, r, cw, rh,center);
    }
}

export default GridNode;
