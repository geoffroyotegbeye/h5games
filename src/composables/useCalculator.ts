import { ref } from 'vue'

export function useCalculator() {
  const display = ref('')
  const previousValue = ref('')
  const operator = ref('')
  const waitingForOperand = ref(false)

  const clear = () => {
    display.value = ''
    previousValue.value = ''
    operator.value = ''
    waitingForOperand.value = false
  }

  const appendNumber = (num: string) => {
    if (waitingForOperand.value) {
      display.value = num
      waitingForOperand.value = false
    } else {
      display.value = display.value === '0' ? num : display.value + num
    }
  }

  const appendDecimal = () => {
    if (waitingForOperand.value) {
      display.value = '0.'
      waitingForOperand.value = false
      return
    }
    if (!display.value.includes('.')) {
      display.value += '.'
    }
  }

  const setOperator = (op: string) => {
    const currentValue = parseFloat(display.value)
    
    if (operator.value && !waitingForOperand.value) {
      calculate()
    } else if (!previousValue.value) {
      previousValue.value = display.value
    }
    
    operator.value = op
    waitingForOperand.value = true
  }

  const calculate = () => {
    const prev = parseFloat(previousValue.value)
    const current = parseFloat(display.value)
    let result = 0

    switch (operator.value) {
      case '+':
        result = prev + current
        break
      case '-':
        result = prev - current
        break
      case '×':
        result = prev * current
        break
      case '÷':
        result = prev / current
        break
    }

    display.value = result.toString()
    previousValue.value = display.value
    waitingForOperand.value = true
  }

  return {
    display,
    clear,
    appendNumber,
    appendDecimal,
    setOperator,
    calculate
  }
}
