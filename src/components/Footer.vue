<template>
  <footer class>
    <div class="xl:max-container mx-auto pt-16 pb-10">
      <div class="flex justify-between">
        <div class=" brand text-primary text-4xl">
          <h3>NEWMAN</h3>
        </div>
        <div class=" text-white">
          <h3 class="mb-10 text-4xl">聯絡我們</h3>
          <ul class="space-y-3">
            <li class="flex items-center">
              <PhoneIcon class="w-4 h-4 mr-3"/>（02）87975566
            </li>
            <li class="flex items-center">
              <HomeIcon class="w-4 h-4 mr-3"/>新北市新店區北新路六段 236 號 15 樓
            </li>
            <li class="flex items-center">
              <MailIcon class="w-4 h-4 mr-3"/>support@newman.com
            </li>
          </ul>
        </div>
        <div class="">
          <h3 class="mb-10 text-white text-4xl">社群媒體</h3>
          <ul class="flex space-x-6">
            <li>
              <a href="#" class="text-white text-4xl hover:text-primary duration-700">
                <i class="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#" class="text-white text-4xl hover:text-primary duration-700">
                <i class="fab fa-twitter-square"></i>
              </a>
            </li>
            <li>
              <a href="#" class="text-white text-4xl hover:text-primary duration-700">
                <i class="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p class="text-center text-white pb-5">Copyright by caesar wang</p>
    <p class="text-center text-white pb-5">個人作業練習用，並無使用於商業用途</p>
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
<script>
import { PhoneIcon, MailIcon, HomeIcon } from '@heroicons/vue/outline'
export default {
  components: {
    PhoneIcon,
    MailIcon,
    HomeIcon
  }
}
</script>
