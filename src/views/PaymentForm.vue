<template>
  <section class="payment-form-container">
    <h2>{{ isEdit ? 'Edit Payment' : 'Create Payment' }}</h2>

    <form @submit.prevent="handleSubmit">
      <div class="form-grid">
        <!-- User -->
        <label>
          <span>Select User</span>
          <select v-model.number="form.userId" required>
            <option disabled value="">Select a user</option>
            <option v-for="user in userStore.users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
        </label>

        <!-- Amount -->
        <label>
          <span>Amount</span>
          <input v-model.number="form.amount" required type="number" min="0.01" step="0.01" />
        </label>

        <!-- Status -->
        <label>
          <span>Status</span>
          <select v-model="form.status" required>
            <option disabled value="">Select Status</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </label>

        <!-- Category -->
        <label>
          <span>Category</span>
          <select v-model="form.category" required>
            <option disabled value="">Select Category</option>
            <option>Subscription</option>
            <option>One-time</option>
            <option>Refund</option>
          </select>
        </label>

        <!-- Date -->
        <label>
          <span>Date</span>
          <input v-model="form.date" required type="date" />
        </label>

        <!-- Description -->
        <label class="full-width">
          <span>Description</span>
          <textarea v-model="form.description" rows="4" required></textarea>
        </label>
      </div>

      <div class="form-actions">
        <button type="submit" class="primary-btn">
          {{ isEdit ? 'Update Payment' : 'Create Payment' }}
        </button>
        <router-link to="/payments" class="secondary-btn">← Back to Payments</router-link>
      </div>
    </form>
  </section>
</template>

<script setup>
import { inject, reactive, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const paymentStore = inject('paymentStore')
const userStore = inject('userStore')
const route = useRoute()
const router = useRouter()

// Detect if editing
const editId = route.params.id ? Number(route.params.id) : null
const isEdit = !!editId

// Default form
const form = reactive({
  userId: '',
  amount: '',
  status: '',
  category: '',
  date: new Date().toISOString().split('T')[0],
  description: ''
})

// Prefill form if editing
watchEffect(() => {
  if (isEdit) {
    const existing = paymentStore.payments.find(p => p.id === editId)
    if (existing) Object.assign(form, existing)
  }
})

// Submit handler
function handleSubmit() {
  if (isEdit) {
    const index = paymentStore.payments.findIndex(p => p.id === editId)
    if (index !== -1) paymentStore.payments[index] = { ...form, id: editId }
  } else {
    const newId = paymentStore.payments.length
      ? Math.max(...paymentStore.payments.map(p => p.id)) + 1
      : 1
    paymentStore.payments.push({ ...form, id: newId })
  }
  router.push('/payments')
}
</script>

<style scoped>
/* Container */
.payment-form-container {
  max-width: 700px;
  margin: 2rem auto;
  background: rgba(30, 30, 30, 0.95);
  padding: 2rem 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  color: #eee;
}

h2 {
  text-align: center;
  color: #4f8ef7;
  margin-bottom: 1.5rem;
  letter-spacing: 0.5px;
}

/* Form Grid */
form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem 2rem;
}

.full-width {
  grid-column: span 2;
}

/* Labels & Inputs */
label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
}

label span {
  margin-bottom: 0.4rem;
  color: #bbb;
  font-size: 0.95rem;
}

input,
select,
textarea {
  padding: 0.65rem 0.8rem;
  font-size: 1rem;
  background-color: #2a2a2a;
  color: #fff;
  border: 1px solid #444;
  border-radius: 6px;
  transition: all 0.2s ease;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #4f8ef7;
  box-shadow: 0 0 0 2px rgba(79, 142, 247, 0.3);
}

/* Buttons */
.form-actions {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
}

.primary-btn {
  background-color: #4f8ef7;
  color: white;
  padding: 0.6rem 1.4rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.primary-btn:hover {
  background-color: #3b74da;
  transform: translateY(-2px);
}

.secondary-btn {
  color: #4f8ef7;
  text-decoration: none;
  font-weight: 500;
  padding: 0.6rem 1.2rem;
  border: 1px solid #4f8ef7;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.secondary-btn:hover {
  background-color: #4f8ef7;
  color: #fff;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
