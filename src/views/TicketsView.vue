<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, Filter, Search } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useTicketsStore } from '@/stores/tickets'
import TicketCard from '@/components/tickets/TicketCard.vue'
import CreateTicketForm from '@/components/tickets/CreateTicketForm.vue'
import EditTicketForm from '@/components/tickets/EditTicketForm.vue'
import DeleteTicketModal from '@/components/tickets/DeleteTicketModal.vue'
import type { Ticket } from '@/types/ticket'

const router = useRouter()
const authStore = useAuthStore()
const ticketsStore = useTicketsStore()

const showCreateForm = ref(false)
const editingTicket = ref<Ticket | null>(null)
const deletingTicket = ref<Ticket | null>(null)
const searchTerm = ref('')
const statusFilter = ref('all')

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/auth?mode=login')
  }
  ticketsStore.loadTickets()
})

// Filter and search tickets
const filteredTickets = computed(() => {
  return ticketsStore.tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      ticket.description?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      ticket.assignee?.toLowerCase().includes(searchTerm.value.toLowerCase())

    const matchesStatus = statusFilter.value === 'all' || ticket.status === statusFilter.value

    return matchesSearch && matchesStatus
  })
})

const stats = computed(() => ticketsStore.getTicketStats())

const handleDeleteConfirm = () => {
  if (deletingTicket.value?.id) {
    ticketsStore.deleteTicket(deletingTicket.value.id)
    deletingTicket.value = null
  }
}
</script>

<template>
  <div v-if="authStore.isLoading" class="min-h-screen bg-[#232323] flex items-center justify-center">
    <div class="text-white font-mono text-xl">Loading tickets...</div>
  </div>

  <div v-else-if="!authStore.isAuthenticated" class="min-h-screen bg-[#232323] flex items-center justify-center">
    <div class="text-white font-mono text-xl">Please log in to access tickets</div>
  </div>

  <div v-else class="min-h-screen bg-[#232323]">
    <!-- Header -->
    <div class="bg-[#232323] border-b border-white/10">
      <div class="max-w-[1440px] mx-auto px-4 py-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-3xl font-bold text-white font-mono">Ticket Management</h1>
            <p class="text-gray-400 font-mono text-sm mt-1">
              Manage and track all support tickets
            </p>
          </div>
          <button
            @click="showCreateForm = true"
            class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus class="h-4 w-4" />
            <span>Create Ticket</span>
          </button>
        </div>

        <!-- Statistics -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-white/5 rounded-lg p-4 border border-white/10">
            <div class="text-2xl font-bold text-white font-mono">{{ stats.total }}</div>
            <div class="text-gray-400 font-mono text-sm">Total Tickets</div>
          </div>
          <div class="bg-white/5 rounded-lg p-4 border border-white/10">
            <div class="text-2xl font-bold text-red-400 font-mono">{{ stats.open }}</div>
            <div class="text-gray-400 font-mono text-sm">Open</div>
          </div>
          <div class="bg-white/5 rounded-lg p-4 border border-white/10">
            <div class="text-2xl font-bold text-yellow-400 font-mono">{{ stats.inProgress }}</div>
            <div class="text-gray-400 font-mono text-sm">In Progress</div>
          </div>
          <div class="bg-white/5 rounded-lg p-4 border border-white/10">
            <div class="text-2xl font-bold text-green-400 font-mono">{{ stats.closed }}</div>
            <div class="text-gray-400 font-mono text-sm">Closed</div>
          </div>
        </div>

        <!-- Search and Filter -->
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1 relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search tickets by title, description, or assignee..."
              class="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div class="flex items-center space-x-2">
            <Filter class="h-4 w-4 text-gray-400" />
            <select
              v-model="statusFilter"
              class="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-blue-400"
            >
              <option value="all" class="bg-[#232323]">All Status</option>
              <option value="open" class="bg-[#232323]">Open</option>
              <option value="in_progress" class="bg-[#232323]">In Progress</option>
              <option value="closed" class="bg-[#232323]">Closed</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="max-w-[1440px] mx-auto px-4 py-8">
      <!-- Tickets Grid -->
      <div v-if="filteredTickets.length === 0" class="text-center py-12">
        <div class="text-gray-400 font-mono text-lg mb-2">
          {{ searchTerm || statusFilter !== 'all'
            ? 'No tickets match your search criteria'
            : 'No tickets found'
          }}
        </div>
        <p class="text-gray-500 font-mono text-sm">
          {{ searchTerm || statusFilter !== 'all'
            ? 'Try adjusting your search or filter'
            : 'Create your first ticket to get started'
          }}
        </p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TicketCard
          v-for="ticket in filteredTickets"
          :key="ticket.id"
          :ticket="ticket"
          @edit="editingTicket = $event"
          @delete="deletingTicket = $event"
        />
      </div>
    </main>

    <!-- Modals -->
    <CreateTicketForm v-if="showCreateForm" @close="showCreateForm = false" />

    <EditTicketForm
      v-if="editingTicket"
      :ticket="editingTicket"
      @close="editingTicket = null"
    />

    <DeleteTicketModal
      v-if="deletingTicket"
      :ticket="deletingTicket"
      @confirm="handleDeleteConfirm"
      @cancel="deletingTicket = null"
    />
  </div>
</template>
