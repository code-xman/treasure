<template>
  <q-page class="fit column q-pa-md">
    <q-form ref="form" class="col overflow-auto q-gutter-md">
      <q-input
        outlined
        v-model.trim="name"
        label="您的姓名"
        clearable
        :rules="[(val) => !!val || '必填']"
      />
      <q-input
        outlined
        v-model.trim="email"
        label="您的QQ邮件"
        clearable
        :rules="[
          (val) => !!val || '必填',
          (val) => val.includes('@qq.com') || '请输入qq邮箱',
        ]"
      />
    </q-form>
    <q-btn
      class="full-width shadow-up-3"
      color="primary"
      label="提交"
      @click="onSubmit"
    />
  </q-page>
</template>

<script>
export default {
  name: "RemindMe",
  data() {
    return {
      name: "",
      email: "",
    };
  },
  methods: {
    async onSubmit() {
      const validateRes = await this.$refs.form.validate();
      if (validateRes) {
        this.$q.notify({
          position: "top",
          message: "成功",
          color: "teal",
        });
      }
    },
  },
  mounted() {},
};
</script>

<style lang=" scss" scoped></style>
