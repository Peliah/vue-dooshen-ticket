<script setup lang="ts">
import { Edit, Trash2, Calendar, User, Clock } from 'lucide-vue-next'
import type { Ticket } from '@/types/ticket'

defineProps<{
  ticket: Ticket
}>()

defineEmits<{
  edit: [ticket: Ticket]
  delete: [ticket: Ticket]
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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
    <!-- Header -->
    <div class="flex items-start justify-between mb-3">
      <div class="flex-1">
        <h3 class="text-white font-mono font-semibold text-sm mb-1">
          #{{ ticket.id }} - {{ ticket.title }}
        </h3>
        <div class="flex items-center space-x-2">
          <span :class="`px-2 py-1 rounded-full text-xs font-mono text-white ${getStatusColor(ticket.status)}`">
            {{ ticket.status.replace('_', ' ').toUpperCase() }}
          </span>
          <span v-if="ticket.priority" :class="`px-2 py-1 rounded-full text-xs font-mono text-white ${getPriorityColor(ticket.priority)}`">
            {{ ticket.priority.toUpperCase() }}
          </span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center space-x-2">
        <button
          @click="$emit('edit', ticket)"
          class="p-1 text-gray-400 hover:text-blue-400 transition-colors"
          title="Edit ticket"
        >
          <Edit class="h-4 w-4" />
        </button>
        <button
          @click="$emit('delete', ticket)"
          class="p-1 text-gray-400 hover:text-red-400 transition-colors"
          title="Delete ticket"
        >
          <Trash2 class="h-4 w-4" />
        </button>
      </div>
    </div>

    <!-- Description -->
    <p v-if="ticket.description" class="text-gray-300 font-mono text-xs mb-3 line-clamp-2">
      {{ ticket.description }}
    </p>

    <!-- Footer -->
    <div class="flex items-center justify-between text-xs text-gray-400 font-mono">
      <div class="flex items-center space-x-4">
        <div v-if="ticket.assignee" class="flex items-center space-x-1">
          <User class="h-3 w-3" />
          <span>{{ ticket.assignee }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <Calendar class="h-3 w-3" />
          <span>{{ formatDate(ticket.createdAt || '') }}</span>
        </div>
      </div>

      <div v-if="ticket.updatedAt && ticket.updatedAt !== ticket.createdAt" class="flex items-center space-x-1">
        <Clock class="h-3 w-3" />
        <span>Updated {{ formatDate(ticket.updatedAt) }}</span>
      </div>
    </div>
  </div>
</template>
