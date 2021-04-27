<template>
  <div class="bg-gray-300" :value="value">
    <div class="py-12">
      <div
        class="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg md:max-w-5xl"
      >
        <div class="md:flex">
          <div class="w-full p-4 px-5 py-5">
            <div class="md:grid md:grid-cols-2 gap-2">
              <div class="col-span-2 p-5">
                <h1 class="text-xl font-medium">Shopping Cart</h1>
                <div
                  v-if="!cart.line_items || cart.line_items.length <= 0"
                  class="text-center my-8"
                >
                  <span class="subtitle-1 font-weight-light nav-text">
                    Cart is empty!
                  </span>
                </div>
                <template v-for="product in cart.line_items">
                  <div
                    class="flex justify-between items-center mt-6 pt-6"
                    :key="product.product_id"
                  >
                    <div class="flex items-center">
                      <img :src="product.media.source" width="60" />
                      <div class="flex flex-col ml-3">
                        <span class="md:text-md font-medium">{{
                          product.name
                        }}</span>
                      </div>
                    </div>
                    <div class="flex justify-center items-center">
                      <div class="pr-8 flex">
                        <span
                          class="font-semibold cursor-pointer"
                          @click="subQuantity(product)"
                          >-</span
                        >
                        <span
                          class="bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2 text-center"
                        >
                          {{ product.quantity }}
                        </span>
                        <span
                          class="font-semibold cursor-pointer"
                          @click="addQuantity(product)"
                          >+</span
                        >
                      </div>
                      <div class="pr-8">
                        <span class="text-xs font-medium">
                          ${{ product.line_total.formatted || "0.00" }}</span
                        >
                      </div>
                      <div
                        @click.stop="removeProduct(product.id)"
                        class="cursor-pointer"
                      >
                        <svg viewbox="0 0 40 40" width="40" height="40">
                          <path
                            class="close-x"
                            d="M 10,10 L 30,30 M 30,10 L 10,30"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </template>
                <div
                  class="flex justify-between items-center mt-6 py-6 border-t"
                >
                  <div class="flex items-center">
                    <span
                      class="text-md font-medium text-blue-500 cursor-pointer"
                      @click.stop="$emit('closeDrawer')"
                      >Close cart</span
                    >
                    <span
                      class="text-md text-red-700 ml-2 cursor-pointer"
                      @click="clearCart"
                    >
                      Clear</span
                    >
                  </div>
                  <div class="flex justify-center items-end">
                    <span class="text-sm font-medium text-gray-400 mr-2"
                      >Subtotal:</span
                    >
                    <span v-if="cart.subtotal" class="ml-1 nav-text">
                      ${{ cart.subtotal.formatted }}
                    </span>
                    <span v-else class="ml-1 nav-text">$0</span>
                  </div>
                </div>
                <nuxt-link
                  class="h-12 flex items-center justify-center w-1/2 md:w-1/3 mx-auto bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600"
                  to="/checkout"
                  @click="genToken(cart.id)"
                >
                  Check Out
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  props: {
    cart: {
      type: Object,
      default: () => {},
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions({
      removeProduct: "removeProductFromCart",
      clearCart: "clearCart",
      subQuantity: "subQuantity",
      addQuantity: "addQuantity",
      genToken: "genCheckoutToken",
    }),
  },
};
</script>
<style scoped>
.close-x {
  stroke: black;
  fill: transparent;
  stroke-linecap: round;
  stroke-width: 2;
}
</style>