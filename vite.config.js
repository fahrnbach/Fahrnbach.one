/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['main.test.js'],
    setupFiles: ['./setupTests.js']
  },
})