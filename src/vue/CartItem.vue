<template>
  <div class="cart-item">
    <h3>Cart</h3>
    <div v-show="!getCartProducts.length">
      <div v-if="paymentSuccess" class="cart-item__message">
        Payment Successfull!!!
      </div>
      <p class="cart-item__empty">Your cart is empty!</p>
    </div>

    <div v-show="getCartProducts.length">
      <div class="cart-item__list">
        <div v-for="p in getCartProducts" :key="p.uid">
          <div class="cart-item__product">
            <img class="cart-item__image" :src="p.img" alt="" />
            <span>{{ p.name }}</span>
            <span>Quantity: {{ p.quantity }}</span>
            <span>Weight: {{ p.weight }}</span>
            <span> {{ p.price * p.quantity }} {{ p.asset }} </span>
            <div class="cart-item__btns">
              <button
                type="button"
                class="app__button-small"
                @click="setCartAdd(p)"
              >
                +
              </button>
              <button
                type="button"
                class="app__button-small"
                @click="setCartRemove(p)"
              >
                &minus;
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="paymentErr" class="cart-item__error">
        Sorry,there is not enought currency in your wallet , you can try to
        chose other currency or use our exchange app for currency exchange
      </div>
      <form @submit.prevent="checkout">
        <div class="cart-item__total">
          Total amount:
          <SelectFiled
            :getCartTotal="getCartTotal"
            :countingTotal="countingTotal"
          />
        </div>
        <span class="cart-item__total"
          >Total weight:
          {{ new Intl.NumberFormat("ru-RU").format(getCartWeight) }} kg</span
        >
        <span class="cart-item__total"
          >Total quantity:
          {{ new Intl.NumberFormat("ru-RU").format(getCartQuantity) }}
          items</span
        >
        <button v-show="getCartProducts.length" class="cart-item__checkout">
          Checkout
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import SelectFiled from "@/vue/fields/CartFields/SelectFiled.vue";
import { mapActions, mapGetters } from "vuex";
import getterNames from "@/vuex/getterNames";
import actionNames from "@/vuex/actionNames";
import { currencyNames } from "@/js/helpers/exchanger.helpers.js";
export default {
  name: "cart-item",
  data() {
    return {
      paymentErr: false,
      paymentSuccess: false,
    };
  },
  components: { SelectFiled },
  computed: {
    ...mapGetters({
      getCartProducts: getterNames.GET_CART_PRODUCTS,
      getCartTotal: getterNames.GET_CART_TOTAL,
      getCartWeight: getterNames.GET_CART_WEIGHT,
      getCartQuantity: getterNames.GET_CART_QUANTITY,
      wallet: getterNames.GET_WALLET,
    }),
  },
  methods: {
    ...mapActions({
      setCartAdd: actionNames.SET_CART_ADD,
      setCartRemove: actionNames.SET_CART_REMOVE,
      setWalletMinus: actionNames.SET_WALLET_MINUS,
      setCartClear: actionNames.SET_CART_CLEAR,
    }),
    checkout(e) {
      const number = Number(e.target.select.value.split(" ")[0]);
      const key = e.target.select.value.split(" ")[1].toLowerCase();
      if (this.wallet[key] < number) {
        this.paymentSuccess = false;
        return (this.paymentErr = true);
      }
      this.setWalletMinus({ [key]: number });
      this.paymentSuccess = true;
      this.setCartClear();
    },
    countingTotal(curr) {
      if (curr === currencyNames.CURRENCY_BTC) {
        return this.getCartTotal * (0.0000012779).toFixed(7);
      }
      if (curr === currencyNames.CURRENCY_ETH) {
        return this.getCartTotal * (0.00002857142).toFixed(5);
      }
      if (curr === currencyNames.CURRENCY_USD) {
        return this.getCartTotal * (0.02857142).toFixed(6);
      }
    },
  },
};
</script>

<style lang="scss">
.cart-item {
  border: 0.125rem solid $col-cart-item-border;
  width: 100%;
  max-height: 18.75rem;
  overflow: auto;
  background-color: $col-cart-item-background;
  padding: 0.938rem;
}

.cart-item__message {
  color: $col-cart-item-message;
  font-size: 1.5rem;
  margin: 0.75rem 0 0 0;
}

.cart-item__empty {
  color: $col-cart-item-empty-text;
  font-size: 1.5rem;
  margin: 0.75rem 0;
}

.cart-item__list {
  margin-bottom: 1.25rem;
}

.cart-item__product {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.125rem;
  border-bottom: 0.063rem solid $col-cart-item-product-border;
}

.cart-item__image {
  height: 3.125rem;
  width: 3.75rem;
}

.cart-item__btns {
  display: flex;
}

.cart-item__error {
  color: $col-cart-item-error-text;
  font-size: 1.1rem;
  margin: 0.75rem 0;
}

.cart-item__total {
  display: inline;
  font-weight: bold;
  margin-right: 1.563rem;
}

.cart-item__checkout {
  margin-top: 1.875rem;
  padding: 0.625rem;
  border-radius: 0.25rem;
  background: $col-cart-item-checkout-button;
  color: $col-cart-item-checkout-text;
  border: none;
  cursor: pointer;
}
</style>
