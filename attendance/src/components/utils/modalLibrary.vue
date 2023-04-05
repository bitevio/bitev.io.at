<template>
  <q-dialog v-model="state.isOpen" maximized="" position="right" ref="dialogRef" padding>
    <q-card style="min-width: 65vw">
      <div
        v-if="state.isReady"
        :style="`${
          state.isOpen
            ? `
          margin-left: -6%;
          margin-top: 1.4%;
          z-index: 9999;
          position: fixed;
          top: 0;
          transition: 0.4s;`
            : 'display:none'
        }`"
      >
        <q-btn
          v-close-popup
          round
          color="white"
          text-color="black"
          icon="mdi-close"
        ></q-btn>
      </div>
      <q-toolbar class="q-py-md">
        <q-toolbar-title class="text-bold">
          <q-icon name="mdi-folder"></q-icon>
          File library <br />
          <span class="text-caption"> {{ state.files.length }} Item(s) </span>
        </q-toolbar-title>
        <q-space />
        <div class="q-gutter-md">
          <q-btn
            color="red"
            v-if="state.selected.length"
            outline
            @click="deleteMany()"
            flat
            fab-mini
            icon="las la-trash"
          ></q-btn>
          <q-btn
            class="bg-white text-primary"
            @click="Sync()"
            fab-mini
            icon="las la-sync"
          ></q-btn>

          <q-btn @click="Save()" fab-mini color="secondary" icon="mdi-check"></q-btn>
        </div>
      </q-toolbar>
      <q-toolbar class="q-pt-md">
        <q-input
          outlined=""
          dense
          style="min-width: 30vw"
          v-model="state.search"
          label="Search ...."
        ></q-input>
        <q-space />
        <q-btn
          @click="uploadFile()"
          color="primary"
          outline
          label="New media"
          icon="mdi-plus"
        ></q-btn>
      </q-toolbar>
      <q-separator spaced inset dark />

      <q-card-section>
        <div class="q-py-sm q-mx-lg text-bold">
          <q-chip dark color="green"> {{ state.selected.length }}</q-chip> Item(s)
          selected
        </div>
        <q-scroll-area style="height: 70vh" class="q-pa-lg scroll rounded-borders">
          <div v-if="state.loading">
            <van-skeleton :row="15"></van-skeleton>
          </div>
          <div v-else>
            <div class="row justify-start text-center">
              <div
                class="col-12 col-sm-6 col-md-4 col-lg-3"
                v-for="(file, i) of state.files"
                :key="i"
              >
                <q-card
                  flat
                  style="height: 250px; border: 0.5px solid #ccc"
                  class="q-ma-xs overflow-hidden relative-position bg-lite box"
                >
                  <q-card-actions class="q-pa-none q-ma-none">
                    <q-checkbox
                      size="lg"
                      ref="cc"
                      color="green"
                      unchecked-icon="mdi-circle-outline"
                      checked-icon="mdi-check-circle-outline"
                      :val="file"
                      v-model="state.selected"
                    />
                  </q-card-actions>
                  <div
                    class="overflow-hidden cursor-pointer relative-position q-pa-md"
                    style="border-radius: 20px"
                    @click="$refs.cc[i].toggle()"
                  >
                    <q-img
                      class="rounded-borders overflow-hidden"
                      height="100px"
                      no-spinner
                      width="100%"
                      fit="cover"
                      :src="
                        bitev.assets(file.filedisk, {
                          transform: true,
                          q: 40,
                        })
                      "
                    />
                  </div>
                  <div class="text-center q-mx-lg">
                    <q-item-label :lines="1">
                      {{ file.filename }}
                    </q-item-label>
                  </div>
                  <q-card-actions class="text-bold text-grey">
                    {{ file.details.mimeType }}
                    <q-space />
                    {{ filesize(file.details.size, { base: 2, standard: "jedec" }) }}
                  </q-card-actions>
                </q-card>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<route lang="yaml">
meta:
  layout: espaceLayout
</route>
<script setup>
import cleanDeep from "clean-deep";
import { filesize } from "filesize";
import uploadFile_ from "components/utils/uploadFile.vue";
import { reactive, onMounted, watch } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { bitev } from "../../sdk/index";
const $q = useQuasar();
const { dialogRef, onDialogOK } = useDialogPluginComponent();
const props = defineProps({
  field: {},
});
const state = reactive({
  loading: false,
  search: null,
  selected: [],
  files: [],
  isReady: false,
  isOpen: false,
});

console.log("Field", props.field);

onMounted(() => {
  Sync();
});

watch(
  () => state.selected,
  () => {
    if (!props.field.hasMany && state.selected.length > 1) {
      state.selected.shift();
    }
  }
);

watch(
  () => state.isOpen,
  (val) => {
    if (val) {
      setTimeout(() => {
        state.isReady = true;
      }, 400);
    } else {
      state.isReady = false;
    }
  }
);

watch(
  () => state.search,
  () => {
    Sync();
  }
);

async function deleteMany() {
  $q.loading.show();

  await bitev
    .deleteMany("medias", {
      where: {
        id: {
          in: state.selected,
        },
      },
    })
    .catch()
    .then((e) => {
      state.selected = [];
    });

  Sync();

  $q.loading.hide();
}

async function Sync() {
  state.loading = true;
  var buildWhere = {
    filename: {
      contains: state.search,
    },
  };
  state.files = await bitev
    .findMany("medias", {
      orderBy: {
        createdAt: "desc",
      },
      where: {
        ...cleanDeep(buildWhere),
      },
    })
    .then((e) => e)
    .catch((err) => []);

  console.log(state.files);

  state.loading = false;
}

function uploadFile() {
  $q.dialog({
    component: uploadFile_,
  }).onOk((res) => {
    if (res.hasMany) {
      res.data.map((e) => {
        state.files.unshift(e);
      });
    } else {
      state.files.unshift(res.data);
    }
  });
}

function Save() {
  onDialogOK(state.selected);
}
</script>

<style></style>
