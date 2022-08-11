<template>
  <div class="currency-exchange">
    <h1 class="currency-exchange__title">Currency Exchange App</h1>
    <ExchangerFormVue />
  </div>
</template>

<script>
import ExchangerFormVue from "@/vue/forms/ExchangerForm/ExchangerForm.vue";
export default {
  name: "currency-exchange",
  components: { ExchangerFormVue },
};
</script>

<style lang="scss">
.currency-exchange {
  width: 24rem;
}

.currency-exchange__title {
  display: inline-block;
  border-bottom: 0.2rem solid $col-currency-exchange-title-border;
  margin-bottom: 1rem;
}
</style>
