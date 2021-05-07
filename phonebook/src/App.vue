<template>
  <div class="app-main">
    <div class="top-bar">
      <div class="page-title">Contacts</div>
    </div>
    <router-view class="router"></router-view>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  components: {
  },
  data: function() {
    return {
    }
  },
  props: {
  },
  methods: {
  },
  async mounted() {
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  display: flex;
  flex-direction: column;

  > .top-bar {
    height: 50px;
    box-shadow: 0 0 10px 0px gray;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > .router {
    padding: 0px 10px 10px 10px;
    align-self: center;
    margin-top: 10px;
  }
}

.page-title {
  font-size: 2em;
}

@media only screen and (max-width: 500px) {
  .page-title {
    font-size: 1.3em;
  }
}
</style>

<style>
body {
  margin: 0;
  font-family: 'Baloo 2', cursive;
}
</style>