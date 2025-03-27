import { defineStore } from 'pinia'
import axios from 'axios'

// Definisikan interface untuk tipe data product
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// Definisikan interface untuk response dari API
interface ProductResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// Definisikan interface untuk state
interface ProductState {
  product: Product;
  lastSubmittedProduct: ProductResponse | null;
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    product: {
      id: 0,
      title: '',
      price: 0,
      description: '',
      category: '',
      image: 'https://picsum.photos/200/200'
    },
    lastSubmittedProduct: null
  }),
  
  actions: {
    // Update product dengan partial update
    updateProduct(payload: Partial<Product>): void {
      this.product = { ...this.product, ...payload };
    },
    
    // Reset form ke nilai awal
    resetForm(): void {
      this.product = {
        id: 0,
        title: '',
        price: 0,
        description: '',
        category: '',
        image: 'https://picsum.photos/200/200'
      };
    },
    
    // Submit form ke API FakeStoreAPI menggunakan Axios
    async submitForm(): Promise<boolean> {
      try {
        const { data } = await axios.post<ProductResponse>(
          'https://fakestoreapi.com/products',
          this.product,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        // Simpan response dari API
        this.lastSubmittedProduct = data;
        console.log('API Response:', data);
        return true;
      } catch (error: any) {
        console.error('Submit failed:', error.response?.data || error.message);
        return false;
      }
    },

    // Update product ke API FakeStoreAPI (PUT)
    async updateProductApi(id: number): Promise<boolean> {
      try {
        const { data } = await axios.put<ProductResponse>(
          `https://fakestoreapi.com/products/${id}`,
          this.product,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        this.lastSubmittedProduct = data;
        console.log('API Response (PUT):', data);
        return true;
      } catch (error: any) {
        console.error('Update failed:', error.response?.data || error.message);
        return false;
      }
    },

    // Getter untuk mendapatkan last submitted product
    getLastSubmitted(): ProductResponse | null {
      return this.lastSubmittedProduct;
    },
    // Set product data untuk edit
    setProductForEdit(productData: Product): void {
      this.product = { ...productData };
    }
  }
});