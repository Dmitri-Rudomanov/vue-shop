<template>
  <div class="nav-bar">
    <nav class="nav-bar__menu">
      <WalletItem />
      <div class="nav-bar__item">
        <router-link class="router-link" :to="{ name: routeNames.products }"
          >Menu</router-link
        >
      </div>
      <div class="nav-bar__item">
        <router-link class="router-link" :to="{ name: routeNames.liked }"
          >Favorites ({{ getLikedNumber }})</router-link
        >
      </div>
      <div class="nav-bar__item">
        <router-link class="router-link" :to="{ name: routeNames.exchange }"
          >Exchange
        </router-link>
      </div>
      <div class="nav-bar__item">
        <button :class="classObject" @click="this.toggleCart" type="button">
          Cart ({{
            !isNaN(getCartNumber) && getCartNumber !== 0 ? getCartNumber : 0
          }})
        </button>
      </div>
    </nav>
    <CartItem v-if="this.isCartOpen" />
  </div>
</template>

<script>
import CartItem from "./CartItem.vue";
import WalletItem from "./WalletItem.vue";
import { mapGetters } from "vuex";
import getterNames from "@/vuex/getterNames";
import { ROUTE_NAMES } from "@/vue-router/routeName";
export default {
  name: "nav-bar",
  data() {
    return {
      isCartOpen: false,
      routeNames: ROUTE_NAMES,
    };
  },
  computed: {
    ...mapGetters({
      getCartNumber: getterNames.GET_CART_NUMBER,
      getLikedNumber: getterNames.GET_LIKED_NUMBER,
      getWallet: getterNames.GET_WALLET,
    }),
    classObject() {
      return {
        "nav-bar__cart-button": !this.isCartOpen,
        "nav-bar__cart-button--active": this.isCartOpen,
      };
    },
  },
  methods: {
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
    },
  },
  components: { CartItem, WalletItem },
};
</script>

<style lang="scss">
.nav-bar {
  margin-bottom: 1.6rem;
}
.nav-bar__menu {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.313rem;
}
.nav-bar__item {
  margin: 0 0.938rem 0 0;
}

.nav-bar__cart-button {
  width: 100%;
  cursor: pointer;
  text-decoration: none;
  color: $col-nav-bar-cart-button-text;
  border: 0.063rem solid $col-nav-bar-cart-button-border;
  border-radius: 0.25rem;
  font-size: 1rem;
  background-color: $col-nav-bar-cart-button;
  &:hover {
    color: $col-nav-bar-cart-button-text-active;
  }
  &--active {
    cursor: pointer;
    text-decoration: none;
    color: $col-nav-bar-cart-button-text-active;
    border-radius: 0.25rem;
    padding: 0.625rem;
    font-size: 1rem;
    background-color: $col-nav-bar-cart-button-active;
    border: 0.063rem solid $col-nav-bar-cart-button-border-active;
  }
}

.router-link {
  text-decoration: none;
  color: $col-router-link-text;
  border: 0.063rem solid $col-router-link-border;
  border-radius: 0.25rem;
  padding: 0.625rem;
  &:hover {
    color: $col-router-link-text-active;
  }
}
.router-link-exact-active {
  border: 0.063rem solid $col-router-link-border-active;
  color: $col-router-link-text-active;
}
</style>
