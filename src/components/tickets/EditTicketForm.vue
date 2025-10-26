<script setup lang="ts">
import { ref } from 'vue'
import { X, Save } from 'lucide-vue-next'
import { useTicketsStore } from '@/stores/tickets'
import { updateTicketSchema, TicketStatus, TicketPriority, type UpdateTicket, type Ticket } from '@/types/ticket'

const props = defineProps<{
  ticket: Ticket
}>()

const emit = defineEmits<{
  close: []
}>()

const ticketsStore = useTicketsStore()

const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

const formData = ref<UpdateTicket>({
  id: props.ticket.id ?? '',
  title: props.ticket.title,
  description: props.ticket.description || '',
  status: props.ticket.status,
  priority: props.ticket.priority,
  assignee: props.ticket.assignee || ''
})

const validateForm = () => {
  try {
    updateTicketSchema.parse(formData.value)
    errors.value = {}
    return true
  } catch (error: any) {
    const newErrors: Record<string, string> = {}
    error.errors?.forEach((err: any) => {
      if (err.path) {
        newErrors[err.path[0]] = err.message
      }
    })
    errors.value = newErrors
    return false
  }
}

const onSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  try {
    if (!props.ticket.id) {
      console.error('Invalid ticket ID')
      return
    }
    ticketsStore.updateTicket(props.ticket.id, formData.value)
    emit('close')
  } catch (error) {
    console.error('Failed to update ticket:', error)
  } finally {
    isSubmitting.value = false
  }
}

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
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-white font-mono">Edit Ticket #{{ ticket.id }}</h2>
        <button
          @click="emit('close')"
          class="text-gray-400 hover:text-white transition-colors"
        >
          <X class="h-5 w-5" />
        </button>
      </div>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <!-- Title -->
        <div>
          <label class="block text-white font-mono text-sm mb-2">
            Title *
          </label>
          <input
            v-model="formData.title"
            type="text"
            class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 font-mono"
            placeholder="Enter ticket title"
          />
          <p v-if="errors.title" class="text-red-400 text-xs mt-1 font-mono">
            {{ errors.title }}
          </p>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-white font-mono text-sm mb-2">
            Description
          </label>
          <textarea
            v-model="formData.description"
            rows="3"
            class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 resize-none"
            placeholder="Enter ticket description"
          />
          <p v-if="errors.description" class="text-red-400 text-xs mt-1 font-mono">
            {{ errors.description }}
          </p>
        </div>

        <!-- Status -->
        <div>
          <label class="block text-white font-mono text-sm mb-2">
            Status *
          </label>
          <select
            v-model="formData.status"
            class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-blue-400 font-mono"
          >
            <option v-for="status in Object.values(TicketStatus)" :key="status" :value="status" class="bg-[#232323]">
              {{ status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ') }}
            </option>
          </select>
          <p v-if="errors.status" class="text-red-400 text-xs mt-1 font-mono">
            {{ errors.status }}
          </p>
        </div>

        <!-- Priority -->
        <div>
          <label class="block text-white font-mono text-sm mb-2">
            Priority
          </label>
          <select
            v-model="formData.priority"
            class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-blue-400 font-mono"
          >
            <option value="">Select priority</option>
            <option v-for="priority in Object.values(TicketPriority)" :key="priority" :value="priority" class="bg-[#232323]">
              {{ priority.charAt(0).toUpperCase() + priority.slice(1) }}
            </option>
          </select>
          <p v-if="errors.priority" class="text-red-400 text-xs mt-1 font-mono">
            {{ errors.priority }}
          </p>
        </div>

        <!-- Assignee -->
        <div>
          <label class="block text-white font-mono text-sm mb-2">
            Assignee
          </label>
          <input
            v-model="formData.assignee"
            type="text"
            class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 font-mono"
            placeholder="Enter assignee name"
          />
          <p v-if="errors.assignee" class="text-red-400 text-xs mt-1 font-mono">
            {{ errors.assignee }}
          </p>
        </div>

        <!-- Current Status Display -->
        <div class="flex items-center space-x-4 pt-2">
          <div class="flex items-center space-x-2">
            <span class="text-gray-400 font-mono text-sm">Current Status:</span>
            <span :class="`px-2 py-1 rounded-full text-xs font-mono text-white ${getStatusColor(ticket.status)}`">
              {{ ticket.status.replace('_', ' ').toUpperCase() }}
            </span>
          </div>
          <div v-if="ticket.priority" class="flex items-center space-x-2">
            <span class="text-gray-400 font-mono text-sm">Priority:</span>
            <span :class="`px-2 py-1 rounded-full text-xs font-mono text-white ${getPriorityColor(ticket.priority)}`">
              {{ ticket.priority.toUpperCase() }}
            </span>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex space-x-3 pt-4">
          <button
            type="button"
            @click="emit('close')"
            class="flex-1 px-4 py-2 border border-white/20 text-white rounded-md hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <Save class="h-4 w-4" />
            <span>{{ isSubmitting ? 'Saving...' : 'Save Changes' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
