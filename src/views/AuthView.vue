<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'

const route = useRoute()

type AuthMode = 'login' | 'register'

const getInitialMode = (): AuthMode => {
  const authMode = route.query.mode as AuthMode
  return authMode === 'register' || authMode === 'login' ? authMode : 'login'
}

const mode = ref<AuthMode>(getInitialMode())

const switchToLogin = () => mode.value = 'login'
const switchToRegister = () => mode.value = 'register'
</script>

<template>
  <div>
    <LoginForm v-if="mode === 'login'" @switch-to-register="switchToRegister" />
    <RegisterForm v-else @switch-to-login="switchToLogin" />
  </div>
</template>
