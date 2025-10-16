<template>
  <section>
    <h1>User List</h1>

    <!-- Filters -->
    <div class="filters">
      <input v-model="filters.name" placeholder="Search Name" />
      <input v-model="filters.email" placeholder="Search Email" />
      <select v-model="filters.role">
        <option value="">All Roles</option>
        <option>Admin</option>
        <option>Manager</option>
        <option>User</option>
      </select>
    </div>

    <!-- Table with row animations -->
    <table>
      <thead>
        <tr>
          <th @click="sortBy('name')">Name</th>
          <th @click="sortBy('email')">Email</th>
          <th @click="sortBy('role')">Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <transition-group name="fade" tag="tbody">
        <tr v-for="user in paginatedUsers" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button @click="editUser(user)">Edit</button>
            <button @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </transition-group>
    </table>

    <!-- Pagination -->
    <div class="pagination">
      <button :disabled="page === 1" @click="page--">Prev</button>
      <span>Page {{ page }} / {{ pageCount }}</span>
      <button :disabled="page === pageCount" @click="page++">Next</button>
    </div>
  </section>
</template>

<script setup>
import { inject, reactive, computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const userStore = inject('userStore')
const router = useRouter()

// Filters and sorting
const filters = reactive({
  name: '',
  email: '',
  role: ''
})

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

// Filtered and sorted users
const filteredUsers = computed(() => {
  return userStore.users.filter(user => {
    const matchesName = user.name.toLowerCase().includes(filters.name.toLowerCase())
    const matchesEmail = user.email.toLowerCase().includes(filters.email.toLowerCase())
    const matchesRole = filters.role ? user.role === filters.role : true
    return matchesName && matchesEmail && matchesRole
  })
})

const sortedUsers = computed(() => {
  if (!sortKey.value) return filteredUsers.value
  return [...filteredUsers.value].sort((a, b) => {
    const valA = a[sortKey.value].toLowerCase()
    const valB = b[sortKey.value].toLowerCase()
    if (valA < valB) return sortAsc.value ? -1 : 1
    if (valA > valB) return sortAsc.value ? 1 : -1
    return 0
  })
})

// Pagination
const page = ref(1)
const perPage = 5
const pageCount = computed(() => Math.ceil(sortedUsers.value.length / perPage))
const paginatedUsers = computed(() => {
  const start = (page.value - 1) * perPage
  return sortedUsers.value.slice(start, start + perPage)
})

// Actions
function deleteUser(id) {
  const index = userStore.users.findIndex(u => u.id === id)
  if (index !== -1) userStore.users.splice(index, 1)
}

function editUser(user) {
  router.push({ path: '/createuser', query: { editId: user.id } })
}
</script>

<style scoped>
/* Keep your old table styles */
table {
  width: 100%;
  border-collapse: collapse;
  background: #1e1e2f;
  border: 1px solid #444c5c;
}

th, td {
  padding: 0.75rem;
  border-bottom: 1px solid #444c5c;
  text-align: left;
  cursor: default;
}

th {
  background-color: #2b2b3a;
  color: #f5f5f5;
  cursor: pointer;
}

th input, th select {
  margin-top: 0.25rem;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 0.25rem;
  border: 1px solid #444c5c;
  background-color: #2b2b3a;
  color: #f5f5f5;
}

button {
  margin-right: 0.5rem;
  background-color: #4f8ef7;
  color: white;
  border: none;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3c78d8;
}

.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.pagination button {
  padding: 0.3rem 0.7rem;
}

/* Row animations */
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }

/* Filters */
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.filters input, .filters select {
  padding: 0.4rem;
  border-radius: 4px;
  border: 1px solid #444c5c;
  background-color: #2b2b3a;
  color: #f5f5f5;
}
</style>
