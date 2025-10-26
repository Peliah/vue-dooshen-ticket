<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff, UserPlus } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useAuthStore } from '@/stores/auth'
import { registerSchema, type RegisterFormData } from '@/types/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const emit = defineEmits<{
  'switch-to-login': []
}>()

const router = useRouter()
const authStore = useAuthStore()

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

const onSubmit = handleSubmit(async (values: RegisterFormData) => {
  isLoading.value = true
  
  try {
    const result = await authStore.handleRegister(values.name, values.email, values.password)
    
    if (result.success) {
      router.push('/dashboard')
    }
  } catch (error) {
    console.error('Register error:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-[#232323] flex items-center justify-center p-4">
    <Card class="w-full max-w-sm bg-transparent border-none">
      <CardHeader class="text-center">
        <div class="flex items-center justify-center mb-4">
          <UserPlus class="h-8 w-8 text-white" />
        </div>
        <CardTitle class="text-2xl font-bold text-white font-mono">Join DST</CardTitle>
        <CardDescription class="text-gray-400 font-mono">Create your account</CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="onSubmit" class="space-y-4">
          <div class="space-y-2">
            <Input
              id="name"
              v-model="name"
              v-bind="nameAttrs"
              type="text"
              placeholder="Full name"
              class="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-blue-500 font-mono"
            />
            <p v-if="errors.name" class="text-red-400 text-xs font-mono">{{ errors.name }}</p>
          </div>

          <div class="space-y-2">
            <Input
              id="email"
              v-model="email"
              v-bind="emailAttrs"
              type="email"
              placeholder="Email address"
              class="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-blue-500 font-mono"
            />
            <p v-if="errors.email" class="text-red-400 text-xs font-mono">{{ errors.email }}</p>
          </div>

          <div class="space-y-2">
            <div class="relative">
              <Input
                id="password"
                v-model="password"
                v-bind="passwordAttrs"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Password"
                class="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-blue-500 pr-10 font-mono"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <EyeOff v-if="showPassword" class="h-4 w-4" />
                <Eye v-else class="h-4 w-4" />
              </button>
            </div>
            <p v-if="errors.password" class="text-red-400 text-xs font-mono">{{ errors.password }}</p>
          </div>

          <div class="space-y-2">
            <div class="relative">
              <Input
                id="confirmPassword"
                v-model="confirmPassword"
                v-bind="confirmPasswordAttrs"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirm password"
                class="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-blue-500 pr-10 font-mono"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <EyeOff v-if="showConfirmPassword" class="h-4 w-4" />
                <Eye v-else class="h-4 w-4" />
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="text-red-400 text-xs font-mono">{{ errors.confirmPassword }}</p>
          </div>

          <Button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-white text-[#232323] hover:bg-gray-100 font-mono"
          >
            {{ isLoading ? 'Creating Account...' : 'Create Account' }}
          </Button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-400 font-mono text-sm">
            Already have an account?
            <button
              @click="emit('switch-to-login')"
              class="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
