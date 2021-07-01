import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/index'
import Products from '@/views/products'
import Product from '@/views/product'
import Cart from '@/views/cart'
import Checkout from '@/views/checkout'
import Contact from '@/views/contact'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/products/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/checkout/:id',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
