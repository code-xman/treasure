<template>
  <q-page class="fit column q-pa-md helpSelect">
    <q-form ref="form" class="col overflow-auto">
      <q-input
        v-for="item in formList"
        :key="item.name"
        v-model.trim="formValue[item.name]"
        clearable
        clear-icon="close"
        placeholder="请输入使您纠结的选项"
        :rules="[(val) => !!val || '必填']"
      >
        <template v-slot:after v-if="formList.length > 1">
          <q-btn
            round
            dense
            flat
            label="删除"
            @click="() => deleteItem(item)"
          />
        </template>
      </q-input>
    </q-form>
    <div class="full-width btn-box">
      <q-btn
        label="添加选项"
        color="secondary"
        class="btn shadow-up-3"
        @click="addItem"
      />
      <q-btn
        label="重置表单"
        color="secondary"
        class="btn shadow-up-3"
        @click="restForm"
      />
      <q-btn
        label="开始处理"
        color="secondary"
        class="btn shadow-up-3"
        @click="handleData"
      />
    </div>
    <q-dialog v-model="showModal" persistent>
      <ChooseDisc :data="formValue" @on-close="toCloseModal" />
    </q-dialog>
  </q-page>
</template>

<script>
import ChooseDisc from './chooseDisc.vue';

export default {
  name: "helpSelect",
  components: {ChooseDisc},
  data() {
    const baseFormValue = {
      option_1: "",
      // option_2: "2",
      // option_3: "3",
      // option_4: "4",
      // option_5: "5",
      // option_6: "6",
    };
    const baseFormList = [
      {
        name: "option_1",
      },
      // {
      //   name: "option_2",
      // },
      // {
      //   name: "option_3",
      // },
      // {
      //   name: "option_4",
      // },
      // {
      //   name: "option_5",
      // },
      // {
      //   name: "option_6",
      // },
    ];
    return {
      baseFormValue,
      baseFormList,
      num: baseFormList.length,
      formValue: { ...baseFormValue },
      formList: [...baseFormList],
      showModal: false,
    };
  },
  methods: {
    // 重置表单
    async restForm() {
      this.formValue = { ...this.baseFormValue };
      this.formList = [...this.baseFormList];
      await this.$nextTick();
      this.$refs.form.resetValidation();
    },
    // 更新formValue
    updateFormValue() {
      const value = {};
      this.formList.forEach((item) => {
        value[item.name] = this.formValue[item.name] || "";
      });
      this.formValue = { ...value };
    },
    // 添加选项
    addItem() {
      this.num += 1;
      if (this.formList.length >= 6) {
        this.$q.notify({
          position: "top",
          message: "选项最多6项",
          color: "warning",
        });
        return;
      }
      this.formList.push({
        name: `option_${this.num}`,
      });
      this.updateFormValue();
    },
    // 删除选项
    deleteItem(delItem) {
      const newForm = this.formList.filter(
        (item) => item.name !== delItem.name
      );
      this.formList = [...newForm];
      this.updateFormValue();
    },
    // 处理数据
    async handleData () {
      if (this.formList.length < 2) {
        this.$q.notify({
          position: 'top',
          message: '您真的在纠结做出选择吗？',
          color: 'warning',
        })
        return;
      }
      const validateRes = await this.$refs.form.validate();
      if (validateRes) {
        console.log('this.formValue :>> ', this.formValue);
        this.showModal = true;
      }
    },
    // 关闭弹框
    toCloseModal () {
      this.showModal = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.btn-box {
  display: flex;
  justify-content: space-around;
}

</style>
