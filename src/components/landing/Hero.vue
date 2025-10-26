<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <section class="relative min-h-screen overflow-hidden">
    <div class="absolute inset-0 w-full h-full">
      <img
        src="/assets/images/layered-waves-haikei.svg"
        alt="Layered waves background"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="absolute inset-0 w-full h-full opacity-10">
      <img
        src="/assets/images/circle-scatter-haikei.svg"
        alt="Circle scatter overlay"
        class="w-full h-full object-cover"
      />
    </div>

    <main class="relative z-10 min-h-screen flex pt-20 mix-blend-difference">
      <div class="max-w-7xl mx-auto px-4 py-20">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 font-mono mix-blend-difference">
            DST: Streamline Your Support
          </h1>

          <p class="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto font-mono mix-blend-difference">
            Professional ticket management system for efficient support operations.
            Track, resolve, and manage customer tickets with powerful tools.
          </p>

          <RouterLink
            to="/dashboard"
            class="group inline-flex items-center space-x-2 px-8 py-4 bg-white text-[#232323] rounded-lg hover:bg-gray-100 transition-all duration-300 font-mono font-semibold"
          >
            <span>Manage Tickets</span>
            <ArrowRight class="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </RouterLink>
        </div>
      </div>
    </main>

    <div class="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div class="w-6 h-10 border-2 border-white rounded-full flex justify-center">
        <div class="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
  </section>
</template>
