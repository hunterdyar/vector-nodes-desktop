<template>
  <input
      type="number"
      :readonly="readonly"
      :value="x"
      @input="changeX($event)"
      @dblclick.stop=""
      @pointerdown.stop=""
      @pointermove.stop=""
  />
  <input
      type="number"
      :readonly="readonly"
      :value="y"
      @input="changeY($event)"
      @dblclick.stop=""
      @pointerdown.stop=""
      @pointermove.stop=""
  />
</template>

<script>
export default {
  props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
  data() {
    return {
      x: 0,
      y: 0,
    }
  },
  methods: {
    changeX(e){
      this.x = +e.target.value;
      this.update();
    },
    changeY(e){
      this.y = +e.target.value;
      this.update();
    },
    update() {
      if (this.ikey) {
        this.putData(this.ikey, {x:this.x,y:this.y});
      }
      this.emitter.trigger('process');
    }
  },
  mounted() {
    console.log(this.getData(this.ikey));
    this.x = this.getData(this.ikey)?.x;
    this.y = this.getData(this.ikey)?.y;
  }
}
</script>
