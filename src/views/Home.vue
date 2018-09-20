<template>
  <div class="home">
    <Boards/>
  </div>
</template>

<script>
// @ is an alias to /src
import Boards from "@/components/Boards.vue";

export default {
  name: "home",
  components: {
    Boards
  }
};
</script>
