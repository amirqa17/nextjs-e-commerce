# E-Commerce Platform with Next.js, Tailwind CSS, and FreedomPay API
## Please note that this project will be reviewed monthly/weekly, when I have time. 
There are plenty of things that will be fixed (mainly layout and the structure of the project itself).
Please stay updated on the changes as there are a lot of interesting things that can be done to improve the project significantly.

## Project Overview

This project showcases an E-commerce platform developed with Next.js, utilizing Tailwind CSS, Lazy Loading, and integration with the FreedomPay API. Reviews and items are efficiently stored in Firebase's Firestore database.

## Brief Use Case of this Project

### Items

- Users can seamlessly view all items with brief descriptions and prices.
- Intuitive sorting options enable users to categorize items by category.
- Detailed individual pages for each item provide a comprehensive view with full descriptions and image galleries.

### Reviews

- Users can effortlessly view reviews and ratings on individual item pages.
- Interactive features allow users to leave their own reviews and ratings.

### Cart

- Users can easily add items to their cart.
- A user-friendly cart interface allows users to view all items added to the cart.
- Users can proceed to checkout from the cart.
- Admins receive detailed email notifications, including a list of items, order ID, delivery address, individual and total prices upon completion of an order.

### Checkout

- Users can review their orders, including a list of items.
- Users can fill in delivery information.
- Users can seamlessly proceed to the payment page.

### Payment

- Users can pay for orders using VISA/MasterCard debit/credit cards and Samsung Pay.

## Setting up the Environment

1. **Clone this Project:**
    ```bash
    git clone https://github.com/amirqa17/nextjs-e-commerce.git
    ```

2. **Install packages:**
    ```bash
    npm install
    ```

3. **Create 2 collections in your Firestore:**
   - `items` with the following fields:
     ```bash
     available (Boolean)
     briefcontent (String)
     category (String)
     complect (String)
     description (String)
     id (Number)
     image (String)
     images (Array)
     imagesItem (Array)
     manufacturer (String)
     name (String)
     price (String)
     slug (String)
     type (String)
     ```

   - `product_reviews` with the following fields:
     ```bash
     createdAt (Timestamp)
     email (String)
     phone (String)
     product_slug (String)
     rating (Number)
     review_text (String)
     review_title (String)
     username (String)
     ```

4. **Set up your credentials for the database in `Firebase.js`.**
5. **Set up your credentials for FreedomPay in `Freedompay.js`.**
6. **Set up your credentials for SendinBlue Email notifications in `Checkout.js`.**
7. **Run the development server:**
    ```bash
    npm run dev
    ```
  
