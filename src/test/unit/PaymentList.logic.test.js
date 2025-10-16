// PaymentList.logic.test.js

// Mocked logic functions
function getUserName(userId, users) {
  const user = users.find(u => u.id === userId)
  return user ? user.name : 'Unknown'
}

function filterPayments(payments, filters, users) {
  return payments.filter(p => {
    const name = getUserName(p.userId, users).toLowerCase()
    const matchesUser = filters.user ? name.includes(filters.user.toLowerCase()) : true
    const matchesStatus = filters.status ? p.status === filters.status : true
    const matchesCategory = filters.category ? p.category === filters.category : true
    return matchesUser && matchesStatus && matchesCategory
  })
}

describe('PaymentList Logic', () => {
  const mockUsers = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]

  const mockPayments = [
    { id: 1, userId: 1, amount: 100, status: 'Pending', category: 'Subscription' },
    { id: 2, userId: 2, amount: 200, status: 'Completed', category: 'One-time' },
    { id: 3, userId: 1, amount: 50, status: 'Failed', category: 'Refund' }
  ]

  test('getUserName returns correct name', () => {
    expect(getUserName(1, mockUsers)).toBe('Alice')
    expect(getUserName(2, mockUsers)).toBe('Bob')
    expect(getUserName(99, mockUsers)).toBe('Unknown')
  })

  test('filterPayments filters by user name', () => {
    const filtered = filterPayments(mockPayments, { user: 'alice' }, mockUsers)
    expect(filtered.length).toBe(2)
    expect(filtered.every(p => p.userId === 1)).toBe(true)
  })

  test('filterPayments filters by status', () => {
    const filtered = filterPayments(mockPayments, { status: 'Completed' }, mockUsers)
    expect(filtered.length).toBe(1)
    expect(filtered[0].status).toBe('Completed')
  })

  test('filterPayments filters by category', () => {
    const filtered = filterPayments(mockPayments, { category: 'Refund' }, mockUsers)
    expect(filtered.length).toBe(1)
    expect(filtered[0].category).toBe('Refund')
  })

  test('filterPayments combines filters', () => {
    const filtered = filterPayments(mockPayments, { user: 'alice', status: 'Pending' }, mockUsers)
    expect(filtered.length).toBe(1)
    expect(filtered[0].id).toBe(1)
  })
})
