# Payment Management System - Frontend

A Vue.js frontend application for managing payments, users, and transactions in a fintech environment. This project allows creating, listing, filtering, and viewing payment details with a clean, reactive UI.

---

## Features

### User Management
- Create, edit, and list users.
- Clear visualization of user-related payments.

### Payment Management
- **PaymentForm**: Create new payments with validation.
- **PaymentList**: View and filter payments by user, status, or category.
- **PaymentDetail**: View detailed information of a payment record.
- Mocked store logic for demonstration and unit testing.

### Testing
- Unit tests using **Jest** and **Vue Test Utils**.
- Payment logic tests include:
  - Form validation
  - Submission behavior
  - Filtering logic
  - User name resolution
- Each major component has at least 2 test cases to ensure reliability.

---


## Project Screenshots : 
<img width="1422" height="846" alt="Screenshot 2025-10-16 at 7 13 21 PM" src="https://github.com/user-attachments/assets/00b40035-f4c4-4847-8ccc-0b885caebbed" />
<img width="1426" height="8<img width="1430" height="803" alt="Screenshot 2025-10-16 at 7 14 50 PM" src="https://github.com/user-attachments/assets/80e305c2-e3e6-49e6-8a9f-acc20b343439" />
<img width="1428" height="845" alt="Screenshot 2025-10-16 at 7 14 19 PM" src="https://github.com/user-attachments/assets/d6c8d743-050d-4237-ac52-41af163109fc" />
<img width="1430" height="804" alt="Screenshot 2025-10-16 at 7 13 51 PM" src="https://github.com/user-attachments/assets/db2d3cf7-08a5-4fbd-8176-709a4735fae0" />
<img width="1419" height="797" alt="Screenshot 2025-10-16 at 7 15 03 PM" src="https://github.com/user-attachments/assets/729c8443-eb9c-4970-8d03-e1fac68ceabe" />
<img width="1430" height="803" alt="Screenshot 2025-10-16 at 7 15 13 PM" src="https://github.com/user-attachments/assets/5a671dc3-bb21-4750-a4dd-05cc35b03ad8" />
<img width="1432" height="811" alt="Screenshot 2025-10-16 at 7 15 40 PM" src="https://github.com/user-attachments/assets/c6d8f9d7-68a7-4aa7-9b77-792c53b7f15b" />
<img width="1429" height="797" alt="Screenshot 2025-10-16 at 7 15 50 PM" src="https://github.com/user-attachments/assets/fd7084cd-6375-4fac-bf1c-bced4561a951" />

<img width="1426" height="860" alt="Screenshot 2025-10-16 at 7 16 01 PM" src="https://github.com/user-attachments/assets/237f2488-8f50-4fe9-81f0-4b3b0b19a1f0" />

## Setup :
1. Clone the repository:
https://github.com/tanujav-alt/Frontend_Payment_Management.git

2. npm install

3. npm install vue-router@4

4. npm install --save-dev vite
(if dev is not installed)

5. npm run dev (To run the server)

6. If Jest or Vue Test Utils is not installed properly:
npm install --save-dev jest @vue/test-utils
OR
npm install --save-dev @vue/vue3-jest

7. npx jest src/test/unit/PaymentForm.logic.test.js --config=jest.jsconfig.json
To run the test files, change the file names accordingly
