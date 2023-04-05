<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <div class="row">
          <div class="col-12 col-md-4">
            <div style="height: 100vh" class="q-pa-lg">
              <div class="q-pa-lg" id="model">
                <div class="row">
                  <div class="col-2">
                    <q-img
                      width="40px"
                      src="bitev.png"
                      spinner-color="primary"
                      spinner-size="82px"
                    />
                  </div>
                  <div class="col-10">
                    <div class="text-bold">Attendance Management System</div>

                    v.0.1
                  </div>
                </div>
                <br />
                <br />
                <q-tabs v-model="state.tab">
                  <q-tab icon="mdi-shield" :name="0" label="Administration"> </q-tab>
                  <q-tab icon="las la-mobile" :name="1" label="Device Panel"></q-tab>
                </q-tabs>
                <q-tab-panels v-model="state.tab">
                  <q-tab-panel :name="0">
                    <div class="q-gutter-md text-center q-pt-lg">
                      <q-input
                        outlined=""
                        v-model="state.entry.email"
                        type="text"
                        label="E-mail"
                      />
                      <q-input
                        outlined=""
                        v-model="state.entry.password"
                        type="text"
                        label="Mot de passe"
                      />
                      <q-btn
                        @click="login"
                        :loading="state.loading"
                        color="primary"
                        label="Se connecter"
                      ></q-btn></div
                  ></q-tab-panel>
                  <q-tab-panel :name="1">
                    <div class="text-center q-pt-lg">
                      <q-btn
                        outline=""
                        icon="mdi-arrow-right"
                        to="/controls"
                        label="Se connecter"
                      ></q-btn>
                    </div>
                  </q-tab-panel>
                </q-tab-panels>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-8">
            <q-img
              class="fit"
              src="https://images.unsplash.com/photo-1581084324492-c8076f130f86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            >
              <div class="fit q-pa-lg">
                <div class="flex fit flex-center">
                  <div>
                    <div class="text-h4 text-bold">Système de gestion de présence</div>
                    <p>
                      <q-icon name="mdi-check-circle" /> Reconnaissance Faciale <br />
                    </p>
                  </div>
                </div>
              </div>
            </q-img>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { reactive } from "vue";
import { bitev } from "../sdk";
import { useQuasar } from "quasar";
import { useSession } from "stores/session";
import { useRouter } from "vue-router";
const $store = useSession();
const $router = useRouter();
const $q = useQuasar();
const state = reactive({
  tab: 0,
  loading: false,
  entry: {
    email: null,
    password: null,
  },
});

function sync() {}

async function login() {
  state.loading = true;

  var response = await bitev
    .auth("employees", {
      where: {
        email: state.entry.email,
        password: state.entry.password,
      },
    })
    .then((e) => e)
    .catch((err) => {
      state.error = err;
      return false;
    });

  console.log(response);

  if (!response) {
    $q.notify({
      message: "Authentication failed",
    });
  } else {
    await $store.updateLocal(response);
    await $store.login();

    $router.push("/apps");
  }

  state.loading = false;
}
</script>
