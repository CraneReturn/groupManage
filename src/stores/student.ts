import { defineStore } from 'pinia';
import { getOwnGroupInfo, getOwnInfo } from '@/api/student'; // 导入 API
import { ref } from 'vue';

// 定义 GroupInfo 和 UserInfo 类型
type GroupInfo = {
  groupName: string;
  groupIntro: string;
}

type UserInfo = {
  userName: string;
  userEmail: string;
}

// 定义 Pinia Store
export const useGroupStore = defineStore('group', () => {
  const groupInfo = ref<GroupInfo | null>(null);
  const userInfo = ref<UserInfo | null>(null);

  // 同时获取组信息和用户信息的 Action
  const fetchGroupAndUserInfo = async () => {
    try {
      // 并行调用两个 API
      const [groupResponse, userResponse] = await Promise.all([
        getOwnGroupInfo(),
        getOwnInfo(),
      ]);

      // 设置组信息和用户信息
      groupInfo.value = groupResponse.data; // 假设返回数据在 response.data
      userInfo.value = userResponse.data; // 假设返回数据在 response.data
    } catch (error) {
      console.error('获取信息失败：', error);
    }
  };

  return {
    groupInfo,
    userInfo,
    fetchGroupAndUserInfo,
  };
});
