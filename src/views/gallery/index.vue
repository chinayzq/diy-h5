<template>
  <div class="gallery-component">
    <div class="header-container">
      <div class="header-icon"></div>
      <span class="first-title">INDIVISUAL's Gallery</span>
      <span class="second-title">Trending Templates</span>
    </div>
    <div class="list-container">
      <div class="single-card" v-for="item in cardList" :key="item">
        <img
          class="card-image"
          src="../../assets/images/gallery_example.webp"
          alt=""
        />
        <span class="views-span">
          {{ `${item.views} views` }}
        </span>
        <div class="bottom-line">
          <img class="icon-image" src="@/assets/images/icon_small.png" alt="" />
          <span class="price-span">{{ item.price }}</span>
          <span class="diy-button">Diy it</span>
        </div>
      </div>
    </div>
    <div class="create-button" @click="jumpToWorkBench">Explore more</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const cardList = ref([
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
  {
    name: "1",
    views: "18.9K",
    price: "30.00USD",
  },
]);

const router = useRouter();
const jumpToWorkBench = () => {
  router.push({
    path: "/workbench",
  });
};
</script>

<style lang="less" scoped>
.gallery-component {
  height: 100%;
  overflow: hidden auto;
  .header-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 170px;
    justify-content: space-evenly;
    padding-top: 40px;
    box-sizing: border-box;
    font-family: "JostMedium";
    margin: 0 20px;
    border-bottom: 1px solid #000;
    .header-icon {
      height: 60px;
      width: 60px;
      background: url("../../assets/images/main_icon.png");
      background-size: 100% 100%;
    }
    .first-title {
      font-size: 18px;
    }
    .second-title {
      font-size: 14px;
    }
  }
  .list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    margin: 18px;
    .single-card {
      height: 330px;
      width: 156px;
      position: relative;
      .card-image {
        width: 100%;
        height: 290px;
      }
      .views-span {
        width: 90px;
        height: 30px;
        border-radius: 30px;
        background-color: #000;
        position: absolute;
        bottom: 60px;
        right: 15px;
        opacity: 0.8;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        white-space: nowrap;
      }
      .bottom-line {
        height: 40px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .price-span {
          font-size: 14px;
        }
        .diy-button {
          height: 24px;
          line-height: 24px;
          text-align: center;
          width: 55px;
          background: #fff;
          border-radius: 24px;
          font-size: 14px;
          color: #d8201c;
          font-family: "JostMedium";
        }
        .icon-image {
          height: 20px;
          width: 20px;
        }
      }
    }
  }
  .create-button {
    position: fixed;
    bottom: 75px;
    width: 150px;
    height: 40px;
    left: calc(50% - 75px);
    background-color: #e73295;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 40px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
  }
}
</style>