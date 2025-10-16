<template>
  <section v-if="payment">
    <h2>Payment Details (ID: {{ payment.id }})</h2>
    <ul>
      <li><strong>User:</strong> {{ getUserName(payment.userId) }}</li>
      <li><strong>Amount:</strong> ₹{{ payment.amount.toFixed(2) }}</li>
      <li><strong>Status:</strong> {{ payment.status }}</li>
      <li><strong>Category:</strong> {{ payment.category }}</li>
      <li><strong>Date:</strong> {{ payment.date }}</li>
      <li><strong>Description:</strong> {{ payment.description }}</li>
    </ul>
<router-link to="/payments" class="back-link">← Back to List</router-link>
  </section>

  <p v-else>Payment not found.</p>
</template>

<script setup>
import { inject } from 'vue'
import { useRoute } from 'vue-router'

const paymentStore = inject('paymentStore')
const userStore = inject('userStore')
const route = useRoute()

const payment = paymentStore.payments.find(p => p.id === Number(route.params.id))

function getUserName(userId) {
  const user = userStore.users.find(u => u.id === userId)
  return user ? user.name : 'Unknown'
}
</script>

<style scoped>
section {
  background-color: #1e1e1e;
  padding: 2rem;
  border-radius: 8px;
  color: #eee;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 0.5rem;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  color: #4f8ef7; /* bright blue */
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
  color: #7ab8ff; /* lighter blue on hover */
}


</style>
