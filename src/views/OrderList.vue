<template>

  <div>
    <h1>Lista de Pedidos</h1>

    <input class="form" v-model="search" type="text" placeholder="Buscar Pedido">

    <div v-for="o in filterOrder" :key="o.id">
      <Order
        :id = "o.id"
        :name = "o.name"
        :code = "o.code"
        :phone_number = "o.phone_number"
        :email = "o.email"
        :status = "o.status"
        :final_value = "o.final_value"
      />
    </div>

  </div>

</template>

<script>

// importando compoentes
import Order from '../components/Order.vue'

export default {
  name: 'OrderList',
  components:{
    Order
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