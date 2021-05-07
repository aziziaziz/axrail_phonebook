<template>
  <div class="contacts-list-main">
    <div class="contacts-group" v-for="(c, i) in contactsList" :key="i">
      <div class="grouping">{{ c['letter'] }}</div>
      <div class="contacts" :class="[ (i + ci) % 2 == 0 ? 'even' : 'odd' ]" v-for="(con, ci) in c['contacts']" :key="ci">
        <div class="name">{{ con['name'] }}</div>
        <div class="number">{{ con['number'] }}</div>
      </div>
    </div>
    <div class="no-contacts" v-if="contactsList.length == 0">You have no contacts<br />Add contacts to view it here</div>
    <div class="button-section">
      <button>a</button>
      <button>b</button>
      <button>c</button>
      <button>d</button>
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
      contactsList: []
    }
  },
  props: {
  },
  methods: {
  },
  async mounted() {
    let contacts = await this.$axios.get('/contacts');

    let letters = [...new Set(contacts.data.map(c => c['name'][0].toUpperCase()))].sort();
    letters.forEach((l) => {
      this.contactsList.push({
        letter: l,
        contacts: contacts.data.filter(c => c['name'][0].toUpperCase() == l)
      });
    });
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
.contacts-list-main {
  width: calc(100% - 30px);
  max-width: 400px;
  font-size: 0.9em;
  display: flex;
  flex-direction: column;
  position: relative;

  > .contacts-group {
    position: relative;

    > .grouping {
      padding: 5px;
      background-color: rgb(64,64,64,);
      color: white;
      position: sticky;
      top: 50px;
    }

    > .contacts {
      display: flex;
      align-items: center;
      padding: 5px;
      border-bottom: 1px solid rgba(128,128,128,0.3);

      > .name {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      > .number {
        min-width: 140px;
        max-width: 140px;
        text-align: right;
        padding-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    > .odd {
      background-color: rgba(200,200,200,0.3);
    }

    > .even {
      background-color: transparent;
    }
  }

  > .no-contacts {
    text-align: center;
  }

  > .button-section {
    position: fixed;
    right: 10px;
    top: 75px;
    display: flex;
    flex-direction: column;
  }
}
</style>