// src/test/unit/PaymentLogic.test.js

const { getUserName, filterPayments } = require('../../utils/paymentLogic.js')

const mockUsers = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
]

const mockPayments = [
  { id: 1, userId: 1, status: 'Pending', category: 'Subscription' },
  { id: 2, userId: 2, status: 'Completed', category: 'One-time' }
]

describe('Payment Logic', () => {

  test('getUserName returns correct name', () => {
    expect(getUserName(1, mockUsers)).toBe('Alice')
    expect(getUserName(3, mockUsers)).toBe('Unknown')
  })

  test('filterPayments filters by user name', () => {
    const filtered = filterPayments(mockPayments, { user: 'bob' }, mockUsers)
    expect(filtered.length).toBe(1)
    expect(filtered[0].userId).toBe(2)
  })

  test('filterPayments filters by status and category', () => {
    const filtered = filterPayments(mockPayments, { status: 'Pending', category: 'Subscription' }, mockUsers)
    expect(filtered.length).toBe(1)
    expect(filtered[0].userId).toBe(1)
  })

})
