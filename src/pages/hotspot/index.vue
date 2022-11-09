<template>
  <q-page class="fit overflow-auto q-pa-sm">
    <q-card class=" q-mb-md q-pa-sm" bordered>
      <q-card-section class="q-pt-none">
        <div class="text-h6">微博热点</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div
          v-for="item in wbList"
          :key="item.keyword"
          class="text-overline flex items-center"
          @click="handleClick(item.url)"
        >
          <span class="flex-1 text">{{ `${item.rank}.${item.keyword}` }}</span>
          <span v-if="item.isBoil" class="text-icon boil">沸</span>
          <span v-if="item.isHot" class="text-icon hot">热</span>
          <span v-if="item.isNew" class="text-icon new">新</span>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { apiWeibo } from "src/api/coderutil.js";

export default {
  name: "Hotspot",
  data() {
    const baseList = [
      {
        hotValue: null,
        isBoil: true,
        isHot: true,
        isNew: true,
        keyword: "直播解读二十大报告",
        rank: 1,
        summary: null,
        type: null,
        url: "https://s.weibo.com/weibo?q=%23%E7%9B%B4%E6%92%AD%E8%A7%A3%E8%AF%BB%E4%BA%8C%E5%8D%81%E5%A4%A7%E6%8A%A5%E5%91%8A%23&Refer=new_time",
      },
      {
        hotValue: 614244,
        isBoil: false,
        isHot: false,
        isNew: true,
        keyword: "共同富裕不是平均主义不是劫富济贫",
        rank: 2,
        summary: null,
        type: null,
        url: "https://s.weibo.com/weibo?q=%23%E5%85%B1%E5%90%8C%E5%AF%8C%E8%A3%95%E4%B8%8D%E6%98%AF%E5%B9%B3%E5%9D%87%E4%B8%BB%E4%B9%89%E4%B8%8D%E6%98%AF%E5%8A%AB%E5%AF%8C%E6%B5%8E%E8%B4%AB%23&t=31&band_rank=1&Refer=top",
      },
    ];

    return {
      wbList: [...baseList],
    };
  },
  methods: {
    /** 获取数据 */
    async getWeiboData() {
      this.$q.loading.show();
      try {
        const res = await apiWeibo();
        if (res.status === 200) {
          this.wbList = [...res.data];
          this.$store.commit("myData/updateWbData", [...res.data]);
        } else {
          throw "error";
        }
      } catch (error) {
        this.$q.notify({
          position: "top",
          message: `发生了不可描述的问题`,
          color: "warning",
        });
      } finally {
        this.$q.loading.hide();
      }
    },
    handleClick(url) {
      if (url) {
        // window.open(url)
        window.location.href = url;
      }
    },
  },
  mounted() {
    const data = this.$store.state.myData.wbData;
    if (data?.length < 1) {
      this.getWeiboData();
    } else {
      this.wbList = [...data];
    }
  },
};
</script>

<style lang="scss" scoped>
.text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.text-icon {
  margin: 0 2px;
  width: 16px;
  height: 16px;
  line-height: 16px;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  &.boil {
    background: #b71c1c;
  }
  &.hot {
    background: #e53935;
  }
  &.new {
    background: #1976d2;
  }
}
</style>
