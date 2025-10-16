// // src/stores/paymentStore.js
// import { reactive } from 'vue'

// const paymentStore = reactive({
//   payments: [
//     {
//       id: 101,
//       userId: 1,
//       amount: 250.0,
//       status: 'Completed', // e.g., Completed, Pending, Failed
//       category: 'Subscription',
//       date: '2025-10-10',
//       description: 'Monthly subscription fee',
//     },
//     {
//       id: 102,
//       userId: 2,
//       amount: 100.5,
//       status: 'Pending',
//       category: 'One-time',
//       date: '2025-10-12',
//       description: 'One-time purchase',
//     },
//     {
//       id: 103,
//       userId: 1,
//       amount: 75.25,
//       status: 'Failed',
//       category: 'Refund',
//       date: '2025-10-14',
//       description: 'Refund for order #54321',
//     },
//   ],

//   // Optional helper to get payments by user ID
//   getPaymentsByUserId(userId) {
//     return this.payments.filter(p => p.userId === userId)
//   },
// })

// export default paymentStore
import { reactive, watchEffect } from 'vue'

const defaultPayments = [
  {
    id: 101,
    userId: 1,
    amount: 250.0,
    status: 'Completed',
    category: 'Subscription',
    date: '2025-10-10',
    description: 'Monthly subscription fee',
  },
  {
    id: 102,
    userId: 2,
    amount: 100.5,
    status: 'Pending',
    category: 'One-time',
    date: '2025-10-12',
    description: 'One-time purchase',
  },
  {
    id: 103,
    userId: 1,
    amount: 75.25,
    status: 'Failed',
    category: 'Refund',
    date: '2025-10-14',
    description: 'Refund for order #54321',
  },
]

//  Load from localStorage if available, else use defaults
const saved = JSON.parse(localStorage.getItem('payments')) || defaultPayments

const paymentStore = reactive({
  payments: saved,

  // Helper to get payments by user
  getPaymentsByUserId(userId) {
    return this.payments.filter(p => p.userId === userId)
  },

  // Add new payment
  addPayment(payment) {
    payment.id = Date.now() // unique id
    this.payments.push(payment)
  },

  // Delete a payment
  deletePayment(id) {
    this.payments = this.payments.filter(p => p.id !== id)
  },
})

// Automatically save changes to localStorage
watchEffect(() => {
  localStorage.setItem('payments', JSON.stringify(paymentStore.payments))
})

export default paymentStore
