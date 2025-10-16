<template>
  <section>
    <h2>Payment List</h2>

    <!-- Filters -->
    <div class="filters">
      <input v-model="filters.user" placeholder="Search User" />
      <select v-model="filters.status">
        <option value="">All Statuses</option>
        <option>Pending</option>
        <option>Completed</option>
        <option>Failed</option>
      </select>
      <select v-model="filters.category">
        <option value="">All Categories</option>
        <option>Subscription</option>
        <option>One-time</option>
        <option>Refund</option>
      </select>
    </div>

    <table>
      <thead>
        <tr>
          <th @click="sortBy('id')">ID</th>
          <th @click="sortBy('user')">User</th>
          <th @click="sortBy('amount')">Amount</th>
          <th @click="sortBy('status')">Status</th>
          <th @click="sortBy('category')">Category</th>
          <th @click="sortBy('date')">Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <transition-group name="fade" tag="tbody">
        <tr v-for="payment in paginatedPayments" :key="payment.id">
          <td>{{ payment.id }}</td>
          <td>{{ getUserName(payment.userId) }}</td>
          <td>₹{{ payment.amount.toFixed(2) }}</td>
          <td :class="statusClass(payment.status)">{{ payment.status }}</td>
          <td>{{ payment.category }}</td>
          <td>{{ payment.date }}</td>
          <td class="actions">
            <router-link :to="`/payment/${payment.id}`" class="btn view">View</router-link>
            <!-- send editId as query so PaymentForm can read it consistently -->
            <router-link :to="{ path: '/createpayment', query: { editId: payment.id } }" class="btn edit">Edit</router-link>
          </td>
        </tr>
      </transition-group>
    </table>

    <!-- Pagination -->
    <div class="pagination">
      <button :disabled="page <= 1" @click="prevPage">⟵ Prev</button>
      <span>Page {{ page }} / {{ pageCount }}</span>
      <button :disabled="page >= pageCount" @click="nextPage">Next ⟶</button>
    </div>

  </section>
</template>

<script setup>
import { inject, reactive, computed, ref, watch } from 'vue'
import { createApp } from 'vue'

const paymentStore = inject('paymentStore')
const userStore = inject('userStore')

// Filters
const filters = reactive({
  user: '',
  status: '',
  category: ''
})

// Sorting
const sortKey = ref('')
const sortAsc = ref(true)
function sortBy(key) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = true
  }
}

// Get user name
function getUserName(userId) {
  const user = userStore?.users?.find(u => u.id === userId)
  return user ? user.name : 'Unknown'
}

// Filtered payments
const filteredPayments = computed(() => {
  return paymentStore.payments.filter(p => {
    const userName = getUserName(p.userId).toLowerCase()
    const matchesUser = userName.includes(filters.user.toLowerCase())
    const matchesStatus = filters.status ? p.status === filters.status : true
    const matchesCategory = filters.category ? p.category === filters.category : true
    return matchesUser && matchesStatus && matchesCategory
  })
})

// Sorted payments
const sortedPayments = computed(() => {
  if (!sortKey.value) return filteredPayments.value

  return [...filteredPayments.value].sort((a, b) => {
    let valA, valB

    if (sortKey.value === 'user') {
      valA = getUserName(a.userId).toLowerCase()
      valB = getUserName(b.userId).toLowerCase()
    } else {
      valA = (a[sortKey.value] ?? '').toString().toLowerCase()
      valB = (b[sortKey.value] ?? '').toString().toLowerCase()
    }

    if (valA < valB) return sortAsc.value ? -1 : 1
    if (valA > valB) return sortAsc.value ? 1 : -1
    return 0
  })
})

// Pagination
const page = ref(1)
const perPage = 5
const pageCount = computed(() => Math.max(1, Math.ceil(sortedPayments.value.length / perPage)))

const paginatedPayments = computed(() => {
  const start = (page.value - 1) * perPage
  return sortedPayments.value.slice(start, start + perPage)
})

// Watch for filter/sort changes and reset page
watch([filters, sortKey, sortAsc], () => {
  page.value = 1
}, { deep: true })

// Watch for bounds correction
watch(sortedPayments, () => {
  if (page.value > pageCount.value) page.value = pageCount.value
  if (page.value < 1) page.value = 1
})

// Pagination methods
function nextPage() {
  if (page.value < pageCount.value) page.value++
}
function prevPage() {
  if (page.value > 1) page.value--
}

// Status classes
function statusClass(status) {
  return {
    'status-pending': status === 'Pending',
    'status-completed': status === 'Completed',
    'status-failed': status === 'Failed'
  }
}
</script>


<style scoped>
/* keep your existing styles — same as you had */
table {
  width: 100%;
  border-collapse: collapse;
  background-color: #1e1e1e;
  color: #f5f5f5;
  border: 1px solid #333;
}

th, td {
  padding: 0.75rem;
  border: 1px solid #333;
  text-align: left;
}

th {
  background-color: #2a2a2a;
  cursor: pointer;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.filters input,
.filters select {
  background-color: #2a2a2a;
  border: 1px solid #333;
  color: #f5f5f5;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
}

/* Buttons & status classes (same) */
.actions { display:flex; gap:0.5rem; }
.btn.view { background:#4f8ef7; padding:0.3rem 0.7rem; border-radius:4px; color:#fff; text-decoration:none }
.btn.edit { background:#28a745; padding:0.3rem 0.7rem; border-radius:4px; color:#fff; text-decoration:none }

.status-pending { color: #ffb347; }
.status-completed { color: #7bed9f; }
.status-failed { color: #ff6b6b; }

.pagination { margin-top: 1rem; display:flex; justify-content:center; gap:1rem; }
.pagination button { padding: 0.3rem 0.7rem; background:#4f8ef7; border:none; color:white; border-radius:4px; cursor:pointer }
.pagination button[disabled] { opacity:0.4; cursor:not-allowed }
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
