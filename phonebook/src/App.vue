<template>
  <div class="app-main">
    <div class="top-bar">
      <div class="page-title">Contacts</div>
      <div class="search-add-button">
        <img :src="getSearchIcon()" alt="" @click="showSearch = !showSearch">
        <img src="./assets/addContacts.png" alt="" @click="$router.push('/new')">
      </div>
    </div>
    <router-view class="router"></router-view>
    <div v-if="showSearch" class="search-input">
      <Input placeholder="Search" :text.sync="search" id="searchInput" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  components: {
  },
  data: function() {
    return {
      search: '',
      myTimer: null,
      showSearch: false
    }
  },
  props: {
  },
  methods: {
    runSearch: function() {
      this.$store.commit('searchContacts');
    },
    getSearchIcon: function() {
      return this.showSearch ? require('./assets/closeSearch.png') : require('./assets/searchContacts.png');
    }
  },
  async mounted() {
  },
  watch: {
    search: function(val) {
      this.$store.state.search = val;
      if (this.myTimer) {
        clearTimeout(this.myTimer);
      }

      if (val) {
        this.myTimer = setTimeout(this.runSearch, 200);
      } else {
        this.$store.state.searchResult = [];
      }
    },
    showSearch: function(val) {
      if (!val) {
        this.search = '';
      } else {
        this.$nextTick(() => {
          $('#searchInput').focus();
        });
      }
    }
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

    > .search-add-button {
      position: absolute;
      right: 10px;
      height: 50px;
      top: 0;
      display: flex;
      align-items: center;

      > img {
        height: 90%;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }

  > .router {
    padding: 0px 10px 10px 10px;
    align-self: center;
    margin-top: 10px;
  }

  > .search-input {
    position: fixed;
    right: 10px;
    top: 55px;
    background-color: white;
    padding: 10px;
    border: 1px solid gray;
    box-shadow: 0px 10px 20px -3px black;
  }
}

.page-title {
  font-size: 2em;
}

@media only screen and (max-width: 500px) {
  .page-title {
    font-size: 1.3em;
  }

  .app-main .router {
    align-self: flex-start;
  }
}
</style>

<style>
body {
  margin: 0;
  font-family: 'Baloo 2', cursive;
}

button {
  padding: 5px;
  border-radius: 10px;
  border: none;
  background-color: rgb(97, 200, 255);
}
</style>