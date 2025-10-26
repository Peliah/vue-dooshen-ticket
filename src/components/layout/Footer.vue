<script setup lang="ts">
import { Facebook, Twitter, Instagram, HelpCircle, Mail, Shield, FileText } from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-[#232323] text-white font-mono">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2">
          <RouterLink to="/" class="flex items-center space-x-2 mb-4">
            <h2 class="text-2xl font-bold">DST</h2>
          </RouterLink>
          <p class="text-gray-300 mb-4 max-w-md">
            Your premier destination for event ticket management.
            Discover, purchase, and manage your event tickets with ease.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-300 hover:text-white transition-colors">
              <span class="sr-only">Facebook</span>
              <Facebook class="h-6 w-6" />
            </a>
            <a href="#" class="text-gray-300 hover:text-white transition-colors">
              <span class="sr-only">Twitter</span>
              <Twitter class="h-6 w-6" />
            </a>
            <a href="#" class="text-gray-300 hover:text-white transition-colors">
              <span class="sr-only">Instagram</span>
              <Instagram class="h-6 w-6" />
            </a>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <RouterLink to="/" class="text-gray-300 hover:text-white transition-colors">
                Home
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/events" class="text-gray-300 hover:text-white transition-colors">
                Events
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/tickets" class="text-gray-300 hover:text-white transition-colors">
                My Tickets
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/about" class="text-gray-300 hover:text-white transition-colors">
                About Us
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4">Support</h3>
          <ul class="space-y-2">
            <li>
              <RouterLink to="/help" class="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <HelpCircle class="h-4 w-4" />
                <span>Help Center</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/contact" class="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <Mail class="h-4 w-4" />
                <span>Contact Us</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/privacy" class="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <Shield class="h-4 w-4" />
                <span>Privacy Policy</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/terms" class="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <FileText class="h-4 w-4" />
                <span>Terms of Service</span>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-600 mt-8 pt-8 text-center">
        <p class="text-gray-300">
          © {{ new Date().getFullYear() }} DST Event Ticket Management. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
