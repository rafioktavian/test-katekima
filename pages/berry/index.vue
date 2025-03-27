<!-- pages/index.vue -->
<template>
  <div>
    <TheHeader/>
    <article class="content-box dashboard min-h-screen">
      <div class="container mx-auto">
        <div class="flex lg:flex-row gap-6">
          <SideDashMenu/>
          <main class="w-full lg:w-4/5">
            <section class="transaction bg-white p-6 rounded-lg shadow-md">
              <h1 class="text-2xl font-bold mb-6">Berry List</h1>

              <!-- Pencarian -->
              <el-input
                v-model="searchQuery"
                placeholder="Search by name..."
                class="mb-6 w-1/3"
                clearable
                @input="handleSearch"
              />

              <!-- Tabel -->
              <el-table
                :data="paginatedData"
                style="width: 100%"
                :default-sort="{ prop: 'name', order: 'ascending' }"
                class="shadow-md rounded-lg"
                @sort-change="handleSortChange"
              >
                <el-table-column label="No" type="index" width="80" align="center" />
                <el-table-column prop="name" label="Nama" sortable />
                <el-table-column label="Aksi" width="150" align="center">
                  <template #default="scope">
                    <el-button
                      type="primary"
                      size="small"
                      @click="handleDetail(scope.row.id)"
                    >
                      Detail
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>

              <!-- Pagination -->
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 30, 50]"
                layout="total, sizes, prev, pager, next"
                :total="filteredData.length"
                class="mt-6 flex justify-end"
                @size-change="handleSizeChange"
                @current-change="handlePageChange"
              />
            </section>
          </main>
        </div>
      </div>
    </article>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBerryStore } from '~/stores/berry'
import { storeToRefs } from 'pinia'

const router = useRouter()
const route = useRoute()
const berryStore = useBerryStore()
const { berries, searchQuery, currentPage, pageSize, sortOrder } = storeToRefs(berryStore)

// Fetch data saat mounted
onMounted(() => {
  if (berries.value.length === 0) {
    berryStore.fetchBerries()
  }
  // Inisialisasi dari URL params
  if (route.query.search) searchQuery.value = route.query.search as string
  if (route.query.page) currentPage.value = Number(route.query.page)
  if (route.query.size) pageSize.value = Number(route.query.size)
})

// Filter data berdasarkan pencarian
const filteredData = computed(() => {
  if (!searchQuery.value) return berries.value
  return berries.value.filter(berry =>
    berry.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Sorting data
const sortedData = computed(() => {
  return [...filteredData.value].sort((a, b) => {
    const order = sortOrder.value === 'ascending' ? 1 : -1
    return a.name.localeCompare(b.name) * order
  })
})

// Pagination data
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return sortedData.value.slice(start, end)
})

// Fungsi untuk update URL params
const updateUrlParams = () => {
  const query: any = {}
  if (searchQuery.value) query.search = searchQuery.value
  if (currentPage.value !== 1) query.page = currentPage.value
  if (pageSize.value !== 10) query.size = pageSize.value
  router.push({ query })
}

// Event handlers
const handleSearch = (value: string) => {
  berryStore.setSearchQuery(value)
  updateUrlParams()
}

const handleSortChange = ({ order }: { order: 'ascending' | 'descending' | null }) => {
  berryStore.setSortOrder(order === 'ascending' || order === null ? 'ascending' : 'descending')
}

const handleSizeChange = (val: number) => {
  berryStore.setPageSize(val)
  updateUrlParams()
}

const handlePageChange = (val: number) => {
  berryStore.setPage(val)
  updateUrlParams()
}

const handleDetail = (id: number) => {
  router.push(`/berry/${id}`)
}
</script>