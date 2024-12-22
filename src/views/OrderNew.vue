<template>
  <div>
    <h1>Cadastrar Pedido</h1>
    <v-alert 
    v-for="(error, index) in message" 
    :key="index" 
    type="info" 
    dismissible 
    class="mb-2"
  >
    {{ error }}
  </v-alert>

    <div class="container">
      <v-form v-on:submit.prevent>

        <v-text-field outlined label="Nome" v-model="form.name" placeholder="Nome do comprador"> </v-text-field>

        <v-text-field outlined type="email" label="E-mail" v-model="form.email" placeholder="E-mail do comprador"> </v-text-field>

        <v-text-field outlined label="Número de Telefone" v-model="form.phone_number" placeholder="Número de telefone do comprador"> </v-text-field>

        <v-text-field outlined label="CPF" v-model="form.cpf" placeholder="CPF do comprador"> </v-text-field>

        <v-btn color="grey lighten-3" v-on:click="postOrder">Cadastrar</v-btn>

      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderNew',

  data(){
    return{
      message: null,
      form: {
        name: null,
        email: null,
        phone_number: null,
        cpf: null
      }
    }
  },

  methods:{
    async postOrder(){

      try {
        await this.$http.post('http://localhost:3000/api/v1/orders', {
        name: this.form.name,
        cpf: this.form.cpf,
        phone_number: this.form.phone_number,
        email: this.form.email
        })

        this.message = "Cadastrado com sucesso!";
      } catch (error) {
        this.message = error.body.errors
      }
    }
  }
}
</script>

<style>
  .form{
    margin-bottom: 15px;
  }

  .form input{
    margin: 5px;
  }
</style>