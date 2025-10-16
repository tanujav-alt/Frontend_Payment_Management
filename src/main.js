import { createApp, reactive, watchEffect } from 'vue'
import App from './App.vue'
import router from './router'
import paymentStore from './stores/paymentStore'


function loadUsers() {
  const saved = localStorage.getItem('users')
  return saved ? JSON.parse(saved) : [
    { id: 1, name: 'Alice Johnson', email: 'alice@fintech.com', role: 'Admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@fintech.com', role: 'Manager' },
    { id: 3, name: 'Cara Lee', email: 'cara@fintech.com', role: 'User' }
  ]
}


const userStore = reactive({
  users: loadUsers()
})

const app = createApp(App)
app.provide('userStore', userStore)
app.provide('paymentStore', paymentStore) // Similarly for payments

app.use(router)
app.mount('#app')

watchEffect(() => {
  localStorage.setItem('users', JSON.stringify(userStore.users))
})
