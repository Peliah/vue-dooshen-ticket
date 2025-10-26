<script setup lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next'
import { useTicketsStore } from '@/stores/tickets'
import { createTicketSchema, TicketStatus, TicketPriority, type CreateTicket } from '@/types/ticket'

const emit = defineEmits<{
  close: []
}>()

const ticketsStore = useTicketsStore()

const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

const formData = ref<CreateTicket>({
  title: '',
  description: '',
  status: 'open',
  priority: undefined,
  assignee: ''
})

const validateForm = () => {
  try {
    createTicketSchema.parse(formData.value)
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
    ticketsStore.createTicket(formData.value)
    formData.value = {
      title: '',
      description: '',
      status: 'open',
      priority: undefined,
      assignee: ''
    }
    emit('close')
  } catch (error) {
    console.error('Failed to create ticket:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-[#232323] rounded-lg p-6 w-full max-w-md mx-4">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-white font-mono">Create New Ticket</h2>
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
            class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 resize-none font-mono"
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
            <option value="">Select status</option>
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
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {{ isSubmitting ? 'Creating...' : 'Create Ticket' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
