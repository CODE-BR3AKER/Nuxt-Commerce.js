<template>
  <div class="h-screen overflow-x-hidden">
    <Head />
    <div class="w-screen p-10 md:p-24 bg-gray-100">
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
              <div :key="item.name">{{ item.name }} x {{ item.quantity }}</div>
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
            <img src="/payment.png" class="block h-10 mt-6"/>
            <button class="mt-12 bg-gray-900 hover:bg-black text-white px-6 py-4 text-bold">
              Confirm order
            </button>
          </div>
        </div>
      </div>
    </div>
    <Foot/>
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