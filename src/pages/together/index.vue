<template>
  <q-page class="fit column q-pa-md together">
    <q-form ref="form" class="col overflow-auto q-gutter-xs q-pb-sm form-email">
      <q-select
        v-model="formValue.fromer"
        clearable
        label="发件人"
        :options="fromNameOptions"
        :hide-dropdown-icon="true"
        :rules="[(val) => !!val || '必填']"
      />
      <q-input
        v-model.trim="formValue.password"
        label="密码"
        clearable
        :rules="[(val) => !!val || '必填']"
      />
      <q-select
        v-model="formValue.to_mailer"
        multiple
        clearable
        label="收件人"
        :options="emailOptions"
        :hide-dropdown-icon="true"
        :rules="[(val) => (!!val && !!val.length) || '必填']"
      />
      <q-btn
        v-for="btn in btnList"
        color="secondary"
        :key="btn.type"
        :label="btn.label"
        @click="() => autoWrite(btn)"
      />
      <q-input
        v-model.trim="formValue.subject"
        label="主题"
        clearable
        :rules="[(val) => !!val || '必填']"
      />
      <q-input
        v-model.trim="formValue.message"
        outlined
        label="内容"
        type="textarea"
        clearable
        clear-icon="close"
        counter 
        maxlength="120"
        :rules="[(val) => !!val || '必填']"
      />
    </q-form>
    <div class="full-width btn-box">
      <q-btn class="btn shadow-up-3" label="重置表单" @click="restForm" />
      <q-btn
        class="btn shadow-up-3"
        color="primary"
        label="发送邮件"
        @click="sendMail"
      />
    </div>
  </q-page>
</template>

<script>
import emailjs from "@emailjs/browser";
import apiKeys from "./apikeys";
import { userData, emailList } from "src/data/base.js";

export default {
  name: "Together",
  data() {
    const btnList = [
      {
        label: "学一下",
        type: "study",
        subject: "212学习",
        message:
          "问渠哪得清如许，为有源头活水来。再不学习就卷不赢别人啦，快来学习吧！",
      },
      {
        label: "玩一下",
        type: "play",
        subject: "212游戏",
        message: "既然青春留不住，不如峡谷度一度。今晚猎个痛快！峡谷不见不散！",
      },
      {
        label: "聚一下",
        type: "party",
        subject: "212聚会",
        message: "古来圣贤皆寂寞，惟有饮者留其名。好久不见，不如小聚一下吧。",
      },
    ];

    return {
      /** 发件人data */
      userData,
      /** 收件人data */
      emailList,
      /** 模板按钮 */
      btnList,
      formValue: {
        fromer: null,
        password: "",
        to_mailer: [],
        subject: "",
        message: "",
      },
      /** 成功者 */
      winners: [],
      /** 失败者 */
      failer: [],
    };
  },
  computed: {
    fromNameOptions() {
      const res = userData.map((item) => {
        return {
          label: item.name,
          value: item.password,
        };
      });
      return res;
    },
    emailOptions() {
      const res = emailList.map((item) => {
        return {
          label: item.name,
          value: item.email,
        };
      });
      return res;
    },
  },
  methods: {
    /** 重置表单 */
    async restForm() {
      this.formValue = {
        fromer: null,
        password: "",
        to_mailer: [],
        subject: "",
        message: "",
      };
      await this.$nextTick();
      this.$refs.form.resetValidation();
    },
    /** 自动填写 */
    autoWrite(btn) {
      this.formValue = {
        ...this.formValue,
        subject: btn.subject,
        message: btn.message,
      };
    },
    /** 发送 */
    async handelSend(data) {
      const templateParams = {
        from_name: this.formValue.fromer.label,
        to_name: data.label,
        to_mail: data.value,
        subject: this.formValue.subject,
        message: this.formValue.message,
      };
      const res = await emailjs.send(
        apiKeys.SERVICE_ID,
        apiKeys.TEMPLATE_ID,
        templateParams,
        apiKeys.PUBLIC_KEY
      );
      // console.log("res :>> ", res);
      if (res.status === 200) {
        this.winners.push(data.label);
      } else {
        this.failer.push(data.label);
      }
    },

    /** 发送邮件按钮回调 */
    async sendMail() {
      // console.log("this.formValue :>> ", this.formValue);
      this.$q.loading.show();
      const validateRes = await this.$refs.form.validate();
      // 密码验证
      if (
        validateRes &&
        this.formValue.password !== this.formValue.fromer.value
      ) {
        this.$q.loading.hide();
        this.$q.notify({
          position: "top",
          message: "输入的密码有误",
          color: "warning",
        });
        return;
      }
      if (validateRes) {
        /**
         * 此处处理异步循环
         * Promise.all等待内部所有异步执行完毕才执行then
         * 内部的异步Promise在其异步方法 await fn() 后执行resolve，
         * 可保证 异步方法 await fn() 执行完毕后再执行后续代码
         */
        Promise.all(
          this.formValue.to_mailer.map((item) => {
            return new Promise(async (resolve, reject) => {
              await this.handelSend(item);
              resolve();
            }).catch((error) => console.log("error :>> ", error));
          })
        )
          .then(() => {
            if (this.failer.length > 0) {
              const names = this.failer.join("、");
              this.$q.notify({
                position: "top",
                message: `${names}发送失败`,
                color: "warning",
              });
            } else if (this.winners.length > 0) {
              this.$q.notify({
                position: "top",
                message: "发送成功",
                color: "teal",
              });
              this.restForm();
            }
          })
          .catch((error) => console.log("error :>> ", error));
      }
      this.$q.loading.hide();
    },
  },
  beforeDestroy() {
    this.$q.loading.hide();
  },
};
</script>

<style lang="scss" scoped>
.together {
  .btn-box {
    display: flex;
    justify-content: space-between;
    .btn {
      width: 48%;
    }
  }
}
</style>
