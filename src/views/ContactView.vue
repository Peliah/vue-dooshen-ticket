<script setup lang="ts">
// Simple contact page
</script>

<template>
  <div class="min-h-screen bg-[#232323] flex items-center justify-center">
    <div class="max-w-2xl mx-auto px-4 text-center">
      <h1 class="text-4xl font-bold text-white font-mono mb-6">Contact Us</h1>
      <p class="text-gray-300 font-mono text-lg mb-8">
        Get in touch with our support team for any questions or assistance.
      </p>
      <div class="bg-white/5 rounded-lg p-8 border border-white/10">
        <h2 class="text-xl font-bold text-white font-mono mb-4">Support Information</h2>
        <p class="text-gray-300 font-mono mb-4">
          Email: support@dst.com<br>
          Phone: +1 (555) 123-4567<br>
          Hours: Monday - Friday, 9 AM - 6 PM EST
        </p>
        <RouterLink 
          to="/dashboard/tickets" 
          class="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-mono"
        >
          Create Support Ticket
        </RouterLink>
      </div>
    </div>
  </div>
</template>
