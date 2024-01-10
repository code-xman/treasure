<template>
  <q-page class="fit overflow-auto">
    <q-card
      v-for="item in cardList"
      :key="item"
      class="q-ma-sm my_card"
      :style="{ backgroundImage: cardData[item].backgroundImage }"
    >
      <q-card-section>
        <div class="text-h6 q-mb-sm">{{ cardData[item].title }}</div>
        <div v-if="cardData[item].text" class="text-subtitle2">
          {{ cardData[item].text }}
        </div>
      </q-card-section>
      <q-card-section v-if="cardData[item].from" class="text-right">
        {{ `${cardData[item].from_who} 《${cardData[item].from}》` }}
      </q-card-section>
      <q-btn
        v-if="item === 'articleObj'"
        flat
        rounded
        color="white"
        label="查看全文"
        @click="() => (showContentFlag = true)"
      />
    </q-card>
    <q-dialog v-model="showContentFlag" maximized>
      <q-card class="fit column">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ cardData.articleObj.from }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="flex-1 overflow-auto">
          <div v-html="cardData.articleObj.content"></div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { toDateString } from "xe-utils";
import { apiChp, apiDu } from "src/api/shadiao";
import {
  apiHitokoto,
  apiArticleRandom,
  apiAlapiOne,
} from "src/api/publicInterface";

export default {
  name: "one",
  data() {
    return {
      typeObj: {
        chp: "彩虹糖",
        du: "毒鸡汤",
        hitokoto: "一言",
        article: "一文",
      },
      cardList: ["chpObj", "duObj", "hitokotoObj", "articleObj"],
      cardData: {
        chpObj: {
          key: "chp",
          title: "彩虹糖",
          backgroundImage:
            "linear-gradient(25deg, #33c6dd, #8ab7c9, #b7a7b5, #d894a1)",
          text: "",
        },
        duObj: {
          key: "du",
          title: "毒鸡汤",
          backgroundImage:
            "linear-gradient(25deg, #16111f, #344e4d, #509481, #6ce0b8)",
          text: "",
        },
        hitokotoObj: {
          key: "hitokoto",
          title: "一言",
          backgroundImage:
            "linear-gradient(25deg, #d85141, #c0826c, #96a99a, #17cdca)",
          text: "",
          from: "",
          from_who: "",
        },
        articleObj: {
          key: "article",
          title: "一文",
          backgroundImage:
            "linear-gradient(25deg, #25b2db, #72b9bd, #97c19f, #b1c97f)",
          text: "",
          from: "",
          from_who: "",
          content: "",
        },
      },
      showContentFlag: false,
    };
  },
  methods: {
    async init() {
      this.$q.loading.show();
      try {
        await this.getChp();
        await this.getDu();
        await this.getHitokoto();
        await this.getArticleDay();
      } catch (error) {
        this.$q.notify({
          position: "top",
          message: `${this.typeObj[error]}发生了不可描述的问题`,
          color: "warning",
        });
      } finally {
        this.$store.commit("myData/updateOneData", {
          ...this.cardData,
          hasData: true,
        });
        this.$q.loading.hide();
      }
    },
    // 获取彩虹糖
    async getChp() {
      try {
        const res = await apiChp();
        if (res.status === 200) {
          this.cardData["chpObj"].text = res.text;
        }
      } catch (error) {
        this.cardList = this.cardList.filter((c) => c !== "chp");
        throw "chp";
      }
    },
    // 获取毒鸡汤
    async getDu() {
      try {
        const res = await apiDu();
        if (res.status === 200) {
          this.cardData["duObj"].text = res.text;
        }
      } catch (error) {
        this.cardList = this.cardList.filter((c) => c !== "du");
        throw "du";
      }
    },
    // 获取一言
    async getHitokoto() {
      try {
        const res = await apiHitokoto();
        if (res.status === 200) {
          this.cardData["hitokotoObj"] = {
            ...this.cardData["hitokotoObj"],
            text: res.hitokoto,
            from: res.from,
            from_who: res.from_who || "",
          };
        }
      } catch (error) {
        this.cardList = this.cardList.filter((c) => c !== "hitokoto");
        throw "hitokoto";
      }
    },
    // 获取一文
    async getArticleDay() {
      try {
        // const date = toDateString(new Date(), "yyyyMMdd");
        // const res = await apiArticleRandom();
        const res = await apiAlapiOne();
        if (res.status === 200) {
          this.cardData["articleObj"] = {
            ...this.cardData["articleObj"],
            // text: `${res.digest}...`,
            from: res.title,
            from_who: res.author || "",
            content: res.content?.split("<p> </p>")?.[1],
          };
        }
      } catch (error) {
        this.cardList = this.cardList.filter((c) => c !== "articleObj");
        throw "article";
      }
    },
  },
  mounted() {
    if (this.$store.state.myData.oneData.hasData) {
      this.cardData = { ...this.$store.state.myData.oneData };
    } else {
      this.init();
    }
  },
};
</script>

<style lang="scss" scoped>
.my_card {
  min-height: 120px;
  color: #fff;
}
</style>
