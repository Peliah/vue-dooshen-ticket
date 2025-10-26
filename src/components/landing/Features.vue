<script setup lang="ts">
import { Ticket, Shield, Smartphone, Clock, Users, BarChart3 } from 'lucide-vue-next'

const features = [
  {
    icon: Ticket,
    title: "Comprehensive Ticket Management",
    description: "Create, assign, and track support tickets with our intuitive dashboard. Manage ticket lifecycle from creation to resolution with powerful tools.",
    color: "text-blue-400"
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security ensures all ticket data is protected. Your customer information and support history are safe with our encrypted platform.",
    color: "text-green-400"
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Access your ticket management system anywhere, anytime. Our responsive design works perfectly on all devices for on-the-go support.",
    color: "text-purple-400"
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description: "Get instant notifications about new tickets, status changes, and customer responses. Stay connected with your support team.",
    color: "text-orange-400"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Assign tickets to team members, track workload, and collaborate effectively. Built-in communication tools for seamless teamwork.",
    color: "text-pink-400"
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Comprehensive analytics help you understand support trends, team performance, and customer satisfaction. Make data-driven decisions.",
    color: "text-yellow-400"
  }
]
</script>

<template>
  <section class="relative min-h-screen overflow-hidden py-20">
    <div class="absolute inset-0 w-full h-full">
      <img
        src="/assets/images/blob-scene-haikei.svg"
        alt="Blob scene background"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="absolute inset-0 w-full h-full opacity-10">
      <img
        src="/assets/images/blob-scatter-haikei.svg"
        alt="Blob scatter overlay"
        class="w-full h-full object-cover"
      />
    </div>

    <main class="relative z-10 min-h-screen flex items-center mix-blend-difference">
      <div class="max-w-7xl mx-auto px-4 py-20">
        <!-- Section Header -->
        <div class="max-w-4xl mx-auto text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-6 font-mono mix-blend-difference">
            Why Choose DST?
          </h2>
          <p class="text-xl text-gray-200 font-mono mix-blend-difference">
            Powerful features designed to make support ticket management efficient and effective
          </p>
        </div>

        <!-- Feature Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border border-white/20"
          >
            <div class="flex items-center mb-6">
              <div :class="`p-3 rounded-xl bg-white/20 ${feature.color}`">
                <component :is="feature.icon" class="h-8 w-8 text-white" />
              </div>
            </div>

            <h3 class="text-2xl font-bold text-white mb-4 font-mono">
              {{ feature.title }}
            </h3>

            <p class="text-gray-200 leading-relaxed font-mono">
              {{ feature.description }}
            </p>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center mt-16">
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 max-w-2xl mx-auto">
            <h3 class="text-2xl font-bold text-white mb-4 font-mono">
              Ready to Streamline Your Support?
            </h3>
            <p class="text-gray-200 mb-6 font-mono">
              Join thousands of support teams who trust DST for their ticket management needs.
            </p>
            <RouterLink to="/dashboard" class="bg-white text-[#232323] px-8 py-4 rounded-lg font-mono font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Managing Tickets
            </RouterLink>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>
