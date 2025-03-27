<template>
  <el-form 
    :model="product" 
    ref="productForm" 
    :rules="rules" 
    label-position="top"
    class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
  >
    <el-form-item label="Title" prop="title">
      <el-input 
        v-model="product.title" 
        placeholder="Enter product title"
        class="w-full"
        @input="updateField('title', $event)"
      />
    </el-form-item>

    <el-form-item label="Price" prop="price">
      <el-input
        name="price"
        v-model="product.price"
        placeholder="Masukkan Nominal"
        :formatter="(value: string | number) => {
          if (!value) return '';
          return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }"
        :parser="(value: string) => {
          return value.replace(/[Rp\s\.]/g, '');
        }"
        @keypress="isNumber($event)"
        @change="updateField('price', $event)"
      />
    </el-form-item>

    <el-form-item label="Description" prop="description">
      <el-input 
        v-model="product.description" 
        type="textarea" 
        :rows="4"
        placeholder="Enter product description"
        class="w-full"
        @input="updateField('description', $event)"
      />
    </el-form-item>

    <el-form-item label="Category" prop="category">
      <el-input 
        v-model="product.category" 
        placeholder="Enter product category"
        class="w-full"
        @input="updateField('category', $event)"
      />
    </el-form-item>

    <el-form-item label="Image URL" prop="image">
      <el-input 
        v-model="product.image" 
        placeholder="Enter image URL (http://example.com)"
        class="w-full"
        @input="updateField('image', $event)"
      />
      <div v-if="product.image" class="mt-2">
        <img 
          :src="product.image" 
          alt="Preview" 
          class="max-w-xs rounded-md"
          @error="handleImageError"
        />
      </div>
    </el-form-item>

    <el-form-item>
      <el-button 
        v-if="!isEditMode"
        type="primary" 
        @click="submitForm" 
        :loading="isSubmitting"
        class="bg-blue-500 hover:bg-blue-600"
      >
        Submit
      </el-button>
      <el-button 
        v-else
        type="primary" 
        @click="updateForm"
        :loading="isSubmitting"
        class="bg-green-500 hover:bg-green-600"
      >
        Update
      </el-button>
      <el-button 
        @click="resetForm"
        :disabled="isSubmitting"
      >
        Reset
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useProductStore } from '~/stores/product'
import type { FormInstance, FormRules } from 'element-plus'

// Props untuk menentukan mode edit
const props = defineProps<{
  isEditMode?: boolean;
  productId?: number;
}>()

// Pinia store
const productStore = useProductStore()
const { product } = storeToRefs(productStore)

const router = useRouter()

// Form reference dengan type
const productForm = ref<FormInstance | null>(null)
const isSubmitting = ref(false)
const errorMessage = ref<string | null>(null)

// Validation rules dengan type
const rules = ref<FormRules>({
  title: [
    { required: true, message: 'Please enter product title', trigger: 'blur' }
  ],
  price: [
    { required: true, message: 'Please enter price', trigger: 'blur' },
  ],
  description: [
    { required: true, message: 'Please enter description', trigger: 'blur' }
  ],
  category: [
    { required: true, message: 'Please enter category', trigger: 'blur' }
  ],
  image: [
    { required: true, message: 'Please enter image URL', trigger: 'blur' },
    { type: 'url', message: 'Please enter a valid URL', trigger: 'blur' }
  ]
})

function isNumber(evt: KeyboardEvent) {
  evt = evt || (window.event as KeyboardEvent);
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (
    charCode > 31 &&
    (charCode < 48 || charCode > 57) &&
    charCode !== 46
  ) {
    evt.preventDefault();
  } else {
    return true;
  }
}

// Update field in store
const updateField = (field: keyof typeof product.value, value: any): void => {
  productStore.updateProduct({ [field]: value })
}

// Submit handler (POST)
const submitForm = async (): Promise<void> => {
  if (!productForm.value) return;

  productForm.value.validate(async (valid: boolean) => {
    if (valid) {
      isSubmitting.value = true
      errorMessage.value = null
      try {
        const success = await productStore.submitForm()
        if (success) {
          ElMessage.success('Product submitted successfully')
          router.push('/')
        } else {
          ElMessage.error('Failed to submit product')
        }
      } catch (error: any) {
        const errorData = error.response?.data || error.message
        errorMessage.value = errorData
        ElMessage.error(`Failed to submit product: ${errorData}`)
      } finally {
        isSubmitting.value = false
      }
    } else {
      ElMessage.error('Please fill all required fields correctly')
    }
  })
}

// Update handler (PUT)
const updateForm = async (): Promise<void> => {
  if (!productForm.value || !props.productId) return;

  productForm.value.validate(async (valid: boolean) => {
    if (valid) {
      isSubmitting.value = true
      errorMessage.value = null
      try {
        const success = await productStore.updateProductApi(props.productId!)
        if (success) {
          ElMessage.success('Product updated successfully')
          router.push('/')
        } else {
          ElMessage.error('Failed to update product')
        }
      } catch (error: any) {
        const errorData = error.response?.data || error.message
        errorMessage.value = errorData
        ElMessage.error(`Failed to update product: ${errorData}`)
      } finally {
        isSubmitting.value = false
      }
    } else {
      ElMessage.error('Please fill all required fields correctly')
    }
  })
}

// Reset form
const resetForm = (): void => {
  productStore.resetForm()
  productForm.value?.resetFields()
  errorMessage.value = null
}

// Image error handler
const handleImageError = (): void => {
  ElMessage.error('Failed to load image preview')
}
</script>