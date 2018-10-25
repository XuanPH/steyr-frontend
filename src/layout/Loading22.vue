<template>
     <div id="loading" v-show="isLoading" :loading='loading'>
      <Spinner name="ball-scale-multiple" class="loadingItem" color="red" slot="footer" />
      <span  class="loadingItem">Đang tải</span>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false
    };
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    showLoading() {
      this.isLoading = true;
      console.log("loading Success");
    },
    hideLoading() {
      this.isLoading = false;
      console.log("unloading Success");
    }
  },
  watch: {
    loading: function(newVal, oldVal) {
      this.isLoading = newVal;
      console.log(oldVal);
    }
  }
};
</script>
