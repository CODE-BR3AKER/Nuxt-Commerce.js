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
    <div
      class="container mx-auto flex items-center flex-wrap py-0 pb-12 md:py-12 md:pb-0"
    >
      <div class="w-full md:w-1/2 product__container">
        <img
          :src="product.media.source"
          class="product__picture block m-auto"
        />
      </div>
      <div class="w-full md:w-1/2 pl-6 md:pl-10 pt-16 md:pt-0">
        <h1
          class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-4xl"
        >
          {{ product.name }}
        </h1>
        <h2 class="mt-4 text-gray-700">Price:</h2>
        <p class="mt-4">{{ product.price.formatted_with_symbol }}</p>
        <h2 class="mt-4 text-gray-700">Variant:</h2>
        <p class="mt-4">Original</p>
        <br />
        <button
          class="mt-12 bg-black text-white px-6 py-4 text-bold hover:bg-white hover:border hover:border-black hover:text-black"
          @click="addToCart(product.id)"
        >
          Add to cart
        </button>
      </div>
    </div>
    <Foot />
  </div>
</template>
<script>
import Vue from "vue";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import Checkout from "../../components/Checkout.vue";
export default {
  components: { Checkout },
  fetch({ store, params }) {
    if (
      store.state.selectedProduct &&
      store.state.selectedProduct.permalink == params.permalink
    )
      return true;
    return Vue.prototype.$commerce.products
      .retrieve(params.permalink, {
        type: "permalink",
      })
      .then((res) => {
        store.commit("updateProduct", res);
      });
  },
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    ...mapGetters({
      cart: "cart",
      product: "product",
    }),
  },
  methods: {
    ...mapActions({
      addToCart: "addProductToCart",
    }),
  },
};
</script>
<style scoped>
.product__container {
  background: #eeeeee;
}
.product__picture {
  height: 70vh !important;
}
</style>