<template>
  <div class="app">
    <nav class="navbar">
      <div class="logo">PayApp</div>
      <div class="nav-links">
        <router-link to="/users" exact-active-class="active-link">Users</router-link>
        <router-link to="/createuser" exact-active-class="active-link">Create User</router-link>
        <router-link to="/payments" exact-active-class="active-link">Payments</router-link>
        <router-link to="/createpayment" exact-active-class="active-link">Create Payment</router-link>
        <router-link to="/dashboard" exact-active-class="active-link">Dashboard</router-link>
      </div>
    </nav>

    <main>
      <!-- Render current page here -->
      <router-view />
    </main>
  </div>
</template>

<script setup></script>

<style scoped>
/* navbar + layout styles same as before */
.app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #121212;
  color: #f5f5f5;
  min-height: 100vh;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(90deg, #4f8ef7, #3c78d8);
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  border-radius: 0 0 12px 12px;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  font-weight: bold;
  font-size: 1.4rem;
  color: #fff;
  letter-spacing: 1px;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  color: #f5f5f5;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.nav-links a:hover {
  background-color: rgba(255,255,255,0.1);
  transform: scale(1.05);
}

.active-link {
  background-color: rgba(255,255,255,0.2);
  box-shadow: 0 0 10px rgba(79,142,247,0.6);
}

main {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
