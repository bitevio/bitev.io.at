<template>
  <q-dialog
    ref="dialogRef"
    transition-show="slide-left"
    transition-hide="slide-right"
    maximized
  >
    <q-card>
      <q-card-actions>
        <q-btn round flat v-close-popup icon="mdi-arrow-left"></q-btn>
        <q-toolbar-title>
          {{ !props.item ? "Création " : "Edition " }} Employé
        </q-toolbar-title>
      </q-card-actions>
      <q-card-section style="height: 85vh" class="scroll">
        <div class="text-center">
          <van-divider class="text-bold text-black">
            Informations personnelles</van-divider
          >
          <q-input v-model="state.entry.first_name" type="text" label="Nom" />
          <q-input v-model="state.entry.last_name" type="text" label="Prenom" />
          <q-input v-model="state.entry.email" type="text" label="E-mail" />
          <q-input v-model="state.entry.contact" type="text" label="Contact" />

          <van-divider class="text-bold text-black"> Reconnaissance faciale</van-divider>
          <n-carousel :loop="false" :slides-per-view="1">
            <n-carousel-item
              style="height: 40vh"
              v-for="(img, i) of state.entry.facials"
              :key="i"
            >
              <div class="text-center">
                <div>
                  <img
                    style="width: auto; height: 30vh"
                    :src="
                      bitev.assets(img.filedisk, {
                        transform: true,
                        q: 40,
                      })
                    "
                  />
                </div>

                <q-btn
                  dense
                  flat
                  @click="
                    state.entry.facials = state.entry.facials.filter(
                      (e) => e.id !== img.id
                    )
                  "
                  no-caps
                  icon="mdi-close"
                  :label="`(${i + 1}/ ${state.entry.facials.length}) Supprimer`"
                ></q-btn>
              </div>
            </n-carousel-item>
          </n-carousel>
          <p>
            Minimum 3 photos descriptives <br />
            avec un socre de <b class="text-red">0.90></b>
          </p>
          <div class="shadow-1"></div>
          <q-btn
            @click="openAddPhoto"
            outline
            icon="mdi-camera-plus"
            label="Capturer"
          ></q-btn>
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn
          :loading="state.loading"
          icon="las la-save"
          color="primary"
          @click="save()"
          class="fit"
          label="Enregistrer"
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { bitev } from "../../sdk";
import { reactive, ref } from "vue";
import addPhoto from "./addPhoto.vue";
import { useSession } from "stores/session";
import _ from "lodash";
import { useQuasar, useDialogPluginComponent } from "quasar";
const { dialogRef, onDialogOK } = useDialogPluginComponent();
const $store = useSession();
const $q = useQuasar();
const props = defineProps({
  item: null,
});
const state = reactive({
  loading: false,
  imgs: [],
  entry: {
    centreId: $store.device?.centre?.id,
    first_name: "",
    last_name: "",
    contact: null,
    email: null,
    facials: [],
  },
});

if (props.item) {
  state.entry = { ...props.item };
}

async function uploadImg() {
  var response = await bitev
    .upload(state.imgs)
    .then((e) => e)
    .catch((err) => {
      console.log(err);
      return [];
    });
  return response;
}

async function save() {
  var entry = { ...state.entry };
  entry = _.omit(entry, ["centre"]);
  state.loading = true;

  if (props.item) {
    var response = await bitev
      .updateOne("employees", {
        where: {
          id: props.item.id,
        },
        data: entry,
      })
      .then((e) => e)
      .catch((err) => err);
  } else {
    var response = await bitev
      .createOne("employees", {
        data: entry,
      })
      .then((e) => e)
      .catch((err) => err);
  }

  if (response.id) {
    onDialogOK();
  } else {
    $q.notify({
      message: "Service indisponible",
    });
  }

  state.loading = false;
}

function openAddPhoto() {
  $q.dialog({
    component: addPhoto,
  }).onOk((img) => {
    state.entry.facials.push(img);
  });
}
</script>
