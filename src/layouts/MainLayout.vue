<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          {{title}}
        </q-toolbar-title>

        <!-- <div>Treasure v0.0.1</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8"> 菜单 </q-item-label>
        <template v-for="link in essentialLinks">
          <MenuItem
            :key="link.name"
            v-if="!link?.hidden"
            v-bind="link"
            @muneClick="() => muneClick(link)"
          />
        </template>
      </q-list>
    </q-drawer>

    <q-page-container class="overflow-hidden" :style="{ height: '100vh' }">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'
import MenuItem from "components/MenuItem.vue";
import menuList from "src/data/menu";

export default {
  name: "MainLayout",
  components: {
    MenuItem,
  },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: menuList,
      title: "Treasure",
    };
  },
  methods: {
    muneClick(link) {
      this.title = link.title;
    },
  },
};
</script>
