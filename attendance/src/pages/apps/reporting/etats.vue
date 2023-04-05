<template>
  <q-page class="q-pa-md bg-lite">
    <fieldset class="bg-lite">
      <legend class="text-bold text-h6">
        <q-btn
          class="bg-white text-black"
          :icon="!state.openFilter ? 'mdi-filter-off' : 'mdi-filter-plus'"
          outline=""
          dense
          round
          @click="state.openFilter = !state.openFilter"
        ></q-btn>
        Filtrer
      </legend>
      <div v-show="state.openFilter" class="q-py-sm">
        <div class="row q-col-gutter-lg">
          <div class="col-4">
            <div class="q-gutter-sm">
              <div>
                <q-select
                  outlined
                  stack-label
                  v-model="model"
                  :options="options"
                  label="Départements / Services"
                >
                  <template #prepend>
                    <q-icon color="black" name="mdi-home"> </q-icon>
                  </template>
                </q-select>
              </div>
              <div>
                <q-select
                  outlined
                  stack-label
                  v-model="model"
                  :options="options"
                  label="Utilisateurs/Employes"
                >
                  <template #prepend>
                    <q-icon color="black" name="mdi-account-group"> </q-icon>
                  </template>
                </q-select>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="q-gutter-sm">
              <div>
                <q-select
                  outlined
                  stack-label
                  v-model="model"
                  :options="options"
                  label="Code de fonction"
                >
                  <template #prepend>
                    <q-icon color="black" name="mdi-circle"> </q-icon>
                  </template>
                </q-select>
              </div>
              <div>
                <div class="row q-col-gutter-sm">
                  <div class="col-6">
                    <q-input
                      outlined=""
                      stack-label=""
                      v-model="text"
                      type="datetime-local"
                      label="Date de début"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      outlined=""
                      stack-label=""
                      v-model="text"
                      type="datetime-local"
                      label="Date de fin"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div>
              <q-select outlined="" v-model="model" :options="options" label="Appareils">
                <template #prepend>
                  <q-icon color="black" name="las la-mobile"> </q-icon>
                </template>
              </q-select>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
    <q-tabs class="text-bold" v-model="state.tab">
      <q-tab icon="mdi-apps" name="h" label="Historiques"></q-tab>
      <q-tab class="text-red" icon="las la-file-pdf" name="f" label="Fiches"></q-tab>
    </q-tabs>
    <q-tab-panels v-model="state.tab">
      <q-tab-panel name="h">
        <div class="q-pt-sm">
          <q-table
            :loading="state.loading"
            separator="cell"
            flat
            class="scroll"
            :rows="state.pointages"
            :columns="state.columns"
            :style="{
              height: state.openFilter ? '50vh' : '65vh',
            }"
          >
            <template v-slot:top-right>
              <div class="q-gutter-sm">
                <q-btn color="red" icon="mdi-printer"></q-btn>
                <q-btn @click="Sync()" color="black" icon="mdi-sync"></q-btn>
              </div>
            </template>
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <span v-if="props.value == 'arrival'">
                  <q-icon color="green" name="mdi-circle" /> Arrivée
                </span>

                <span v-else> <q-icon color="red" name="mdi-circle" /> Départ </span>
              </q-td>
            </template>
          </q-table>
        </div>
      </q-tab-panel>
      <q-tab-panel name="f">
        <div class="q-pt-sm">
          <q-table
            :loading="state.loading"
            separator="cell"
            flat
            class="scroll"
            :rows="state.pointages"
            :columns="state.columnsf"
            :style="{
              height: state.openFilter ? '50vh' : '65vh',
            }"
          >
            <template v-slot:top-right>
              <div class="q-gutter-sm">
                <q-btn color="red" icon="mdi-printer"></q-btn>
                <q-btn @click="Sync()" color="black" icon="mdi-sync"></q-btn>
              </div>
            </template>
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <span v-if="props.value == 'arrival'">
                  <q-icon color="green" name="mdi-circle" /> Arrivée
                </span>

                <span v-else> <q-icon color="red" name="mdi-circle" /> Départ </span>
              </q-td>
            </template>
          </q-table>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<route lang="yaml">
meta:
  title: Etats - Pointage
</route>

<script setup>
import { bitev } from "src/sdk";
import { reactive, onMounted } from "vue";
import fr from "moment/dist/locale/fr";
import moment from "moment";
moment.locale("fr");

console.log(moment.locales());
const state = reactive({
  loading: false,
  tab: "h",
  openFilter: false,
  columns: [
    {
      name: "employe",
      label: "Employes",
      align: "left",
      field: (rw) => {
        return rw.employee.first_name + " " + rw.employee.last_name;
      },
    },
    {
      name: "Département",
      label: "Département",
      align: "left",
    },
    {
      name: "action",
      label: "Action",
      align: "center",
      field: (rw) => {
        return rw.action.value;
      },
    },
    {
      name: "date",
      label: "Date & Heure",
      align: "left",
      field: (rw) => {
        return moment(rw.datetime).format("dd DD , MMM YYYY -  HH:mm");
      },
    },
    {
      name: "Retard",
      label: "Retard",
      align: "left",
    },
    {
      name: "Appareil",
      label: "Appareil",
      align: "left",
      field: (rw) => rw.device?.name || "",
    },
    {
      name: "code",
      label: "Motif (Code fonction) ",
      align: "left",
      field: (rw) => {
        return rw.function_code
          ? rw?.function_code?.code + " - " + rw?.function_code?.name
          : "";
      },
    },
  ],
  columnsf: [
    {
      name: "employe",
      label: "Employes",
      align: "left",
      field: (rw) => {
        return rw.employee.first_name + " " + rw.employee.last_name;
      },
    },
    {
      name: "Nbre de jour (Travail)",
      label: "Nbr de jour (Travail)",
      align: "left",
    },
    {
      name: "Nbre de jour (Travail)",
      label: "Nbr de jour (Repos)",
      align: "left",
    },

    {
      name: "Nbre de jour (Travail)",
      label: "Total heure (Travail)",
      align: "left",
    },
    {
      name: "",
      label: "",
      headerClasses: "bg-grey",
      classes: "bg-grey",
      headerStyle: {
        width: "1px",
      },
      style: {
        width: "1px",
      },
    },
    {
      name: "Nbre de ",
      label: "* Nbr d'heure (Retard)",
      align: "left",
    },
    {
      name: "Nbre",
      label: "* Nbr d'heure (Abscence)",
      align: "left",
    },
    {
      name: "Nbre de jour (Travail)",
      label: "* Total heure éffectué (Travail)",
      align: "left",
    },
  ],

  pointages: [],
});

onMounted(() => {
  Sync();
});

async function Sync() {
  state.loading = true;

  state.pointages = await bitev
    .findMany("controls", {
      include: {
        employee: true,
        function_code: true,
      },
    })
    .then((e) => e)
    .catch((err) => []);

  state.loading = false;
}
</script>
