<template>
  <div>
    <h1>Cadastrar Pedido</h1>

    <div>{{ message }}</div>

    <div class="container">
      <form v-on:submit.prevent>
        <div class="form">
          <label>Nome: </label>
          <input type="text" v-model="form.name" placeholder="Nome do comprador">
        </div>

        <div class="form">
          <label>E-mail: </label>
          <input type="email" v-model="form.email" placeholder="E-mail do comprador">
        </div>

        <div class="form">
          <label>Número de telefone: </label>
          <input type="text" v-model="form.phone_number" placeholder="Número de telefone do comprador">
        </div>

        <div class="form">
          <label>CPF: </label>
          <input type="text" v-model="form.cpf" placeholder="CPF do comprador">
        </div>

        <div class="form">
          <button v-on:click="postOrder">Cadastrar</button>
        </div>
      </form>
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
        this.message = "Cadastro falhou"
       console.log(error) 
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