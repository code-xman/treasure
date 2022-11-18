<template>
  <q-page class="fit overflow-auto q-pa-sm">
    <q-card
      v-for="cardItem in hotList"
      :key="cardItem.key"
      class="q-mb-md q-pa-sm"
      bordered
    >
      <q-card-section class="q-pt-none">
        <div class="text-h6">{{ cardItem.name }}</div>
      </q-card-section>
      <q-card-section v-if="cardItem.data.length > 0" class="q-pt-none">
        <div
          v-for="item in cardItem.data"
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
      <q-card-section v-else class="q-pt-none">暂无数据</q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { apiWeibo, apiZhihu, apiBaidu, apiToutiao } from "src/api/coderutil.js";

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
      zhList: [],
      bdList: [],
      ttList: [],
    };
  },
  computed: {
    hotList() {
      return [
        { name: "微博热点", key: "wb", data: this.wbList },
        { name: "知乎热点", key: "zh", data: this.zhList },
        { name: "百度热点", key: "bd", data: this.bdList },
        { name: "头条热点", key: "tt", data: this.ttList },
      ];
    },
  },
  methods: {
    /** 获取数据 */
    async getWeiboData() {
      try {
        const res = await apiWeibo();
        if (res.status === 200) {
          this.wbList = [...res.data];
        } else {
          throw "error";
        }
      } catch (error) {
        throw "获取微博热点失败";
      }
    },
    /** 获取数据 */
    async getZhihuData() {
      try {
        const res = await apiZhihu();
        if (res.status === 200) {
          this.zhList = [...res.data];
        } else {
          throw "error";
        }
      } catch (error) {
        throw "获取知乎热点失败";
      }
    },
    /** 获取数据 */
    async getBaiduData() {
      try {
        const res = await apiBaidu();
        if (res.status === 200) {
          this.bdList = [...res.data];
        } else {
          throw "error";
        }
      } catch (error) {
        throw "获取百度热点失败";
      }
    },
    /** 获取数据 */
    async getToutiaoData() {
      try {
        const res = await apiToutiao();
        if (res.status === 200) {
          this.ttList = [...res.data];
        } else {
          throw "error";
        }
      } catch (error) {
        throw "获取头条热点失败";
      }
    },
    handleClick(url) {
      if (url) {
        // window.open(url)
        window.location.href = url;
      }
    },
  },
  async mounted() {
    const { wbData, zhData, bdData, ttData } = this.$store.state.myData.hotData;
    if (wbData?.length < 1) {
      try {
        this.$q.loading.show();
        await this.getWeiboData();
        await this.getZhihuData();
        await this.getBaiduData();
        await this.getToutiaoData();

        this.$store.commit("myData/updateHotData", {
          wbData: this.wbList,
          zhData: this.zhList,
          bdData: this.bdList,
          ttData: this.ttList,
        });
      } catch (error) {
        this.$q.notify({
          position: "top",
          message: `${error}`,
          color: "warning",
        });
      } finally {
        this.$q.loading.hide();
      }
    } else {
      this.wbList = [...wbData];
      this.zhList = [...zhData];
      this.bdList = [...bdData];
      this.ttList = [...ttData];
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
  padding-left: 2px;
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
