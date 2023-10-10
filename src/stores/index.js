import { defineStore } from 'pinia';
import { ref } from 'vue';
import { judgeClient } from '@/utils';
export const useStore = defineStore('counter', () => {
  const client = ref(judgeClient());

  return { client };
});
