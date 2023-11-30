<template>
  <div class="common-footer">
    <var-row>
      <var-col
        :span="12"
        v-for="(item, index) in linkList"
        :key="index"
        class="single-item"
        @click="openPage(item)"
      >
        <span> {{ item.label }} > </span>
      </var-col>
    </var-row>
  </div>
</template>

<script setup>
import { ref } from "vue";

const openPage = ({ id }) => {
  const url = `${location.origin}${location.pathname}#/common?id=${id}`;
  window.open(url, "_self");
};
const linkList = ref([
  {
    label: "about us",
    id: 6,
  },
  {
    label: "contact us",
    id: 5,
  },
  {
    label: "Returnd & Refunds",
    id: 4,
  },
  {
    label: "Terms & Conditions",
    id: 3,
  },
  {
    label: "Shipping & Delivery",
    id: 2,
  },
  {
    label: "Privacy Policy",
    id: 1,
  },
]);
</script>

<style lang="less" scoped>
.common-footer {
  border-top: 1px solid #ccc;
  .single-item {
    cursor: pointer;
    margin-top: 10px;
    font-size: 14px;
    font-family: "JostMedium";
    text-decoration: underline;
  }
}
</style>