<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Ticket, TrendingUp, Settings, BarChart3 } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useTicketsStore } from '@/stores/tickets'

const router = useRouter()
const authStore = useAuthStore()
const ticketsStore = useTicketsStore()

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/auth?mode=login')
  }
  ticketsStore.loadTickets()
})

const stats = computed(() => ticketsStore.getTicketStats())

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)} hours ago`
  } else {
    return `${Math.floor(diffInMinutes / 1440)} days ago`
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open': return 'bg-red-400'
    case 'in_progress': return 'bg-yellow-400'
    case 'closed': return 'bg-green-400'
    default: return 'bg-gray-400'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'open': return 'New ticket'
    case 'in_progress': return 'Ticket updated'
    case 'closed': return 'Ticket resolved'
    default: return 'Ticket updated'
  }
}
</script>

<template>
  <div v-if="authStore.isLoading" class="min-h-screen bg-[#232323] flex items-center justify-center">
    <div class="text-white font-mono text-xl">Loading...</div>
  </div>

  <div v-else-if="!authStore.isAuthenticated" class="min-h-screen bg-[#232323] flex items-center justify-center">
    <div class="text-white font-mono text-xl">Please log in to access the dashboard</div>
  </div>

  <div v-else class="min-h-screen bg-[#232323]">
    <main class="max-w-[1440px] mx-auto px-4 py-8">
      <div class="mb-8">
        <h2 class="text-xl font-bold text-white font-mono mb-4">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RouterLink to="/dashboard/tickets" class="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
            <div class="flex items-center space-x-3">
              <Ticket class="h-6 w-6 text-blue-400" />
              <div>
                <h3 class="text-white font-mono font-semibold">Ticket Management</h3>
                <p class="text-gray-400 font-mono text-sm">Create and manage support tickets</p>
              </div>
            </div>
          </RouterLink>

          <RouterLink to="/dashboard/tickets" class="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
            <div class="flex items-center space-x-3">
              <Settings class="h-6 w-6 text-green-400" />
              <div>
                <h3 class="text-white font-mono font-semibold">Team Management</h3>
                <p class="text-gray-400 font-mono text-sm">Assign tickets to team members</p>
              </div>
            </div>
          </RouterLink>

          <RouterLink to="/analytics" class="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
            <div class="flex items-center space-x-3">
              <BarChart3 class="h-6 w-6 text-purple-400" />
              <div>
                <h3 class="text-white font-mono font-semibold">Support Analytics</h3>
                <p class="text-gray-400 font-mono text-sm">Track performance and trends</p>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-xl font-bold text-white font-mono mb-4">Ticket Statistics</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white/5 rounded-lg p-6 border border-white/10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 font-mono text-sm">Total Tickets</p>
                <p class="text-3xl font-bold text-white font-mono">{{ stats.total }}</p>
                <p class="text-gray-400 font-mono text-xs mt-1">All time</p>
              </div>
              <Ticket class="h-8 w-8 text-blue-400" />
            </div>
          </div>

          <div class="bg-white/5 rounded-lg p-6 border border-white/10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 font-mono text-sm">Open Tickets</p>
                <p class="text-3xl font-bold text-white font-mono">{{ stats.open }}</p>
                <p class="text-gray-400 font-mono text-xs mt-1">Pending resolution</p>
              </div>
              <Settings class="h-8 w-8 text-orange-400" />
            </div>
          </div>

          <div class="bg-white/5 rounded-lg p-6 border border-white/10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 font-mono text-sm">Resolved Tickets</p>
                <p class="text-3xl font-bold text-white font-mono">{{ stats.closed }}</p>
                <p class="text-gray-400 font-mono text-xs mt-1">Successfully closed</p>
              </div>
              <TrendingUp class="h-8 w-8 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Ticket Activity -->
      <div class="bg-white/5 rounded-lg p-6 border border-white/10">
        <h3 class="text-lg font-bold text-white font-mono mb-4">Recent Ticket Activity</h3>

        <div class="space-y-3">
          <div
            v-for="ticket in ticketsStore.tickets
              .sort((a: any, b: any) => new Date(b.updatedAt || b.createdAt || '').getTime() - new Date(a.updatedAt || a.createdAt || '').getTime())
              .slice(0, 4)"
            :key="ticket.id"
            class="flex items-center justify-between p-3 bg-white/5 rounded-lg"
          >
            <div class="flex items-center space-x-3">
              <div :class="`w-2 h-2 rounded-full ${getStatusColor(ticket.status)}`"></div>
              <span class="text-white font-mono text-sm">
                {{ getStatusText(ticket.status) }} #{{ ticket.id }} - "{{ ticket.title }}"
              </span>
            </div>
            <span class="text-gray-400 font-mono text-xs">
              {{ formatTimeAgo(ticket.updatedAt || ticket.createdAt || '') }}
            </span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
