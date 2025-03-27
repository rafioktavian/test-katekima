<template>
  <div>
    <TheHeader/>
    <article class="content-box dashboard min-h-screen">
      <div class="container mx-auto">
        <div class="flex lg:flex-row gap-6">
          <SideDashMenu/>
          <main class="w-full lg:w-4/5">
            <section class="transaction bg-white p-6 rounded-lg shadow-md">
              <div class="flex md:flex-row justify-between items-center mb-6">
                <h1 class="text-2xl font-bold mb-6">Product List</h1>
                <el-button
                  type="primary"
                  size="medium"
                  round
                  @click="addProduct()"
                >
                  Tambah Produk
                </el-button>
              </div>
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
                :default-sort="{ prop: 'title', order: 'ascending' }"
                @sort-change="handleSortChange"
              >
                <el-table-column label="No" type="index" width="80" align="center" />
                <el-table-column prop="title" label="Nama" sortable />
                <el-table-column label="Aksi" width="200" align="center">
                  <template #default="scope">
                    <el-button
                      type="primary"
                      size="small"
                      @click="handleEdit(scope.row.id)"
                    >
                      Edit
                    </el-button>
                    <el-button
                      type="danger"
                      size="small"
                      @click="handleDelete(scope.row.id)"
                    >
                      Hapus
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>

              <!-- Pagination -->
              <el-pagination
                class="mt-6"
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 30, 50]"
                layout="total, sizes, prev, pager, next"
                :total="filteredData.length"
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
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

// State
const products = ref<any[]>([])
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const sortOrder = ref<'ascending' | 'descending'>('ascending')

// Router dan Route
const router = useRouter()
const route = useRoute()

// Fetch data dari API
const fetchProducts = async () => {
  try {
    const { data } = await axios.get('https://fakestoreapi.com/products')
    products.value = data
  } catch (error: any) {
    ElMessage.error('Failed to fetch products: ' + (error.response?.data || error.message))
  }
}

// Inisialisasi dari URL params
onMounted(() => {
  fetchProducts()
  // Ambil parameter dari URL jika ada
  if (route.query.search) searchQuery.value = route.query.search as string
  if (route.query.page) currentPage.value = Number(route.query.page)
  if (route.query.size) pageSize.value = Number(route.query.size)
})

// Filter data berdasarkan pencarian
const filteredData = computed(() => {
  if (!searchQuery.value) return products.value
  return products.value.filter(product =>
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Sorting data
const sortedData = computed(() => {
  return [...filteredData.value].sort((a, b) => {
    const order = sortOrder.value === 'ascending' ? 1 : -1
    return a.title.localeCompare(b.title) * order
  })
})

// Pagination data
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return sortedData.value.slice(start, end)
})

// Update URL params
const updateUrlParams = () => {
  const query: any = {}
  if (searchQuery.value) query.search = searchQuery.value
  if (currentPage.value !== 1) query.page = currentPage.value
  if (pageSize.value !== 10) query.size = pageSize.value
  router.push({ query })
}

// Event handlers
const handleSearch = () => {
  currentPage.value = 1 // Reset ke halaman 1 saat pencarian
  updateUrlParams()
}

const handleSortChange = ({ order }: { order: 'ascending' | 'descending' | null }) => {
  sortOrder.value = order === 'ascending' || order === null ? 'ascending' : 'descending'
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  currentPage.value = 1 // Reset ke halaman 1 saat ukuran berubah
  updateUrlParams()
}

const handlePageChange = (val: number) => {
  currentPage.value = val
  updateUrlParams()
}

const handleEdit = (id: number) => {
  router.push(`/edit/${id}`)
}

const addProduct = () => {
  router.push('/add')
}

const handleDelete = (id: number) => {
  ElMessageBox.confirm('Are you sure you want to delete this product?', 'Warning', {
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    type: 'warning'
  }).then(async () => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`)
      ElMessage.success('Product deleted successfully')
      products.value = products.value.filter(p => p.id !== id)
    } catch (error: any) {
      ElMessage.error('Failed to delete product: ' + (error.response?.data || error.message))
    }
  }).catch(() => {
    ElMessage.info('Delete canceled')
  })
}
</script>