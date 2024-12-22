<template>
  <v-container fluid>
    <v-row justify="center" class="mt-5">
      <v-col cols="12" md="10" lg="12">
        <v-card outlined>
          <v-card-title class="d-flex justify-space-between">
            <h1 class="text-h5">Lista de Pedidos</h1>
            <v-text-field
              v-model="search"
              label="Buscar Pedido pelo Código"
              outlined
              dense
              clearable
              class="ml-4 mt-5"
            ></v-text-field>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-subtitle>
            <v-row>
              <v-col cols="12">
                <v-radio-group
                  v-model="status_filter"
                  row
                  class="ml-4"
                >
                  <v-radio
                    label="Todos"
                    value="all"
                    color="primary"
                  ></v-radio>
                  <v-radio
                    label="Em Espera da Cozinha"
                    value="waiting_cook_confirmation"
                    color="primary"
                  ></v-radio>
                  <v-radio
                    label="Em Preparo"
                    value="cooking"
                    color="primary"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-card-subtitle>

          <v-divider></v-divider>

          <v-card-text>
            <OrderTable :orders="filterOrder" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
      search: "",
      status_filter: "all"
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

  computed: {
    // Lista todos os pedidos de acordo com o código e status
    filterOrder() {
      if (this.search) {
        return this.orders.filter(order => {
          const matchesStatus = this.status_filter === 'all' || order.status === this.status_filter;
          const matchesSearch = order.code.includes(this.search.toUpperCase());
          return matchesStatus && matchesSearch;
        });
      } else {
        // Se não houver texto na busca, apenas filtra pelo status
        return this.orders.filter(order => {
          return this.status_filter === 'all' || order.status === this.status_filter;
        });
      }
    }
  },
}

</script>

<style>
  .text-h5 {
    font-weight: 600;
  }
  
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