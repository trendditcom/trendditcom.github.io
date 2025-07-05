<template>
  <section id="advisory" class="py-24">
    <div class="container mx-auto px-4">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Advisory Services</h2>
        <p class="mt-4 text-lg text-gray-600">
          Expert guidance for your AI automation journey
        </p>
      </div>
      <div class="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div class="rounded-lg border bg-white p-6">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <ChartBarIcon class="h-6 w-6" />
          </div>
          <h3 class="mt-4 text-lg font-semibold">Strategy & Planning</h3>
          <p class="mt-2 text-sm text-gray-600">
            Develop comprehensive AI strategies aligned with your business goals and technical capabilities.
          </p>
        </div>
        <div class="rounded-lg border bg-white p-6">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
            <CogIcon class="h-6 w-6" />
          </div>
          <h3 class="mt-4 text-lg font-semibold">Implementation</h3>
          <p class="mt-2 text-sm text-gray-600">
            Hands-on support for integrating AI solutions into your existing workflows and systems.
          </p>
        </div>
        <div class="rounded-lg border bg-white p-6">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
            <AcademicCapIcon class="h-6 w-6" />
          </div>
          <h3 class="mt-4 text-lg font-semibold">Training & Support</h3>
          <p class="mt-2 text-sm text-gray-600">
            Empower your team with the knowledge and skills needed to leverage AI effectively.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChartBarIcon, CogIcon, AcademicCapIcon } from '@heroicons/vue/24/outline'
</script>