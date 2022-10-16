<template>
  <div id="canvasWrapper">
  <p>vue canvas</p>
  <canvas id="c" ref="canvas"></canvas>
  </div>
</template>

<script>
import {setContext} from './Editor.vue';
// import {ipcMain, ipcRenderer} from "electron";

export default {
  name: "Canvas",
  width: 600,
  height: 300,
  mounted() {
    console.log("canvas mounted");
    var canvas = this.$refs.canvas;
    var ctx = canvas.getContext('2d', {willReadFrequently: true});
    canvas.width = 300;
    canvas.height = 150;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    setContext(ctx);
  }
}

</script>

<style scoped>
canvas{
  margin: auto;
  display: inline-block;
  vertical-align: middle;
  border: 1px black solid;
}
#canvasWrapper{
  position: absolute;
  right:0;
  top:0;
  bottom: 0;
  width: 30vw;
}
</style>
