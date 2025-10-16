// PaymentDetail.logic.test.js

// Mocked logic: getPaymentById and formatPaymentAmount
function getPaymentById(id, payments) {
  return payments.find(p => p.id === id) || null
}

function formatPaymentAmount(payment) {
  return `₹${payment.amount.toFixed(2)}`
}

describe('PaymentDetail Logic', () => {
  let payments

  beforeEach(() => {
    payments = [
      { id: 1, userId: 1, amount: 150, status: 'Pending', category: 'Subscription' },
      { id: 2, userId: 2, amount: 200.5, status: 'Completed', category: 'One-time' }
    ]
  })

  test('getPaymentById returns correct payment', () => {
    const payment = getPaymentById(1, payments)
    expect(payment).not.toBeNull()
    expect(payment.userId).toBe(1)
  })

  test('getPaymentById returns null for non-existing payment', () => {
    const payment = getPaymentById(99, payments)
    expect(payment).toBeNull()
  })

  test('formatPaymentAmount formats correctly', () => {
    const payment = getPaymentById(2, payments)
    expect(formatPaymentAmount(payment)).toBe('₹200.50')
  })

  test('formatPaymentAmount handles zero amount', () => {
    const zeroPayment = { id: 3, amount: 0 }
    expect(formatPaymentAmount(zeroPayment)).toBe('₹0.00')
  })
})
