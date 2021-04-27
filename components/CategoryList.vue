<template>
  <main class="flex flex-wrap">
    <section
      v-for="category in categories"
      :key="category.slug"
      class="w-full md:w-1/2 mx-auto bg-nordic-gray-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right"
      :style="{
        backgroundImage: `url(${backgroundUrl(category.slug)})`,
        maxWidth: '1600px',
        height: '32rem',
      }"
    >
      <div class="container mx-auto">
        <div
          class="flex flex-col w-full lg:w-1/2 justify-center items-start px-6 tracking-wide"
        >
          <nuxt-link
            class="inline-block no-underline hover:text-black hover:underline py-2 px-4"
            :to="{
              name: 'categories-slug',
              params: { slug: category.slug },
            }"
          >
            <category-view :category="category"></category-view>
          </nuxt-link>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
export default {
  props: ["categories"],
  data() {
    return {
      bg_url: "",
    };
  },
  computed: {
    backgroundUrl: function () {
      return (image_slug) => {
        if (`${image_slug}` === "office") {
          return (this.bg_url = "/office.jpg");
        } else {
          return (this.bg_url = "/accessoires.jpg");
        }
      };
      /*{
      if (categoryname === "accessoires") {
        this.backgroundUrl = "~@/static/accessoires.jpeg";
      } else {
        this.backgroundUrl = "~@/static/office.jpeg";}}*/
    },
  },
};
</script>