<template>
  <div>
    <TheHeader/>
    <article class="content-box dashboard min-h-screen">
      <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-6">Edit Product</h1>
        <ProductForm :is-edit-mode="true" :product-id="productId" />
      </div>
    </article>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '~/stores/product'
import axios from 'axios' // Import Axios
import ProductForm from '~/components/ProductForm.vue'

// Ambil ID dari route params
const route = useRoute()
const productId = Number(route.params.id)

// Pinia store
const productStore = useProductStore()

// Fetch data product saat mounted menggunakan Axios
onMounted(async () => {
  try {
    const { data } = await axios.get(`https://fakestoreapi.com/products/${productId}`)
    if (data) {
      productStore.setProductForEdit(data)
    } else {
      ElMessage.error('Product not found')
    }
  } catch (error: any) {
    ElMessage.error('Failed to load product data')
    console.error('Error fetching product:', error.response?.data || error.message)
  }
})
</script>