<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { useTicketsStore } from './stores/tickets'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'

const authStore = useAuthStore()
const ticketsStore = useTicketsStore()

onMounted(() => {
  authStore.checkAuth()
  ticketsStore.loadTickets()
})
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <Navbar />
    <main>
      <RouterView />
    </main>
    <Footer />
    <Toaster position="top-right" rich-colors />
  </div>
</template>
