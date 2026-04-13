<script setup lang="ts">
import { useNav } from '@slidev/client'
import { watch, nextTick } from 'vue'

const { currentSlideNo } = useNav()

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
  <div />
</template>
