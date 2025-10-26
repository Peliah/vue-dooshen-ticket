<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff, LogIn } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useAuthStore } from '@/stores/auth'
import { loginSchema, type LoginFormData } from '@/types/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const emit = defineEmits<{
  'switch-to-register': []
}>()

const router = useRouter()
const authStore = useAuthStore()

const showPassword = ref(false)
const isLoading = ref(false)

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    email: '',
    password: ''
  }
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values: LoginFormData) => {
  isLoading.value = true
  
  try {
    const result = await authStore.handleLogin(values.email, values.password)
    
    if (result.success) {
      router.push('/dashboard')
    }
  } catch (error) {
    console.error('Login error:', error)
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
          <LogIn class="h-8 w-8 text-white" />
        </div>
        <CardTitle class="text-2xl font-bold text-white font-mono">Welcome Back</CardTitle>
        <CardDescription class="text-gray-400 font-mono">Sign in to your account</CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="onSubmit" class="space-y-4">
          <!-- Email Field -->
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

          <Button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-white text-[#232323] hover:bg-gray-100 font-mono"
          >
            {{ isLoading ? 'Signing In...' : 'Sign In' }}
          </Button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-400 font-mono text-sm">
            Don't have an account?
            <button
              @click="emit('switch-to-register')"
              class="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
