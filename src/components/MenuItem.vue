<template>
  <q-item clickable @click="menuItemClick">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section v-if="iconfont" avatar>
      <q-icon v-if="iconfont" class="iconfont" :class="iconfont" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "home",
    },

    caption: {
      type: String,
      default: "",
    },

    path: {
      type: String,
      default: "/",
    },

    icon: {
      type: String,
      default: "",
    },
    iconfont: {
      type: String,
    }
  },
  methods: {
    menuItemClick() {
      this.$router.push({name: this.name, params: {title: this.title}});
      this.$emit("muneClick");
    },
  },
};
</script>
