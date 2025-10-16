<template>
  <section class="dashboard">
    <h1>Dashboard</h1>

    <!-- Summary Cards -->
    <div class="stats">
      <div class="card">
        <h2>Total Users</h2>
        <p>{{ userStore.users.length }}</p>
      </div>
      <div class="card">
        <h2>Total Payments</h2>
        <p>{{ paymentStore.payments.length }}</p>
      </div>
      <div class="card">
        <h2>Completed</h2>
        <p>{{ counts.completed }}</p>
      </div>
      <div class="card">
        <h2>Pending</h2>
        <p>{{ counts.pending }}</p>
      </div>
      <div class="card">
        <h2>Failed</h2>
        <p>{{ counts.failed }}</p>
      </div>
    </div>

    <!-- Chart Section -->
    <div class="chart-container">
      <canvas id="categoryChart"></canvas>
    </div>
  </section>
</template>

<script setup>
import { inject, computed, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const paymentStore = inject('paymentStore')
const userStore = inject('userStore')

// Count by status
const counts = computed(() => {
  return {
    completed: paymentStore.payments.filter(p => p.status === 'Completed').length,
    pending: paymentStore.payments.filter(p => p.status === 'Pending').length,
    failed: paymentStore.payments.filter(p => p.status === 'Failed').length
  }
})

// Data for chart (categories)
const categories = computed(() => {
  const counts = {}
  paymentStore.payments.forEach(p => {
    counts[p.category] = (counts[p.category] || 0) + 1
  })
  return counts
})

// Render chart
onMounted(() => {
  const ctx = document.getElementById('categoryChart')
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(categories.value),
      datasets: [
        {
          label: 'Payments by Category',
          data: Object.values(categories.value),
          backgroundColor: ['#4f8ef7', '#ffcc00', '#ff6b6b', '#33cc99']
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          labels: { color: '#f5f5f5' }
        }
      }
    }
  })
})
</script>

<style scoped>
.dashboard {
  color: #f5f5f5;
  background-color: #121212;
  min-height: 100vh;
  padding: 2rem;
}

h1 {
  margin-bottom: 1.5rem;
  color: #4f8ef7;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.card {
  background-color: #1e1e2f;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.card h2 {
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 0.5rem;
}

.card p {
  font-size: 1.5rem;
  font-weight: bold;
}

.chart-container {
  background-color: #1e1e2f;
  border-radius: 8px;
  padding: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
}
</style>
