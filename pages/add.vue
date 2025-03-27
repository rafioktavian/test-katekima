<template>
  <div>
    <TheHeader/>
    <article class="content-box dashboard min-h-screen">
      <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold">Tambah Produk</h1>
        <ProductForm />
      </div>
    </article>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import ProductForm from '~/components/ProductForm.vue'
</script>