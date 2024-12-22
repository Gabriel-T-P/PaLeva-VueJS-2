<template>

  <div>
    <h1>Lista de Pedidos</h1>

    <v-text-field class="my-5" v-model="search" label="Buscar Pedido pelo Código" outlined></v-text-field>

    <v-card>
      <v-card-title class="text-h5 font-weight-bold">Lista de Pedidos</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <OrderTable :orders="filterOrder"/>
      </v-card-text>
    </v-card>

  </div>

</template>

<script>

// importando compoentes
import Order from '../components/Order.vue';
import OrderTable from '../components/OrderTable.vue';

export default {
  name: 'OrderList',
  components:{
    Order,
    OrderTable
  },

  data(){
    return{
      orders:[],
      search: ""
    }
  },

  async mounted(){
    this.getOrder();
  },

  methods:{
    async getOrder() {
      // Fazendo as requisição
      const response = await this.$http.get('http://localhost:3000/api/v1/orders');
      const result = await response.json();

      // Adicionando os dados ao array result
      this.orders = result;
      return this.orders;
    }
  },

  computed:{
    filterOrder(){
      return this.orders.filter(order => {
        return order.code.toLowerCase().includes(this.search.toLowerCase());
      })
    }
  }
}

</script>

<style>
  .card{
    border-style: solid;
    border-radius: 25px;
    margin-bottom: 10px;
    width: 30%;
    margin-left: auto;
    margin-right: auto;
  }

  .form{
    margin-bottom: 20px;
  }
</style>