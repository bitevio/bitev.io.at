<template>
  <div v-if="!state.permit">
    <q-toolbar>
      <q-space></q-space>
      <q-btn flat icon="mdi-arrow-left" to="/"></q-btn>
    </q-toolbar>
    <q-page padding>
      <div class="row justify-center">
        <div class="col-12 col-sm-6">
          <div class="q-pa-lg">
            <div class="column text-center q-gutter-md">
              <div class="q-py-md">
                <p>
                  <q-img
                    width="100px"
                    src="https://cdn-icons-png.flaticon.com/512/6034/6034293.png "
                  ></q-img>
                </p>
                <div class="text-h6 text-bold">Authentification</div>
              </div>
              <q-input
                outlined=""
                v-model.number="state.auth.code"
                type="text"
                label="Code Appareil"
              >
                <template #prepend>
                  <q-icon name="las la-mobile" />
                </template>
              </q-input>
              <q-input
                outlined=""
                v-model="state.auth.password"
                type="password"
                label="Mot de passe"
              >
                <template #prepend>
                  <q-icon name="las la-key" />
                </template>
              </q-input>
              <q-btn
                :loading="state.loading"
                @click="login"
                color="primary"
                label="Se connecter"
              ></q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </div>
  <div v-else>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script setup>
import { reactive, watch } from "vue";
import { bitev } from "src/sdk";
import { useQuasar } from "quasar";
import { useSession } from "stores/session";
const $store = useSession();
const $q = useQuasar();
const state = reactive({
  permit: $store.authDevice,
  loading: false,
  auth: {
    code: "",
    password: null,
  },
});

console.log("III", $store.authDevice);

watch(
  () => $store.authDevice,
  (val) => {
    console.log("Val is", val);
    state.permit = val;
  }
);

async function login() {
  state.loading = true;
  var response = await bitev
    .auth("devices", {
      where: {
        code: state.auth.code,
        password: state.auth.password,
      },
      include: {
        centre: true,
      },
    })
    .then((e) => e)
    .catch((err) => err);

  if (response?.auth) {
    $store.updateAuthDevice({
      auth: true,
      device: response.user,
    });

    state.permit = true;
  } else {
    $q.notify({
      type: "negative",
      message: "Authentification échouée",
    });
  }

  state.loading = false;

  console.log(response);
}
</script>
