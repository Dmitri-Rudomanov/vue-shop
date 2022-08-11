import { createRouter, createWebHistory } from "vue-router";
import ProductsPageVue from "@/vue/pages/ProductsPage.vue";
import LikedPageVue from "@/vue/pages/LikedPage.vue";
import ProductItemVue from "@/vue/pages/ProductItemPage.vue";
import CurrencyExchangeVue from "@/vue/pages/CurrencyExchangePage.vue";
import { ROUTE_NAMES } from "./routeName";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: ROUTE_NAMES.products,
      component: ProductsPageVue,
    },
    {
      path: "/liked",
      name: ROUTE_NAMES.liked,
      component: LikedPageVue,
    },
    {
      path: "/product/:productId",
      name: ROUTE_NAMES.product,
      props: (route) => ({ params: route.params }),
      component: ProductItemVue,
    },
    {
      path: "/exchange",
      name: ROUTE_NAMES.exchange,
      component: CurrencyExchangeVue,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: ROUTE_NAMES.products },
    },
  ],
});

export default router;
