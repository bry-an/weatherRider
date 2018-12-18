<template>
  <div>
    <auto-complete/>
    <google-map/>
  </div>
</template>

<script>
import AutoComplete from "@/components/AutoComplete";
import GoogleMap from "@/components/GoogleMap";

export default {
  components: {
    AutoComplete,
    GoogleMap
  }
};
</script>
