<template>
  <div class="add-contacts-main">
    <Input placeholder="Contact Name" :text.sync="name" :errorMessage.sync="nameError" />
    <Input placeholder="Contact Phone Number" :text.sync="number" :errorMessage.sync="numberError" />

    <button class="save-button" @click="saveClicked">Save</button>
    <button class="back-button" @click="$router.push('/')">Back to Contact List</button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  components: {
  },
  data: function() {
    return {
      name: '',
      number: '',
      nameError: '',
      numberError: ''
    }
  },
  props: {
  },
  methods: {
    saveClicked: async function() {
      let hasError = !this.name || !this.number;
      if (!this.name) { this.nameError = 'Name is required!' }
      if (!this.number) { this.numberError = 'Phone number is required!' }

      if (hasError) { return }

      var insert = await this.$axios.post('/contacts', {
        "name": this.name,
        "number": this.number
      });
      if (insert.data['inserted']) {
        await Swal.fire(
          'Contacts Added',
          `You've successfully added ${this.name} to your contact list!`,
          'success'
        );

        this.$router.push('/');
      } else {
        await Swal.fire(
          'Error',
          `There was an error occurred while trying to add your contact. Please try again.`,
          'error'
        );
      }
    }
  },
  mounted() {
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
.add-contacts-main {
  width: 100%;
  max-width: 400px;
  font-size: 0.9em;
  display: flex;
  flex-direction: column;
  position: relative;

  > .save-button {
    margin: 10px 0;
  }

  > .back-button {
    background-color: rgb(255, 141, 141);
  }
}
</style>