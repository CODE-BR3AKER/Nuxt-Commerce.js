<template>
  <div>
    <Head>
      <template v-slot:cart>
        <span
          class="pl-3 inline-block no-underline hover:text-black"
          @click.stop="drawer = !drawer"
        >
          <svg
            class="fill-current text-gray-600 hover:text-black cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z"
            />
            <circle cx="10.5" cy="18.5" r="1.5" />
            <circle cx="17.5" cy="18.5" r="1.5" />
          </svg>
        </span>
      </template>
    </Head>
    <Checkout
      v-model="drawer"
      @closeDrawer="drawer = !drawer"
      :cart="cart"
      v-if="drawer"
    />
    <h1
      class="ml-10 md:ml-16 mt-12 uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
    >
      {{ category.name }}
    </h1>
    <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
      <product-list :products="products"></product-list>
    </div>
    <Foot class="border-t border-gray-400" />
  </div>
</template>
<script>
import Vue from "vue";
import { mapGetters } from "vuex";
export default {
  async asyncData({ store, params }) {
    const { slug } = params;
    const category = await Vue.prototype.$commerce.categories.retrieve(slug, {
      type: "slug",
    });
    store.commit("updateCategory", category);
    const { data: products } = await Vue.prototype.$commerce.products.list({
      category_slug: slug,
    });
    store.commit("updateProducts", products);
  },
  computed: {
    ...mapGetters({
      products: "categoryProducts",
      cart: "cart",
      category: "category",
    }),
  },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>