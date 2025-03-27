<template>
  <div>
    <TheHeader/>
    <article class="content-box dashboard min-h-screen">
      <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-6">Berry Detail</h1>

        <!-- Loading state -->
        <div v-if="!selectedBerry && !error" class="text-center">
          <el-spinner />
          <p class="mt-2">Loading...</p>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="text-center text-red-500">
          <p>{{ error }}</p>
          <el-button class="mt-4" @click="router.push('/')">Back to List</el-button>
        </div>

        <!-- Detail content -->
        <div v-else class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">{{ selectedBerry?.name }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>ID:</strong> {{ selectedBerry?.id }}</p>
              <p><strong>Growth Time:</strong> {{ selectedBerry?.growth_time }} hours</p>
              <p><strong>Max Harvest:</strong> {{ selectedBerry?.max_harvest }}</p>
            </div>
            <div>
              <p><strong>Size:</strong> {{ selectedBerry?.size }} mm</p>
              <p><strong>Smoothness:</strong> {{ selectedBerry?.smoothness }}</p>
              <p><strong>Soil Dryness:</strong> {{ selectedBerry?.soil_dryness }}</p>
            </div>
          </div>
          <el-button class="mt-6" type="primary" @click="router.push('/berry')">
            Back to List
          </el-button>
        </div>
      </div>
    </article>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBerryStore } from '~/stores/berry'
import { storeToRefs } from 'pinia'

// Router dan Route
const route = useRoute()
const router = useRouter()
const berryId = Number(route.params.id)

// Pinia store
const berryStore = useBerryStore()
const { selectedBerry } = storeToRefs(berryStore)

// Error state
const error = ref<string | null>(null)

// Fetch detail saat mounted
onMounted(async () => {
  await berryStore.fetchBerryDetail(berryId)
  if (!selectedBerry.value) {
    error.value = 'Failed to load berry details or berry not found'
  }
})
</script>