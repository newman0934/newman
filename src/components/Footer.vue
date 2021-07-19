<template>
  <footer class>
    <div class="container pt-15 pb-5">
      <div class="row">
        <div class="col-md-4 brand text-primary">
          <h3>NEWMAN</h3>
        </div>
        <div class="col-md-4 text-white">
          <h3 class="mb-10 d-none d-md-block">聯絡我們</h3>
          <ul>
            <li class="lh-lg">
              <i class="bi bi-telephone pe-3"></i>（02）87975566
            </li>
            <li class="lh-lg">
              <i class="bi bi-house-door pe-3"></i>新北市新店區北新路六段 236 號 15 樓
            </li>
            <li class="lh-lg">
              <i class="bi bi-envelope pe-3"></i>support@newman.com
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <h3 class="mb-10 text-white d-none d-md-block">社群媒體</h3>
          <ul class="d-flex">
            <li>
              <a href="#" class="social-link">
                <i class="bi bi-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#" class="social-link">
                <i class="bi bi-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#" class="social-link">
                <i class="bi bi-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p class="text-center text-white">Copyright by caesar wang</p>
    <p class="mb-0 text-center text-white pb-5">個人作業練習用，並無使用於商業用途</p>
  </footer>
</template>
<style lang="scss" scoped>
footer {
  background: #000;
  .brand {
    font-family: 'Berkshire Swash', cursive;
  }
  .social-link {
    color: white;
    margin-right: 2rem;
    transition: color 0.5s;
    font-size: 2rem;
    &:hover {
      color: #ffa042;
    }
  }
}
</style>
