//todo: Copy on points
//input: list of points, shape. output: combine that shape with the x/y position of each shape.
import {Component, Input, Output} from "rete";
import g from "g.js";
import {PathSocket, PointsSocket} from "../Editor.vue";

class CopyOnPointsNode extends Component
{
    constructor(){
        super("Copy On Points");
    }

    builder(node) {
        this.path = "Shapes";
        var points = new Input('points',"Points",PointsSocket);
        var shape = new Input('shape',"Shape",PathSocket);

        var out1 = new Output('shape', "Shape", PathSocket);
        return node
            .addOutput(out1)
            .addInput(points)
            .addInput(shape);
    }

    worker(node, inputs, outputs) {
        var p = inputs['points'].length?inputs['points'][0]:[g.makePoint(0,0)];
        var s = inputs['shape'].length?inputs['shape'][0]:{};

        var shape;
        var count = g.count(p);
        if(count === 1)
        {
            shape = s
            shape.x = p[0].x;
            shape.y = p[0].y;

        }else {
            //Search node history for a "PositionIterator" node. Set its value to p[i] then ... re-process just the nodes that extend from it, which should update a variable for us.
            //engine.findNode...
            //engine.process(foundNode)

            //todo: Nodes are instanced relative to the grid positions. If they don't center 0, then the won't spawn 0. Is this intentional? Option to use centroid of node?

            shape = g.copy(s,1,'trs',{x:p[0].x,y:p[0].y},0,{x:0,y:0});;
            shape = g.translate(shape[0],{x:p[0].x,y:p[0].y});
            shape = g.group(shape);
            for(var i = 1;i<count;i++)
            {

                var n = g.copy(s,1,'trs',{x:0,y:10},0,{x:0,y:0});//copy s, 1 time, trs order, translate, rotate, scale.
                n[0] = g.translate(n[0],{x:p[i].x,y:p[i].y});
                shape['shapes'].push(n[0]);//add to the group
            }
        }

        console.log(shape);
        outputs['shape'] = shape;//node.data.num;

    }
}

export default CopyOnPointsNode;
