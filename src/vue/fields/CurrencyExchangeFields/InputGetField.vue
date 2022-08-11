<template>
  <input :value="amountTwo" type="number" name="input-two" disabled />
</template>

<script>
export default {
  name: "input-get-filed",
  props: ["amountTwo"],
};
</script>

<style lang="scss"></style>
