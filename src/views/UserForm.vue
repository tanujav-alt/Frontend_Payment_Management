<template>
  <section>
    <h1>{{ form.id ? ' Edit User' : ' Create User' }}</h1>

    <form @submit.prevent="submitForm" novalidate>
      <div class="form-group">
        <label for="name">Name *</label>
        <input
          id="name"
          type="text"
          v-model="form.name"
          aria-describedby="nameError"
          required
        />
        <span id="nameError" class="error">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label for="email">Email *</label>
        <input
          id="email"
          type="email"
          v-model="form.email"
          aria-describedby="emailError"
          required
        />
        <span id="emailError" class="error">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="role">Role *</label>
        <select
          id="role"
          v-model="form.role"
          aria-describedby="roleError"
          required
        >
          <option disabled value="">Select Role</option>
          <option>Admin</option>
          <option>Manager</option>
          <option>User</option>
        </select>
        <span id="roleError" class="error">{{ errors.role }}</span>
      </div>

      <div class="button-group">
        <button type="submit" class="primary-btn">
          {{ form.id ? 'Update User' : 'Create User' }}
        </button>
        <button type="button" class="cancel-btn" @click="cancel">Cancel</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { reactive, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const userStore = inject('userStore')

const form = reactive({
  id: null,
  name: '',
  email: '',
  role: ''
})

const errors = reactive({
  name: '',
  email: '',
  role: ''
})

function validate() {
  errors.name = form.name.trim() ? '' : 'Name is required'
  errors.email = /^\S+@\S+\.\S+$/.test(form.email) ? '' : 'Valid email is required'
  errors.role = form.role ? '' : 'Role is required'
  return !errors.name && !errors.email && !errors.role
}

function submitForm() {
  if (!validate()) return

  if (form.id) {
    const index = userStore.users.findIndex(u => u.id === form.id)
    if (index !== -1) {
      userStore.users[index] = { ...form }
      console.log('User updated:', userStore.users[index])
    }
  } else {
    const newUser = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role
    }
    userStore.users.push(newUser)
    console.log('User created:', newUser)
  }

  resetForm()
  router.push('/users')
}

function resetForm() {
  form.id = null
  form.name = ''
  form.email = ''
  form.role = ''
  errors.name = ''
  errors.email = ''
  errors.role = ''
}

function cancel() {
  resetForm()
  router.push('/users')
}

onMounted(() => {
  const editId = Number(route.query.editId)
  if (editId) {
    const user = userStore.users.find(u => u.id === editId)
    if (user) {
      Object.assign(form, user)
    }
  }
})
</script>

<style scoped>
 section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

h1 {
  color: #f5f5f5;
  font-size: 1.6rem;
  margin-bottom: 1rem;
  text-align: center;
  letter-spacing: 0.5px;
}

form {
  background-color: #1e1e2f;
  padding: 2rem;
  border-radius: 10px;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

form:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: 600;
  color: #aab4cf;
  margin-bottom: 0.3rem;
}

input,
select {
  background-color: #2b2b3a;
  color: #f5f5f5;
  border: 1px solid #444c5c;
  border-radius: 6px;
  padding: 0.6rem 0.8rem;
  width: 100%;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.25s ease;
}

input:focus,
select:focus {
  border-color: #4f8ef7;
  box-shadow: 0 0 6px rgba(79, 142, 247, 0.4);
}

.error {
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-top: 0.2rem;
  display: block;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: flex-end;
}

button {
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.25s ease;
  border: none;
}

.primary-btn {
  background-color: #4f8ef7;
  color: white;
}

.primary-btn:hover {
  background-color: #3c78d8;
}

.cancel-btn {
  background-color: #2b2b3a;
  color: #ddd;
  border: 1px solid #555;
}

.cancel-btn:hover {
  background-color: #3c3c4a;
  border-color: #666;
} 
 
</style>
