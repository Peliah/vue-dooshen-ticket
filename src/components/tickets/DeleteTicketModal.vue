<script setup lang="ts">
import { Trash2, AlertTriangle } from 'lucide-vue-next'
import type { Ticket } from '@/types/ticket'

defineProps<{
  ticket: Ticket
}>()

defineEmits<{
  confirm: []
  cancel: []
}>()

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open': return 'bg-red-500'
    case 'in_progress': return 'bg-yellow-500'
    case 'closed': return 'bg-green-500'
    default: return 'bg-gray-500'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'low': return 'bg-blue-500'
    case 'medium': return 'bg-yellow-500'
    case 'high': return 'bg-orange-500'
    case 'urgent': return 'bg-red-500'
    default: return 'bg-gray-500'
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-[#232323] rounded-lg p-6 w-full max-w-md mx-4">
      <div class="flex items-center space-x-3 mb-4">
        <div class="p-2 bg-red-500/20 rounded-full">
          <AlertTriangle class="h-6 w-6 text-red-400" />
        </div>
        <h2 class="text-xl font-bold text-white font-mono">Delete Ticket</h2>
      </div>

      <div class="mb-6">
        <p class="text-gray-300 font-mono text-sm mb-4">
          Are you sure you want to delete this ticket? This action cannot be undone.
        </p>

        <!-- Ticket Preview -->
        <div class="bg-white/5 rounded-lg p-4 border border-white/10">
          <div class="flex items-start justify-between mb-2">
            <h3 class="text-white font-mono font-semibold text-sm">
              #{{ ticket.id }} - {{ ticket.title }}
            </h3>
            <span :class="`px-2 py-1 rounded-full text-xs font-mono text-white ${getStatusColor(ticket.status)}`">
              {{ ticket.status.replace('_', ' ').toUpperCase() }}
            </span>
          </div>

          <p v-if="ticket.description" class="text-gray-400 font-mono text-xs mb-2 line-clamp-2">
            {{ ticket.description }}
          </p>

          <div class="flex items-center space-x-4 text-xs">
            <div v-if="ticket.priority" class="flex items-center space-x-1">
              <span class="text-gray-400 font-mono">Priority:</span>
              <span :class="`px-2 py-1 rounded-full text-xs font-mono text-white ${getPriorityColor(ticket.priority)}`">
                {{ ticket.priority.toUpperCase() }}
              </span>
            </div>
            <div v-if="ticket.assignee" class="flex items-center space-x-1">
              <span class="text-gray-400 font-mono">Assignee:</span>
              <span class="text-white font-mono">{{ ticket.assignee }}</span>
            </div>
          </div>

          <div class="mt-2 text-xs text-gray-400 font-mono">
            Created: {{ new Date(ticket.createdAt || '').toLocaleDateString() }}
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-3">
        <button
          @click="$emit('cancel')"
          class="flex-1 px-4 py-2 border border-white/20 text-white rounded-md hover:bg-white/10 transition-colors"
        >
          Cancel
        </button>
        <button
          @click="$emit('confirm')"
          class="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Trash2 class="h-4 w-4" />
          <span>Delete Ticket</span>
        </button>
      </div>
    </div>
  </div>
</template>
