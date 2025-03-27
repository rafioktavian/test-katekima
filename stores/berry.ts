import { defineStore } from 'pinia'
import axios from 'axios'

interface Berry {
  id: number;
  name: string;
  url: string;
}

interface BerryDetail {
  id: number;
  name: string;
  growth_time: number;
  max_harvest: number;
  size: number;
  smoothness: number;
  soil_dryness: number;
}

interface BerryState {
  berries: Berry[];
  selectedBerry: BerryDetail | null;
  searchQuery: string;
  currentPage: number;
  pageSize: number;
  sortOrder: 'ascending' | 'descending';
}

export const useBerryStore = defineStore('berry', {
  state: (): BerryState => ({
    berries: [],
    selectedBerry: null,
    searchQuery: '',
    currentPage: 1,
    pageSize: 10,
    sortOrder: 'ascending'
  }),

  actions: {
    async fetchBerries() {
      try {
        const { data } = await axios.get('https://pokeapi.co/api/v2/berry/')
        this.berries = data.results.map((berry: any, index: number) => ({
          id: index + 1,
          name: berry.name,
          url: berry.url
        }))
      } catch (error: any) {
        console.error('Failed to fetch berries:', error.response?.data || error.message)
      }
    },

    async fetchBerryDetail(id: number) {
      try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/berry/${id}`)
        this.selectedBerry = {
          id: data.id,
          name: data.name,
          growth_time: data.growth_time,
          max_harvest: data.max_harvest,
          size: data.size,
          smoothness: data.smoothness,
          soil_dryness: data.soil_dryness
        }
      } catch (error: any) {
        console.error('Failed to fetch berry detail:', error.response?.data || error.message)
        this.selectedBerry = null
      }
    },

    setSearchQuery(query: string) {
      this.searchQuery = query
      this.currentPage = 1
    },

    setPage(page: number) {
      this.currentPage = page
    },

    setPageSize(size: number) {
      this.pageSize = size
      this.currentPage = 1
    },

    setSortOrder(order: 'ascending' | 'descending') {
      this.sortOrder = order
    }
  },

  persist: {
    storage: localStorage,
    paths: ['searchQuery', 'currentPage', 'pageSize', 'sortOrder']
  }
})