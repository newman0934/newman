<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container">
      <router-link class="navbar-brand" to="/">NEWMAN</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/products">線上商城</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">聯絡我們</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">購物車</router-link>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">登入</a>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>
