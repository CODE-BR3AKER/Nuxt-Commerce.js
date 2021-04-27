<template>
  <div class="h-screen md:overflow-y-hidden overflow-x-hidden">
    <Head />
    <div class="flex flex-col md:flex-row w-full justify-around bg-gray-200">
      <div
        class="w-screen md:w-1/2 pr-32 pl-10 bg-gray-700 text-white thank flex flex-col justify-center"
      >
        <h1 class="text-3xl font-bold mb-10">
          THANKS FOR YOUR ORDER &#128159;
        </h1>
        <p>
          Normally at this stage we would ask you to provide your informations
          and confirm the order but since this is just a demo we wont do so;
          happy shopping !
        </p>
      </div>
      <div class="w-screen md:w-1/2 p-10 md:p-24">
        <div cols="12" sm="5">
          <div max-width="400">
            <h1 class="pb-0 text-2xl font-bold">Order Summary</h1>
            <div>
              <div class="flex flex-col">
                <h2 class="py-1 text-xl">Product</h2>
              </div>
              <div
                class="flex flex-col"
                v-for="item in cart.line_items"
                :key="item.id"
              >
                <div :key="item.name">
                  {{ item.name }} x {{ item.quantity }}
                </div>
              </div>
              <div class="flex flex-col">
                <h2 class="text-xl py-1">Subtotal</h2>
                <div v-if="cart.subtotal">
                  {{ cart.subtotal.formatted_with_symbol }}
                </div>
                <div v-else>$0.00</div>
              </div>
              <div class="flex flex-col">
                <h2 class="text-xl py-1">Shipping</h2>
                <div>${{ shippingCost }}</div>
              </div>
              <div class="flex flex-col">
                <h2 class="text-xl py-1">Total</h2>
                <div>{{ total }}</div>
              </div>
              <button class="mt-12 bg-black text-white px-6 py-4 text-bold">
                Confirm order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Head from "../components/Head.vue";

export default {
  components: { Head },
  data() {
    return {
      shippingCost: "0.00",
      timeout: 8000,
      orderNumber: "",
      orderRef: "",
      orderError: "",
    };
  },
  computed: {
    ...mapGetters({
      cart: "cart",
    }),
    total() {
      let total = "0.00";
      if (this.cart.subtotal) {
        total = +this.cart.subtotal.raw + +this.shippingCost;
      }

      return `$${total}`;
    },
  },
  mounted() {
    this.$store.dispatch("retrieveCart");
  },
  methods: {
    updateCost(price) {
      this.shippingCost = price;
    },
    handleOrderError(e) {
      this.orderError = e;
      this.snackbar = true;
    },
    handleOrderRes(data) {
      this.orderNumber = data.id;
      this.orderRef = data.ref;
      this.dialog = true;
    },
  },
};
</script>
<style>
.thank {
  height: 566px !important;
}
</style>