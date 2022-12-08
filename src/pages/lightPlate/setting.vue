<template>
  <q-card class="column">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">修改设置</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="flex-1 overflow-auto">
      <q-form ref="form" class="col q-gutter-xs q-pb-md">
        <q-input
          v-model.trim="formValue.content"
          label="内容"
          clearable
          clear-icon="close"
          counter
          maxlength="20"
          :rules="[(val) => !!val || '必填']"
        />
        <!-- <q-select
          v-model="formValue.lightType"
          clearable
          emit-value
          map-options
          label="效果"
          :options="lightTypes"
          :hide-dropdown-icon="true"
          hint="字数过多会强制滚动"
        /> -->
        <q-input
          v-model.trim="formValue.color"
          label="颜色"
          readonly
          hint="请点击右侧的图标进行选择"
          :rules="[(val) => !!val || '必填']"
        >
          <template v-slot:append>
            <q-icon
              name="colorize"
              class="cursor-pointer"
              :style="{ color: `${formValue.color || '#0000008a'}` }"
            >
              <q-popup-proxy
                cover
                ref="colorRef"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-color
                  v-model="formValue.color"
                  no-header-tabs
                  no-footer
                  class="my-picker"
                  default-view="palette"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          v-model.trim="formValue.size"
          label="字体大小"
          type="number"
          clearable
          clear-icon="close"
          :rules="[(val) => (!!val && val >= 12) || '需填写不小于12的整数']"
        />
        <q-input
          v-model.trim="formValue.speed"
          label="滚动速度"
          type="number"
          clearable
          clear-icon="close"
          hint="大小与速度成反比,默认值为5"
        />
      </q-form>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        class="full-width shadow-up-3"
        color="primary"
        label="展示"
        @click="onShow"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { lightTypes } from "./data";

export default {
  name: "lightPlate",
  props: {
    data: {
      type: Object,
      default: () => ({
        content: "",
        // lightType: "",
        color: "",
        size: 72,
        speed: null,
      }),
    },
  },
  data() {
    return {
      lightTypes,
      formValue: {
        content: "",
        // lightType: "",
        color: "",
        size: 72,
        speed: null,
        ...this.$props.data,
      },
    };
  },
  computed: {
    // speedRules() {
    //   const speed = this.formValue.speed;
    //   const lightType = this.formValue.lightType;
    //   return lightType !== "slider" || (!!speed && speed >= 1);
    // },
  },
  methods: {
    async onShow() {
      const validateRes = await this.$refs.form.validate();
      if (validateRes) {
        this.$emit("on-close", this.formValue);
      }
    },
  },
  watch: {
    // 监听颜色，数据改变关闭popup
    "formValue.color": {
      handler(val) {
        if (val) {
          this.$refs.colorRef.hide();
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
