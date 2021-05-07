import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: '',
    rawResult: [],
    contactsListing: [],
    searchResult: []
  },
  getters: {
  },
  mutations: {
    searchContacts(state) {
      state.searchResult = state.rawResult.filter(r => r['name'].toLowerCase().includes(state.search.toLowerCase()));
    }
  }
})