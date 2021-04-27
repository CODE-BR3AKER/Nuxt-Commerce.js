<template>
  <div>
    <img :src="product.media.source" />
    <p>{{ product.name }} : {{ product.price.formatted_with_symbol }}</p>
  </div>
</template>
<script>
export default {
  props: ["product"],
};
</script>