<template>
  <div>
    <ul class="products-page__list">
      <ProductCard
        v-for="product in products"
        :key="product.uid"
        :product="product"
      />
    </ul>
  </div>
  <router-view></router-view>
</template>

<script>
import data from "@/database.json";
import ProductCard from "@/vue/ProductCard.vue";

export default {
  name: "products-page",
  components: { ProductCard },
  computed: {
    products() {
      return data.goods;
    },
  },
};
</script>

<style lang="scss">
.products-page__list {
  justify-content: center;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>
