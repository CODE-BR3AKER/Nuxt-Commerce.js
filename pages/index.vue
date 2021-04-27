<template>
  <div
    class="bg-white text-gray-600 work-sans leading-normal text-base tracking-normal"
  >
    <!--Nav-->
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
    <section
      class="w-full mx-auto bg-nordic-gray-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right back"
    >
      <div class="container mx-auto">
        <div
          class="flex flex-col w-full lg:w-1/2 justify-center items-start px-6 tracking-wide"
        >
          <h1 class="text-black text-2xl my-4">
            Find Comfort. Start Creating !
          </h1>
          <nuxt-link
            class="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black"
            to="/#products"
            >products</nuxt-link
          >
        </div>
      </div>
    </section>
    <section class="bg-white py-8">
      <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <nav id="store" class="w-full z-30 top-0 px-6 py-1">
          <div
            class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3"
          >
            <p
              class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
              id="products"
            >
              Store
            </p>

            <div class="flex items-center" id="store-nav-content">
              <span class="pl-3 inline-block no-underline hover:text-black">
                <svg
                  class="fill-current hover:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                </svg>
              </span>
              <input
                type="search"
                name="search"
                id="search"
                v-if="search"
                placeholder=" product name"
                class="border ml-4 p-1"
                v-model="ksearch"
              />
              <span
                class="pl-3 inline-block no-underline hover:text-black cursor-pointer"
                @click.prevent="search = !search"
              >
                <svg
                  class="fill-current hover:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </nav>
        <ProductList :products="filteredProducts" />
      </div>
    </section>

    <section class="bg-white py-8">
      <div class="container py-8 px-6 mx-auto">
        <p
          class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl mb-8"
          id="about"
        >
          About
        </p>
        <p class="my-8">
          Casual is a modern store, built on top of nuxt.js and commerce.js. The
          store is dedicated to creatives who want to get more work done by
          using the right tools. Our products are there to eleminate the long
          process of trying to find that perfect accesoire, that comfortable
          chair...We hear you ! let us take care of that. As a creative person
          you want to put most your energy into your work, so using the right
          tools can be a game changer. For us the perfect product is
          <em>functional</em>, <em> easy </em>to use, and <em>durable</em>. You
          can either browse all the products, or browse by category: accesoires
          and home office. Any question or remark feel free to visit my
          portofolio and tell me about it !
        </p>
      </div>
    </section>
    <Foot class="border-t border-gray-400" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      products: "products",
      cart: "cart",
    }),
    filteredProducts: function () {
      return this.products.filter((product) => {
        return product.name.toUpperCase().match(this.ksearch.toUpperCase());
      });
    },
  },
  data() {
    return {
      drawer: false,
      search: false,
      ksearch: "",
    };
  },
};
</script>
<style scoped>
.back {
  max-width: 1600px;
  height: 32rem;
  background-image: url("../static/featured.jpg");
}
</style>