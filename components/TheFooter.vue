<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-1">
      <!-- Konten Anda di sini -->
    </main>
    
    <footer class="bg-black text-white">
      <hr class="border-gray-700" />
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap">
          <!-- Logo dan Deskripsi -->
          <div id="footer-cleanlab-logo" class="w-full md:w-1/2 lg:w-1/3 mb-6">
            <a class="block mb-4" href="/">
              <img src="/img/pictures/logo-white.svg" alt="logo-footer" class="w-32 h-auto">
            </a>
            <p class="text-white">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
          
          <!-- Spacer -->
          <div class="hidden lg:block lg:w-1/3"></div>
          
          <!-- Hubungi Kami -->
          <div id="footer-cleanlab-info" class="w-full md:w-1/2 lg:w-1/3 pb-6">
            <h4 class="text-lg font-semibold mb-5 text-white">Hubungi Kami</h4>
            <ul class="space-y-3">
              <li>
                <a class="flex items-center text-gray-300 hover:text-purple-400" href="mailto:hi@katekima.id">
                  <img src="/img/icons/ic-mail.svg" class="mr-2" />
                  <span>hi@katekima.id</span>
                </a>
              </li>
              <li>
                <a class="flex items-center text-gray-300 hover:text-purple-400" href="https://wa.me/6289614300254">
                  <img src="/img/icons/ic-whatsapp.svg" class="mr-2" />
                  <span>+62 896-14300-254</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr class="border-gray-700 mt-8" />
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from 'vue';  

export default defineComponent({
  name: 'footerComponent',
  async setup() {
    const config = useRuntimeConfig();
    const router = useRouter();
    const footers = ref([]);
    const socmed = ref([
      {
        footer_icons_link: "/",
        footer_icons_image: "/img/icons/ic-facebook.svg", 
        footer_icons_alt: "facebook"   
      },
      {
        footer_icons_link: "/",
        footer_icons_image: "/img/icons/ic-twitter.svg", 
        footer_icons_alt: "twitter"   
      },
      {
        footer_icons_link: "/",
        footer_icons_image: "/img/icons/ic-linkedin.svg", 
        footer_icons_alt: "linkedin"   
      },
      {
        footer_icons_link: "/",
        footer_icons_image: "/img/icons/ic-instagram.svg", 
        footer_icons_alt: "instagram"   
      },
    ]);
    const menus = ref([]);
    const baseURL = config.public.apiBase;
    onMounted(() => {
    });
    return {
      footers,
      socmed,
      menus,
      baseURL,
      config
    }; 
  },
});
</script>

<style scoped>
/* Anda bisa menambahkan custom styling di sini jika diperlukan */
</style>