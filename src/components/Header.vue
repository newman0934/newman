<template>
  <nav class="navbar navbar-expand-lg fixed-top text-white">
    <div class="container">
      <router-link class="navbar-brand text-primary" to="/">NEWMAN</router-link>
      <button
        class="navbar-toggler text-white"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/products">商品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/cart">購物車</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/login">登入</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style lang="scss">
.navbar {
  background: rgba(0, 0, 0, 0.5);
  .navbar-brand {
    font-family: 'Berkshire Swash', cursive;
  }
  .navbar-toggler {
    border: 1px solid #fff;
  }
  .nav-link {
    position: relative;
    &:after {
      transition: all 1s;
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 0%;
      height: 2px;
      background: #ffa042;
    }
    &:hover:after {
      width: 100%;
    }
  }
}
</style>
