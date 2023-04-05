<template>
  <router-view></router-view>
</template>
<route lang="yaml">
meta:
  layout: atLayout
</route>
<script>
import { useSession } from "stores/session"; // "async" is optional;
export default {
  async preFetch({ store, redirect }) {
    const $store = useSession();

    if ($store.isAuth) {
      return true;
    } else {
      return redirect("/");
    }

    return true;
  },
};
</script>

<style></style>
