<template>
  <div class="contacts-list-main">
    <div class="no-contacts" v-if="$store.state.rawResult.length == 0">You have no contacts<br />Add contacts to view it here</div>
    <div v-else-if="$store.state.search">
      <div>Found {{ $store.state.searchResult.length }} contacts that includes `{{ $store.state.search }}`</div>
      <div class="contacts" :class="[ i % 2 == 0 ? 'even' : 'odd' ]" v-for="(r, i) in $store.state.searchResult" :key="i">
        <div class="name">{{ r['name'] }}</div>
        <div class="number">{{ r['number'] }}</div>
      </div>
    </div>
    <div v-else>
      <div class="contacts-group" v-for="(c, i) in $store.state.contactsListing" :key="i" :id="c['letter']">
        <div class="grouping" v-if="c['contacts'].length > 0">{{ c['letter'] }}</div>
        <div class="contacts" :class="[ (i + ci) % 2 == 0 ? 'even' : 'odd' ]" v-for="(con, ci) in c['contacts']" :key="ci"
          @contextmenu="contactRightClicked($event, con, c['letter'])">
          <div class="name">{{ con['name'] }}</div>
          <div class="number">{{ con['number'] }}</div>
        </div>
      </div>
    </div>
    <div class="button-section">
      <div v-for="(c, i) in $store.state.contactsListing" :key="i">
        <button class="letter-button" v-if="c['contacts'].length > 0" @click="groupingClicked(c['letter'])">{{ c['letter'] }}</button>
      </div>
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
    }
  },
  props: {
  },
  methods: {
    groupingClicked: function(letter) {
      $(`#${letter}`)[0].scrollIntoView();
    },
    contactRightClicked: async function(e, item, letter) {
      e.preventDefault();
      
      var deleteContact = await Swal.fire({
        title: `Do you want to delete ${item['name']} from your contacts?`,
        showCancelButton: true,
        confirmButtonText: `Yes`,
        cancelButtonText: `No`,
        icon: 'warning'
      });
      
      if (deleteContact['isConfirmed']) {
        var deleted = await this.$axios.delete('/contacts', { data: item });
        if (deleted.data['deleted']) {
          Swal.fire(
            'Contact Deleted',
            `You've deleted ${item['name']} from your contacts list!`,
            'success'
          );

          var contactLetter = this.$store.state.contactsListing.filter(c => c['letter'] == letter);
          var index = contactLetter[0]['contacts'].indexOf(item);
          contactLetter[0]['contacts'].splice(index, 1);

          var rawIndex = this.$store.state.rawResult.indexOf(item);
          this.$store.state.rawResult.splice(rawIndex, 1);
        } else {
          Swal.fire(
            'Error',
            `There was an error while deleting your contact. Please try again.`,
            'error'
          );
        }
      }
    }
  },
  async mounted() {
    this.$store.state.contactsListing = [];
    let contacts = await this.$axios.get('/contacts');
    this.$store.state.rawResult = contacts.data;

    let letters = [...new Set(contacts.data.map(c => c['name'][0].toUpperCase()))].sort();
    letters.forEach((l) => {
      this.$store.state.contactsListing.push({
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

.letter-button {
  background-color: transparent;
  border: none;
  font-size: 0.8em;
  margin: 1px 0;
  padding: 0;
}

.contacts-group {
  position: relative;

  > .grouping {
    padding: 5px;
    background-color: rgb(64,64,64,);
    color: white;
    position: sticky;
    top: 50px;
  }
}

.contacts {
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

  &:hover {
    background-color: rgba(28, 232, 255, 0.4);
  }
}

.odd {
  background-color: rgba(200,200,200,0.3);
}

.even {
  background-color: transparent;
}
</style>