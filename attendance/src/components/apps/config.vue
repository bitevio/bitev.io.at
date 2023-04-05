<template>
  <q-dialog>
    <q-card style="min-width: 400px">
      <q-card-actions> </q-card-actions>

      <q-card-section>
        <fieldset>
          <legend>Database collection</legend>
          <div>
            <q-select
              dense
              outlined=""
              v-model="model"
              :options="options"
              label="Users database"
            />
            <q-select
              dense
              outlined=""
              v-model="model"
              :options="options"
              label="Users database"
            />
            <q-select
              dense
              outlined=""
              v-model="model"
              :options="options"
              label="Users database"
            />
            <q-select
              dense
              outlined=""
              v-model="model"
              :options="options"
              label="Users database"
            />
          </div>
        </fieldset>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup></script>
