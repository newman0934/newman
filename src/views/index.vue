<template>
  <div>
    <Header></Header>
    <div class="hero-header h-screen mb-15 bg-dark">
      <div
        class="container d-flex flex-column justify-content-center position-relative vh-100"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <h1 class="fs-1 mb-10">肌肉是你最好的衣服</h1>
        <h2 class="fs-3 mb-10">肌肉的線條可以讓您穿衣更好看</h2>
        <div class="btn-group">
          <a class="btn btn-outline-light me-5 btn-lg">前往部落格</a>
          <router-link to="/products" class="btn btn-primary ms-5 btn-lg">前往商城</router-link>
        </div>
      </div>
      <i class="bi bi-arrow-down-circle fs-3 position-absolute bottom-0 start-50"></i>
    </div>
    <div class="container mb-15">
      <h1 class="text-center mb-8 bg-slate-600">重訓不只會身材變好</h1>
      <p class="text-center mb-10">重訓除了身材變好之外，還有其他的好處，以下列出四點重訓對於身體與其他方面的好處</p>
      <ul class="ps-0">
        <li class="row g-0">
          <div class="col-md-6" data-aos="fade-up">
            <img src="../assets/images/advantage1.jpg" alt="advantage1" />
          </div>
          <div class="col-md-6 d-flex flex-column justify-content-center" data-aos="fade-up">
            <h2 class="text-center mt-5">心情變好</h2>
            <p class="p-10">當我們在重訓的時候，我們大腦內會分泌多巴胺與腦內啡，這些可以讓我們在運動中的不適感降低並讓我們心情愉悅。</p>
          </div>
        </li>
        <li class="row g-0 flex-md-row-reverse">
          <div class="col-md-6" data-aos="fade-up">
            <img src="../assets/images/advantage2.jpg" alt="advantage2" />
          </div>
          <div class="col-md-6 d-flex flex-column justify-content-center" data-aos="fade-up">
            <h2 class="text-center mt-5">增強記憶力</h2>
            <p class="p-10">有運動習慣的人，心智功能、短期與長期記憶力、口語能力與專注能力都會有一定程度的提升。</p>
          </div>
        </li>
        <li class="row g-0">
          <div class="col-md-6" data-aos="fade-up">
            <img src="../assets/images/advantage3.jpg" alt="advantage3" />
          </div>
          <div class="col-md-6 d-flex flex-column justify-content-center" data-aos="fade-up">
            <h2 class="text-center mt-5">強化骨骼</h2>
            <p class="p-10">重訓可以提升骨骼密度，防止骨質疏鬆症，減緩身體老化程度。</p>
          </div>
        </li>
        <li class="row flex-md-row-reverse g-0">
          <div class="col-md-6" data-aos="fade-up">
            <img src="../assets/images/advantage4.jpg" alt="advantage4" />
          </div>
          <div class="col-md-6 d-flex flex-column justify-content-center" data-aos="fade-up">
            <h2 class="text-center mt-5">增加自信</h2>
            <p class="p-10">當我們身體線條越來越明顯，自然而然就會增加自信心，因為肌肉量提升，我們的體態會自然的挺立。</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="container mb-15">
      <h1 class="fs-1 text-center mb-5">不只是訓練</h1>
      <p class="text-center mb-10">除了訓練以外，吃與睡也都很重要喔！</p>
      <ul class="row">
        <li class="col-md-4 mb-10">
          <div class="card shadow" data-aos="fade-up">
            <img src="../assets/images/eat.jpg" class="card-img img-object-cover" alt="eat" />
            <div class=" p-5">
              <h5 class="card-title text-center fs-3 mb-5">怎麼吃</h5>
              <p
                class="card-text"
              >吃七成，練三成，要增長肌肉吃比練還要重要，當我們練完後肌肉的生長需要足夠的蛋白質與熱量去生長，我們的線上商城會提供您足夠的營養補充品。</p>
              <router-link
                to="/products"
                href="#"
                type="button"
                class="btn btn-outline-primary w-100"
              >前往商城</router-link>
            </div>
          </div>
        </li>
        <li class="col-md-4 mb-10">
          <div class="card shadow" data-aos="fade-up" data-aos-delay="500">
            <img
              src="../assets/images/traning.jpg"
              class="card-img img-object-cover"
              alt="training"
            />
            <div class="p-5">
              <h5 class="card-title text-center fs-3 mb-5">怎麼練</h5>
              <p
                class="card-text"
              >不管是在家訓練、前往健身房還是街頭訓練，良好的護具能夠讓您事半功倍，不用再擔心受傷而盡全力訓練，我們的線上商城會提供給您足夠的保護。</p>
              <router-link
                to="/products"
                href="#"
                type="button"
                class="btn btn-outline-primary w-100"
              >前往商城</router-link>
            </div>
          </div>
        </li>
        <li class="col-md-4 mb-10">
          <div class="card shadow" data-aos="fade-up" data-aos-delay="1000">
            <img src="../assets/images/sleep.jpg" class="card-img img-object-cover" alt="sleep" />
            <div class="p-5">
              <h5 class="card-title text-center fs-3 mb-5">怎麼睡</h5>
              <p class="card-text">足夠的營養與訓練雖然對肌肉成長有很重要的影響，但是肌肉的修復與成長是在睡眠的時候，怎麼睡也很重要，我們的部落格會提供您相關的知識。</p>
              <a href="#" class="btn btn-outline-primary w-100">前往部落格</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="subscription py-15 text-white">
      <div class="container" data-aos="fade-up">
        <h1 class="fs-1 mb-10">請訂閱我們</h1>
        <h2 class="fs-3 mb-10">我們會定期提供優惠商品與最新的文章</h2>
        <div class="input-group input-group-lg mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="請輸入您的電子郵件信箱"
            aria-label="請輸入您的電子郵件信箱"
          />
          <button class="btn btn-outline-primary" type="button">送出</button>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  components: {
    Header,
    Footer
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
// .hero-header {
//   background: url('../assets/images/hero_header.jpg') no-repeat top center;
//   background-attachment: fixed;
//   background-size: cover;
//   @include mobile {
//     background-position: top right;
//   }
//   h1,
//   h2,
//   .bi-arrow-down-circle {
//     color: white;
//   }
//   .bi-arrow-down-circle {
//     animation: down 0.5s infinite;
//   }
// }

// .btn-group,
// .input-group {
//   width: 50%;
//   @include mobile {
//     width: 100%;
//   }
// }

.subscription {
  background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)),
    url('../assets/images/subscription.jpg') no-repeat center top;
  background-attachment: fixed;
  border-style: cover;
}

@keyframes down {
  from {
    transform: translateY(-10px);
  }
  to {
    transform: translateY(0px);
  }
}
</style>
