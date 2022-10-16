import {Component, Input} from "rete";
import {PathSocket, ctx} from "../Editor.vue";


class OutputComponent extends Component {

    constructor(){
        super("Output");
    }

    builder(node) {
        this.path = "";
        var inp1 = new Input('shape',"Shape",PathSocket,true);

        return node
            .addInput(inp1)
    }

    worker(node, inputs, outputs) {
        outputs['num'] = node.data.num;
        //Canvas cleared by processor, so it can handle multiple Output nodes.
        //the order of output nodes is not configurable, but at least it won't break.

        if (inputs['shape']) {
            //loop through and draw all of the paths in order.
            //todo: some way to sort? Get incoming node y position?
            inputs['shape'].map(path => {
                if(ctx) {
                    //local context;
                    path.draw(ctx);
                }
                console.log(path);
                window.api.draw(path);
            });
        }
    }
}


export default OutputComponent;
