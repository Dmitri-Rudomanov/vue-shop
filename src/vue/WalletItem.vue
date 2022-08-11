<template>
  <div class="wallet-item">
    <span class="wallet-item__title">My wallet:</span>
    {{ getWallet.btc.toFixed(3) }}
    <span class="wallet-item__currency">BTC;</span>
    {{ getWallet.uah.toFixed(1) }}
    <span class="wallet-item__currency">UAH;</span>
    {{ getWallet.eth.toFixed(2) }}
    <span class="wallet-item__currency">ETH;</span>
    {{ getWallet.usd.toFixed(1) }}
    <span class="wallet-item__currency">USD;</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import getterNames from "@/vuex/getterNames";
export default {
  name: "wallet-item",
  computed: {
    ...mapGetters({
      getWallet: getterNames.GET_WALLET,
    }),
  },
};
</script>

<style lang="scss">
.wallet-item {
  font-size: 1.1rem;
  border-bottom: 1px solid $col-wallet-item-border;
}
.wallet-item__title {
  font-size: 1.25rem;
  display: inline-block;
  margin-right: 0.8rem;
  font-weight: bold;
}

.wallet-item__currency {
  font-size: 0.75rem;
  font-weight: bold;
  margin: 0 0.3rem;
}
</style>
