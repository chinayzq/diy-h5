<template>
  <div class="stickers-dialog">
    <var-tabs v-model:active="active">
      <var-tab
        v-for="tab in tabs"
        :key="tab.src"
        color="var(--color-primary)"
        active-color="#fff"
        inactive-color="hsla(0, 0%, 100%, .6)"
      >
        <var-image
          width="40px"
          height="40px"
          lazy
          loading="/src/assets/images/img_loading.svg"
          :src="tab.src"
        />
      </var-tab>
    </var-tabs>
    <div>
      {{ active }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const active = ref(0);
const tabs = ref([
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-4-12/bda293c0-d590-458a-b960-0993926fed21.png",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/5086661f-9fd1-41b4-a45b-4cd88b2a6f7f_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/b6b693b0-ebce-4825-9652-061f79e7bfd7_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/d0fb1a5b-5c68-4997-ab30-169a6a21d7b7_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/6e1b937d-8540-47a9-bca6-0ba0d1498cda_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/a563e227-1979-427d-a6a6-2960644f11d8_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-9-18/1f345ccf-d01e-412b-ba9e-fd0e2dc48ac1_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-9-18/2f4933a8-60c3-4bf1-97e4-a2607167f503_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/b6b693b0-ebce-4825-9652-061f79e7bfd7_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/d0fb1a5b-5c68-4997-ab30-169a6a21d7b7_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/6e1b937d-8540-47a9-bca6-0ba0d1498cda_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/a563e227-1979-427d-a6a6-2960644f11d8_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-9-18/1f345ccf-d01e-412b-ba9e-fd0e2dc48ac1_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-9-18/2f4933a8-60c3-4bf1-97e4-a2607167f503_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/b6b693b0-ebce-4825-9652-061f79e7bfd7_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/d0fb1a5b-5c68-4997-ab30-169a6a21d7b7_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/6e1b937d-8540-47a9-bca6-0ba0d1498cda_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/a563e227-1979-427d-a6a6-2960644f11d8_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-9-18/1f345ccf-d01e-412b-ba9e-fd0e2dc48ac1_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-9-18/2f4933a8-60c3-4bf1-97e4-a2607167f503_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/b6b693b0-ebce-4825-9652-061f79e7bfd7_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/d0fb1a5b-5c68-4997-ab30-169a6a21d7b7_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/6e1b937d-8540-47a9-bca6-0ba0d1498cda_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/a563e227-1979-427d-a6a6-2960644f11d8_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-9-18/1f345ccf-d01e-412b-ba9e-fd0e2dc48ac1_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-9-18/2f4933a8-60c3-4bf1-97e4-a2607167f503_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/b6b693b0-ebce-4825-9652-061f79e7bfd7_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/d0fb1a5b-5c68-4997-ab30-169a6a21d7b7_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/6e1b937d-8540-47a9-bca6-0ba0d1498cda_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/a563e227-1979-427d-a6a6-2960644f11d8_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-9-18/1f345ccf-d01e-412b-ba9e-fd0e2dc48ac1_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-9-18/2f4933a8-60c3-4bf1-97e4-a2607167f503_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/b6b693b0-ebce-4825-9652-061f79e7bfd7_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/d0fb1a5b-5c68-4997-ab30-169a6a21d7b7_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/6e1b937d-8540-47a9-bca6-0ba0d1498cda_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-7-3/a563e227-1979-427d-a6a6-2960644f11d8_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-9-18/1f345ccf-d01e-412b-ba9e-fd0e2dc48ac1_s.PNG",
  },
  {
    src: "https://oss.data.ideaskins.com.cn/diy/2023-9-18/2f4933a8-60c3-4bf1-97e4-a2607167f503_s.PNG",
  },
]);
</script>

<style lang="less" scoped>
.stickers-dialog {
  height: 275px;
  width: 100%;
}
</style>