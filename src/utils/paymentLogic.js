// src/utils/paymentLogic.js

function getUserName(userId, users) {
  const user = users.find(u => u.id === userId)
  return user ? user.name : 'Unknown'
}

function filterPayments(payments, filters, users) {
  return payments.filter(p => {
    const userName = getUserName(p.userId, users).toLowerCase()
    const matchesUser = userName.includes((filters.user || '').toLowerCase())
    const matchesStatus = filters.status ? p.status === filters.status : true
    const matchesCategory = filters.category ? p.category === filters.category : true
    return matchesUser && matchesStatus && matchesCategory
  })
}

module.exports = { getUserName, filterPayments }
