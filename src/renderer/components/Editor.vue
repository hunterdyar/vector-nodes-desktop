<template>
  <div class="editorContainer">
            <div id="editor" class="node-editor" ref="nodeEditor"></div>
  </div>
</template>

<script>
import { Socket, NodeEditor, Control, Engine } from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import VueRenderPlugin from "rete-vue-render-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import VueNumControl from './NumControl.vue';
import VuePosControl from './PosControl.vue';
import regeneratorRuntime from "regenerator-runtime";

import OutputComponent from "./nodes/output";
import EllipseComponent from "./nodes/ellipse.js";
import ColorizeComponent from "./nodes/colorize";
import LineComponent from "./nodes/line";
import PositionComponent from "./nodes/position";
import NumComponent from "./nodes/number";
import AddComponent from "./nodes/add";
import RectComponent from "./nodes/rect";
import CircleNode from "./nodes/circle";
import Canvas from "./Canvas.vue";

export var PositionSocket = new Socket('Position');
export var PathSocket = new Socket('Path value');
export var NumSocket = new Socket('Number value');
export var ctx;

export function setContext(context)
{
  ctx = context;
}

function ResetCanvas(canvas)
{
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

export class NumControl extends Control {
  constructor(emitter, key, readonly) {
    super(key);
    this.component = VueNumControl;
    this.props = { emitter, ikey: key, readonly };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}
export class PosControl extends Control {
  constructor(emitter, key, readonly) {
    super(key);
    this.component = VuePosControl;
    this.props = { emitter, ikey: key, readonly };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}

export default {
  components: {Canvas},
  data() {
    return {
      editor: null
    };
  },
  async mounted() {
    var container = this.$refs.nodeEditor;
    var components = [new NumComponent(), new AddComponent(), new EllipseComponent(), new OutputComponent(), new ColorizeComponent(), new LineComponent(),  new RectComponent(),new PositionComponent(),new CircleNode()];

    var editor = new NodeEditor('demo@0.1.0', container);
    editor.use(ConnectionPlugin);
    editor.use(VueRenderPlugin);
    editor.use(ContextMenuPlugin,{
      // allocate(c){
      //   return c.path;
      // }
        });
    editor.use(AreaPlugin);
    // editor.use(DockPlugin, {
    //   container: document.querySelector('.dock'),
    //   itemClass: 'dock-item',
    //   plugins: [VueRenderPlugin], // render plugins
    // });
    var engine = new Engine('demo@0.1.0');

    components.map(c => {
        editor.register(c);
        engine.register(c);
    });

    var ellipse = await components[2].createNode();
    var output = await components[3].createNode();
    var colorize = await components[4].createNode({color: 'teal'});

    output.position = [300,200];
    ellipse.position = [200, 400];

    // editor.addNode(n1);
    // editor.addNode(n2);
    // editor.addNode(add);
    editor.addNode(ellipse);
    editor.addNode(output);
    editor.addNode(colorize);

    editor.connect(ellipse.outputs.get('shape'),colorize.inputs.get('shape'));
    editor.connect(colorize.outputs.get('shape'),output.inputs.get('shape'));

    editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
      console.log('process');
        if(ctx) {//local context
          ResetCanvas(ctx.canvas);
        }
        window.api.clear();
        await engine.abort();
        await engine.process(editor.toJSON());

    });

    //Fix for removing connection from last output node.
    editor.on('connectionremoved', async () => {
      window.api.clear(true);
    });

    editor.view.resize();
    AreaPlugin.zoomAt(editor);
    editor.trigger('process');
  }
};
</script>

<style>

.editorContainer{
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
}

.node-editor {
  text-align: left;

  /*height: 100%;*/

}

.node .control input, .node .input-control input {
  width: 140px;
}

select, input {
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  border: 1px solid #999;
  font-size: 110%;
  width: 170px;
}

.dock {
  height: 100px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

.dock-item {
  display: inline-block;
  vertical-align: top;
  transform: scale(0.8);
  transform-origin: 50% 0;
}
</style>
