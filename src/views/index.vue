<template>
    <Header></Header>
    <div class="hero-header h-screen mb-16">
      <div
        class="xl:max-container flex flex-col justify-center relative h-screen mx-auto"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <h1 class="text-5xl mb-10 text-white">肌肉是你最好的衣服</h1>
        <h2 class="text-4xl mb-10 text-white">肌肉的線條可以讓您穿衣更好看</h2>
        <div class="flex">
          <a class="w-[20%] text-2xl border-2 border-white rounded text-center py-3 text-white hover:bg-primary hover:border-primary transition mr-5">前往部落格</a>
          <router-link to="/products" class="w-[20%] bg-primary rounded text-2xl py-3 text-center hover:text-white hover:bg-black hover:border-white border-primary border-2 transition">前往商城</router-link>
        </div>
      </div>
      <ArrowCircleDownIcon class="text-white absolute w-10 h-10 bottom-2 left-[50%] arrow-down"/>
    </div>
    <div class="xl:max-container mx-auto mb-16">
      <h1 class="text-center text-5xl mb-8">重訓不只會身材變好</h1>
      <p class="text-center mb-10">重訓除了身材變好之外，還有其他的好處，以下列出四點重訓對於身體與其他方面的好處</p>
      <ul class="ps-0">
        <li class="flex">
          <div class="w-[50%]" data-aos="fade-up">
            <img src="../assets/images/advantage1.jpg" alt="advantage1" />
          </div>
          <div class="w-[50%] flex flex-col justify-center" data-aos="fade-up">
            <h2 class="text-center text-4xl mt-5">心情變好</h2>
            <p class="p-10">當我們在重訓的時候，我們大腦內會分泌多巴胺與腦內啡，這些可以讓我們在運動中的不適感降低並讓我們心情愉悅。</p>
          </div>
        </li>
        <li class="flex flex-row-reverse">
          <div class="w-[50%]" data-aos="fade-up">
            <img src="../assets/images/advantage2.jpg" alt="advantage2" />
          </div>
          <div class="w-[50%] flex flex-col justify-center" data-aos="fade-up">
            <h2 class="text-center text-4xl mt-5">增強記憶力</h2>
            <p class="p-10">有運動習慣的人，心智功能、短期與長期記憶力、口語能力與專注能力都會有一定程度的提升。</p>
          </div>
        </li>
        <li class="flex">
          <div class="w-[50%]" data-aos="fade-up">
            <img src="../assets/images/advantage3.jpg" alt="advantage3" />
          </div>
          <div class="w-[50%] flex flex-col justify-center" data-aos="fade-up">
            <h2 class="text-center text-4xl mt-5">強化骨骼</h2>
            <p class="p-10">重訓可以提升骨骼密度，防止骨質疏鬆症，減緩身體老化程度。</p>
          </div>
        </li>
        <li class="flex flex-row-reverse">
          <div class="w-[50%]" data-aos="fade-up">
            <img src="../assets/images/advantage4.jpg" alt="advantage4" />
          </div>
          <div class="w-[50%] flex flex-col justify-center" data-aos="fade-up">
            <h2 class="text-center text-4xl mt-5">增加自信</h2>
            <p class="p-10">當我們身體線條越來越明顯，自然而然就會增加自信心，因為肌肉量提升，我們的體態會自然的挺立。</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="xl:max-container mx-auto mb-15">
      <h1 class="text-5xl text-center mb-5">不只是訓練</h1>
      <p class="text-center mb-10">除了訓練以外，吃與睡也都很重要喔！</p>
      <ul class="flex justify-between">
        <li class="mb-10 w-[32%] border-2 rounded-xl overflow-hidden">
          <div class="shadow" data-aos="fade-up">
            <img src="../assets/images/eat.jpg" alt="eat" />
            <div class=" p-5">
              <h5 class="text-center text-4xl mb-5">怎麼吃</h5>
              <p>吃七成，練三成，要增長肌肉吃比練還要重要，當我們練完後肌肉的生長需要足夠的蛋白質與熱量去生長，我們的線上商城會提供您足夠的營養補充品。</p>
              <router-link
                to="/products"
                href="#"
                type="button"
                class="border-primary text-primary border-2 rounded-md text-center py-1 w-full mt-5 hover:bg-primary hover:text-white"
              >前往商城</router-link>
            </div>
          </div>
        </li>
        <li class="mb-10 w-[32%] border-2 rounded-xl overflow-hidden">
          <div class="shadow" data-aos="fade-up" data-aos-delay="500">
            <img
              src="../assets/images/traning.jpg"
              alt="training"
            />
            <div class="p-5">
              <h5 class="text-center text-4xl mb-5">怎麼練</h5>
              <p>不管是在家訓練、前往健身房還是街頭訓練，良好的護具能夠讓您事半功倍，不用再擔心受傷而盡全力訓練，我們的線上商城會提供給您足夠的保護。</p>
              <router-link
                to="/products"
                href="#"
                type="button"
                class="border-primary text-primary border-2 rounded-md text-center py-1 w-full mt-5 hover:bg-primary hover:text-white"
              >前往商城</router-link>
            </div>
          </div>
        </li>
        <li class="mb-10 w-[32%] border-2 rounded-xl overflow-hidden">
          <div class="shadow" data-aos="fade-up" data-aos-delay="1000">
            <img src="../assets/images/sleep.jpg" alt="sleep" />
            <div class="p-5">
              <h5 class="text-center text-4xl mb-5">怎麼睡</h5>
              <p>足夠的營養與訓練雖然對肌肉成長有很重要的影響，但是肌肉的修復與成長是在睡眠的時候，怎麼睡也很重要，我們的部落格會提供您相關的知識。</p>
              <a href="#" class="border-primary text-primary border-2 rounded-md text-center py-1 w-full mt-5 hover:bg-primary hover:text-white" type="button">前往部落格</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="subscription py-16 text-white">
      <div class="xl:max-container mx-auto" data-aos="fade-up">
        <h1 class="text-5xl mb-10">請訂閱我們</h1>
        <h2 class="text-3xl mb-10">我們會定期提供優惠商品與最新的文章</h2>
        <div class="mb-3">
          <input
            type="text"
            class="form-control rounded-l-md w-[30%] text-black"
            placeholder="請輸入您的電子郵件信箱"
            aria-label="請輸入您的電子郵件信箱"
          />
          <button class="rounded-r-md border-[1px] border-primary py-2 px-4 text-primary hover:bg-primary hover:text-white" type="button">送出</button>
        </div>
      </div>
    </div>
    <Footer></Footer>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ArrowCircleDownIcon } from '@heroicons/vue/outline'
export default {
  components: {
    Header,
    Footer,
    ArrowCircleDownIcon
  }
}
</script>
<style lang="scss" scoped>
.hero-header {
  background: url('../assets/images/hero_header.jpg') no-repeat top center;
  background-attachment: fixed;
  background-size: cover;
}
.subscription {
  background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)),
    url('../assets/images/subscription.jpg') no-repeat center top;
  background-attachment: fixed;
}
.arrow-down{
  animation: down .5s infinite;
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
