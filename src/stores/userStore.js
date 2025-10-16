// src/stores/userStore.js
import { reactive } from 'vue'

const userStore = reactive({
  users: [
    { id: 1, name: 'Alice', email: 'alice@fintech.com', password: '123456', role: 'Admin' },
    { id: 2, name: 'Bob', email: 'bob@fintech.com', password: '123456', role: 'Manager' }
  ],
  currentUser: null // store the logged-in user
})

export default userStore
