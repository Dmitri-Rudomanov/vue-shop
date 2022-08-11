<template>
  <li class="product-card">
    <img :src="product.img" class="product-card__image" />
    <router-link
      :to="{
        name: routeName.product,
        params: { productId: product.id },
      }"
      class="product-card__name"
      >{{ product.name }}</router-link
    >
    <span class="product-card__price">{{
      product.price + " " + product.asset
    }}</span>
    <span class="product-card__price">{{ product.weight }} kg</span>
    <div class="product-card__actions">
      <button
        v-if="!isInCart(product.id)"
        type="button"
        class="app__button"
        @click="setCartAdd(product)"
      >
        Add
      </button>
      <div v-else>
        <button
          type="button"
          class="app__button-small"
          @click="setCartAdd(product)"
        >
          +
        </button>
        <span class="product-card__quantity">
          {{ isInCart(product.id).quantity }}
        </span>
        <button
          type="button"
          class="app__button-small"
          @click="setCartRemove(product)"
        >
          &minus;
        </button>
      </div>

      <button
        v-if="!isInLiked(product.id)"
        type="button"
        class="app__button-icon"
        @click="setLikedAdd(product)"
      >
        <LikeIcon :liked="false" />
      </button>
      <button
        v-if="isInLiked(product.id)"
        type="button"
        class="app__button-icon"
        @click="setLikedRemove(product)"
      >
        <LikeIcon :liked="true" />
      </button>
    </div>
  </li>
  <router-view></router-view>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import getterNames from "@/vuex/getterNames";
import actionNames from "@/vuex/actionNames";
import { ROUTE_NAMES } from "@/vue-router/routeName";
import LikeIcon from "./common/LikeIcon.vue";
export default {
  name: "product-card",
  data() {
    return {
      routeName: ROUTE_NAMES,
    };
  },
  props: {
    product: Object,
  },
  components: { LikeIcon },
  methods: {
    ...mapGetters({
      getCartProducts: getterNames.GET_CART_PRODUCTS,
      getLiked: getterNames.GET_LIKED,
    }),
    ...mapActions({
      setCartAdd: actionNames.SET_CART_ADD,
      setCartRemove: actionNames.SET_CART_REMOVE,
      setLikedAdd: actionNames.SET_LIKED_ADD,
      setLikedRemove: actionNames.SET_LIKED_REMOVE,
    }),
    isInCart(id) {
      return this.getCartProducts().find((p) => p.id === id);
    },
    isInLiked(id) {
      return this.getLiked().find((p) => p.id === id);
    },
  },
};
</script>

<style lang="scss">
.product-card {
  margin: 0.8rem;
  display: flex;
  width: 18.75rem;
  flex-direction: column;
  margin-bottom: 1.25rem;
  box-shadow: $col-product-card-shadow 0 0.438rem 1.813rem 0;
}
.product-card__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product-card__card {
  margin-top: 1.5rem;
  display: flex;
  height: 100%;
  max-height: 31.25rem;
}
.product-card__info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.product-card__big-image {
  margin-right: 1.875rem;
  width: 20rem;
  height: 20rem;
}
.product-card__descr {
  padding: 0 0.313rem;
  line-height: 1.25rem;
}
.product-card__name {
  padding: 0.625rem;
  font-weight: bold;
  color: inherit;
}
.product-card__price,
.product-card__quantity {
  padding: 0.625rem;
}
</style>
