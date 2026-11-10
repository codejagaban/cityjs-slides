<script setup lang="ts">
import { useNav } from '@slidev/client'
import { watch, nextTick, computed } from 'vue'

const { currentSlideNo, total } = useNav()

// The cover (slide 1) is a full-bleed image with its own branding.
const showBrand = computed(() => currentSlideNo.value > 1)

// When navigating to a new slide, scroll code blocks so content is visible
watch(currentSlideNo, () => {
  nextTick(() => {
    setTimeout(() => {
      const codeBlocks = document.querySelectorAll('.slidev-code') as NodeListOf<HTMLElement>
      codeBlocks.forEach((block) => {
        // Reset scroll to top when entering a slide
        block.scrollTo({ top: 0, behavior: 'smooth' })
      })
    }, 200)
  })
})
</script>

<template>
  <div v-if="showBrand" class="uc-brand" aria-hidden="true">
    <img class="uc-brand-logo" src="/uc-logo.svg" alt="" />
    <div class="uc-brand-footer">
      <span>uploadcare.com</span>
      <span>{{ String(currentSlideNo).padStart(2, '0') }} / {{ String(total).padStart(2, '0') }}</span>
    </div>
  </div>
</template>

<style scoped>
.uc-brand {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 20;
}

.uc-brand-logo {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  width: 7.5rem;
}

.uc-brand-footer {
  position: absolute;
  left: 1.5rem;
  right: 1.5rem;
  bottom: 1rem;
  display: flex;
  justify-content: space-between;
  font-family: var(--uc-font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgb(255 255 255 / 0.35);
}
</style>
