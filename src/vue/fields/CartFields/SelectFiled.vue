<template>
  <select name="select">
    <option selected>{{ getCartTotal }} UAH</option>
    <option>{{ countingTotal(currencyNames.CURRENCY_BTC) }} BTC</option>
    <option>{{ countingTotal(currencyNames.CURRENCY_ETH) }} ETH</option>
    <option>{{ countingTotal(currencyNames.CURRENCY_USD) }} USD</option>
  </select>
</template>

<script>
import { currencyNames } from "@/js/helpers/exchanger.helpers.js";
export default {
  name: "cart-item",
  props: ["getCartTotal", "countingTotal"],
  data() {
    return {
      currencyNames: currencyNames,
    };
  },
};
</script>
<style lang="scss"></style>
