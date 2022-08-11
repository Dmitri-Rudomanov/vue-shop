<template>
  <div class="liked-page">
    <h3 class="liked-page__title">Favorite products</h3>

    <div class="liked-page__empty" v-show="!getLiked.length">
      <p class="liked-page__empty-message">
        You don't have any favorite products yet!
      </p>
      <router-link
        class="liked-page__empty-link"
        :to="{ name: routeNames.products }"
        >Go to catalog</router-link
      >
    </div>

    <div v-show="getLiked.length">
      <ul class="liked-page__list">
        <ProductCard
          v-for="product in getLiked"
          :key="product.uid"
          :product="product"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import getterNames from "@/vuex/getterNames";
import ProductCard from "@/vue/ProductCard.vue";
import { ROUTE_NAMES } from "@/vue-router/routeName";
export default {
  name: "liked-page",
  components: { ProductCard },
  data() {
    return {
      routeNames: ROUTE_NAMES,
    };
  },
  computed: {
    ...mapGetters({
      getLiked: getterNames.GET_LIKED,
    }),
  },
};
</script>

<style lang="scss">
.liked-page__list {
  justify-content: center;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.liked-page__title {
  margin-bottom: 1.25rem;
  font-size: 1.875rem;
}
.liked-page__item-image {
  margin-bottom: 0.625rem;
}
.liked-page__empty-link {
  color: $col-liked-page-empty-link;
  font-size: 1.3rem;
}
.liked-page__empty-message {
  font-size: 1.5rem;
  color: $col-liked-page-empty-message;
  margin: 0 0 1rem 0;
}
</style>
