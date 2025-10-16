import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../components/MainLayout.vue'
import UserList from '../views/UserList.vue'
import UserForm from '../views/UserForm.vue'
import PaymentList from '../views/PaymentList.vue'
import PaymentForm from '../views/PaymentForm.vue'
import PaymentDetail from '../views/PaymentDetail.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', redirect: '/dashboard' }, // default page
      { path: 'users', component: UserList },
      { path: 'createuser', component: UserForm },
      { path: 'payments', component: PaymentList },
      { path: 'createpayment', component: PaymentForm },
      { path: 'payment/:id', component: PaymentDetail },
      { path: 'dashboard', component: DashboardView }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
