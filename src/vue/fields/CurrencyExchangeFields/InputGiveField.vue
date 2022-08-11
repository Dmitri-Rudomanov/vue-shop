<template>
  <input value="1" type="number" name="input-one" @input="changeValue" />
</template>

<script>
export default {
  name: "input-give-filed",
  props: ["inputObserver"],
  methods: {
    changeValue(e) {
      this.inputObserver(Number(e.target.value));
    },
  },
};
</script>

<style lang="scss"></style>
