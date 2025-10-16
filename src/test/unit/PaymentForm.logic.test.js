// PaymentForm.logic.test.js

function validateForm(form) {
  return !!(form.amount && form.userId && form.category)
}

function submitForm(form, paymentStore) {
  if (!validateForm(form)) return false
  paymentStore.push({ ...form, id: paymentStore.length + 1 })
  return true
}

describe('PaymentForm Logic', () => {
  let paymentStore
  let form

  beforeEach(() => {
    paymentStore = []
    form = { amount: 100, userId: 1, category: 'Subscription' }
  })

  test('validateForm returns true for complete data', () => {
    expect(validateForm(form)).toBe(true)
  })

  test('validateForm returns false for missing data', () => {
    expect(validateForm({ ...form, amount: 0 })).toBe(false)
  })

  test('submitForm adds payment to store if valid', () => {
    submitForm(form, paymentStore)
    expect(paymentStore.length).toBe(1)
    expect(paymentStore[0].amount).toBe(100)
  })

  test('submitForm returns false if form invalid', () => {
    expect(submitForm({ ...form, userId: null }, paymentStore)).toBe(false)
  })
})
