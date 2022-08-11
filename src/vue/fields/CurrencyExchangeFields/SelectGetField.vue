<template>
  <select @change="change($event.target.value)">
    <option selected :value="currencyNames.CURRENCY_UAH">UAH</option>
    <option :value="currencyNames.CURRENCY_USD">USD</option>
    <option :value="currencyNames.CURRENCY_BTC">BTC</option>
    <option :value="currencyNames.CURRENCY_ETH">ETH</option>
  </select>
</template>

<script>
import { currencyNames } from "@/js/helpers/exchanger.helpers.js";
export default {
  name: "select-get-field",
  props: ["currencyObserver"],
  data() {
    return {
      currencyNames: currencyNames,
    };
  },
  methods: {
    change(newCurr) {
      console.log(newCurr);
      this.currencyObserver(newCurr);
    },
  },
};
</script>

<style lang="scss"></style>
