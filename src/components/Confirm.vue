<template>
    <q-dialog
      v-model="model"
      persistent
      transition-show="scale"
      transition-hide="scale"
      @hide="handleHide"
    >
      <q-card class="bg-accent text-white" style="width: 300px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
  
        <q-card-section v-if="text" class="q-pt-none">
          {{ text }}
        </q-card-section>
  
        <q-card-actions align="right" class="bg-white text-accent">
          <q-btn flat label="取消" v-close-popup />
          <q-btn flat label="确认" @click="handleConfirm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
export default {
  name: "Confirm",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "是否确认操作",
    },
    text: String,
  },
  data() {
    return {
      model: false,
    };
  },
  methods: {
    handleHide(evt) {
      this.$emit('hide', evt)
    },
    handleConfirm() {
      this.$emit('confirm')
    }
  },
  watch: {
    show: {
      handler () {
        this.model = this.show;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
