<template>
  <div class="product-item">
    <img :src="this.item.img" class="product-item__big-image" />
    <div class="product-item__info">
      <p class="product-item__name">{{ this.item.name }}</p>
      <p class="product-item__price">{{ this.item.description }}</p>
      <span class="product-item__price"
        >Price: {{ this.item.price + " " + this.item.asset }}</span
      >
      <span class="product-item__price">Weight: {{ this.item.weight }} kg</span>
      <div class="product-item__actions">
        <button
          v-if="!isInCart(this.item.id)"
          type="button"
          class="app__button"
          @click="setCartAdd(this.item)"
        >
          Add
        </button>
        <div v-else>
          <button
            type="button"
            class="app__button-small"
            @click="setCartAdd(this.item)"
          >
            +
          </button>
          <span class="product-item__quantity">
            {{ isInCart(this.item.id).quantity }}
          </span>
          <button
            type="button"
            class="app__button-small"
            @click="setCartRemove(this.item)"
          >
            &minus;
          </button>
        </div>
        <button
          v-if="!isInLiked(this.item.id)"
          type="button"
          class="app__button-icon"
          @click="setLikedAdd(this.item)"
        >
          <LikeIcon :liked="false" />
        </button>
        <button
          v-if="isInLiked(this.item.id)"
          type="button"
          class="app__button-icon"
          @click="setLikedRemove(this.item)"
        >
          <LikeIcon :liked="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import getterNames from "@/vuex/getterNames";
import actionNames from "@/vuex/actionNames";
import LikeIcon from "@/vue/common/LikeIcon.vue";
import data from "@/database.json";
export default {
  name: "product-item",
  components: { LikeIcon },
  data() {
    return {
      item: {},
    };
  },
  props: {
    params: Object,
  },
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
  async created() {
    this.item = data.goods.find(
      (item) => this.params.productId === item.id.toString()
    );
  },
};
</script>

<style lang="scss">
.product-item {
  display: flex;
  margin-top: 1rem;
}

.product-item__big-image {
  margin-right: 2rem;
  width: 20rem;
}

.product-item__info {
  padding: 1rem 0 0 0;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
}

.product-item__name {
  font-weight: bold;
}

.product-item__actions {
  display: flex;
  justify-content: space-between;
}
</style>
