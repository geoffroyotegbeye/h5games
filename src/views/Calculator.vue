<script setup lang="ts">
import Button from '../components/calculator/Button.vue'
import Display from '../components/calculator/Display.vue'
import { useCalculator } from '../composables/useCalculator'

const { display, clear, appendNumber, appendDecimal, setOperator, calculate } = useCalculator()

const buttons = [
  { value: 'C', action: clear, variant: 'action' },
  { value: '÷', action: () => setOperator('÷'), variant: 'operator' },
  { value: '×', action: () => setOperator('×'), variant: 'operator' },
  { value: '7', action: () => appendNumber('7') },
  { value: '8', action: () => appendNumber('8') },
  { value: '9', action: () => appendNumber('9') },
  { value: '-', action: () => setOperator('-'), variant: 'operator' },
  { value: '4', action: () => appendNumber('4') },
  { value: '5', action: () => appendNumber('5') },
  { value: '6', action: () => appendNumber('6') },
  { value: '+', action: () => setOperator('+'), variant: 'operator' },
  { value: '1', action: () => appendNumber('1') },
  { value: '2', action: () => appendNumber('2') },
  { value: '3', action: () => appendNumber('3') },
  { value: '=', action: calculate, variant: 'operator' },
  { value: '0', action: () => appendNumber('0') },
  { value: '.', action: appendDecimal }
]
</script>

<template>
  <div class="max-w-xs mx-auto">
    <h1 class="text-3xl font-bold text-center text-purple-400 mb-8">Calculatrice</h1>
    <div class="bg-gray-900 p-4 rounded-xl shadow-xl">
      <Display :value="display" />
      <div class="grid grid-cols-4 gap-2">
        <Button
          v-for="btn in buttons"
          :key="btn.value"
          :value="btn.value"
          :variant="btn.variant || 'default'"
          @click="btn.action"
          :class="{
            'col-span-2': btn.value === '0'
          }"
        />
      </div>
    </div>
  </div>
</template>