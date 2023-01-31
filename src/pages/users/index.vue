<template>
  <q-page class="fit column q-pa-sm">
    <div class="text-h6 text-center">账户一览表</div>
    <div class="flex-1 overflow-auto">
      <q-markup-table separator="cell" flat bordered>
        <thead>
          <tr>
            <th class="text-center">账号</th>
            <th class="text-center">密码</th>
            <th class="text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in userList" :key="item.code">
            <td class="text-center">{{ item.name }}</td>
            <td class="text-center">{{ handlePassword(item) }}</td>
            <td class="text-center flex">
              <q-btn flat color="primary" @click="() => handleDetail(item)">
                {{ item.showPassword ? "隐藏" : "查看" }}
              </q-btn>
              <Copy :showIcon="false" :content="item.password">
                <template #icon>
                  <q-btn flat color="primary"> 复制 </q-btn>
                </template>
              </Copy>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
import Copy from "@/components/Copy.vue";
import { userData } from "@/data/base";

export default {
  name: "users",
  components: { Copy },
  data() {
    return {
      userData,
      userList: [],
    };
  },
  methods: {
    handlePassword(item) {
      if (item.showPassword) return item.password;
      return item.password.replace(/./g, "*");
    },
    handleDetail(item) {
      this.userList.find((user) => user.code === item.code).showPassword =
        !item.showPassword;
    },
  },
  mounted() {
    this.userList = this.userData.map((item) => {
      return {
        ...item,
        showPassword: false,
      };
    });
  },
};
</script>

<style lang="scss" scoped></style>
