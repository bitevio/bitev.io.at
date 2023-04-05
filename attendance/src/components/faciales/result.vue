<template>
  <q-dialog ref="dialogRef" maximized="" class="text-center">
    <q-card class="bg-white text-black">
      <q-card-actions>
        <q-space />
        <q-btn round dark flat v-close-popup icon="mdi-close"></q-btn>
      </q-card-actions>
      <q-card-section style="height: 80vh">
        <div v-if="state.loading">
          <div class="q-pt-lg q-pa-lg">
            <div class="q-gutter-sm">
              <q-skeleton type="QAvatar"></q-skeleton>
              <q-skeleton type="text"></q-skeleton>
              <q-skeleton type="text"></q-skeleton>
              <q-skeleton type="QInput"></q-skeleton>
            </div>
          </div>
        </div>
        <div class="fit" v-else>
          <div>
            <div style="font-size: 18px">
              <q-icon color="green" size="xl" name="mdi-check-circle" />
              <p>
                Hello !
                <b>
                  {{ state.item?.employee?.first_name }}
                  {{ state.item?.employee?.last_name }}
                </b>
              </p>
              <div>
                <p v-if="state.item.action.value == 'arrival'">
                  <q-icon size="lg" color="green" name="mdi-arrow-up" /> <br />
                  Vous avez pointé présent à
                </p>

                <p v-else>
                  <q-icon size="lg" color="red" name="mdi-arrow-down" /> <br />
                  A bientot ! ...... <br />
                  <span class="text-caption"> Heure de départ : </span>
                </p>
              </div>
              <p>
                {{ moment(state?.item?.createdAt).format("HH:mm:ss") }}
              </p>

              <p>
                <q-btn
                  outline
                  icon="mdi-arrow-left"
                  v-close-popup
                  label="Retour "
                ></q-btn>
              </p>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import moment from "moment";
import { defineComponent, reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { bitev, descriptors } from "../../sdk";
import { useSession } from "stores/session";
const { dialogRef, onDialogOK, onDialogHide } = useDialogPluginComponent();
const $store = useSession();
const $q = useQuasar();
const state = reactive({
  item: {},
  loading: true,
});

const props = defineProps({
  result: "",
  action: {},
  function_code: {},
});

onBeforeUnmount(() => {
  // stopCamera();
});

onMounted(() => {
  // startCamera();
  sync();
});

async function sync() {
  state.loading = true;
  var id = props.result.split("|")[2];

  //var checkOld_ = await checkOld(id)
  //.then((e) => e)

  // .catch(() => false);

  var check = true;

  if (check) {
    var response = await bitev
      .createOne("controls", {
        data: {
          action: props.action,
          function_code: {
            connect: { id: props?.function_code?.id },
          },
          datetime: moment().format("YYYY-MM-ddTHH:mm"),
          employee: {
            connect: { id: id },
          },
          device: {
            connect: { id: $store.device?.id },
          },
        },
        include: {
          employee: true,
        },
      })
      .then((e) => e)
      .catch((errr) => null);

    console.log(response);

    if (response) {
      state.item = response;
      setTimeout(() => {
        onDialogHide();
      }, 5000);
    }
  } else {
    onDialogHide();
    $q.notify({
      message: "Votre pointage journalier est atteint",
    });
  }

  state.loading = false;
}

async function checkOld(id) {
  var res = await bitev
    .findMany("controles", {
      where: {
        personnel: {
          id: id,
        },
        createdAt: {
          gte: moment().format("YYYY-MM-DD"),
        },
      },
      include: {
        personnel: true,
      },
    })
    .then((e) => e)
    .catch((err) => null);
  //console.log(res);

  if (res) {
    if (res.length >= 2) {
      return false;
    }

    return true;
  } else {
    return false;
  }
}
</script>
