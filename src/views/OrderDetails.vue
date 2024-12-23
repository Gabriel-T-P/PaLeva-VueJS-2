<template>
  <v-container>
    <v-alert v-if="message" type="error" dismissible class="mb-2">{{ message }}</v-alert>
    <v-card class="pa-5">
      <v-card-title class="text-h4 font-weight-bold">Detalhes do Pedido</v-card-title>
      <v-divider></v-divider>
      <v-row class="mt-5">
        <v-col cols="12" md="6">
          <v-card flat>
            <v-card-title class="text-h6 font-weight-bold">Código do Estabelecimento</v-card-title>
            <v-card-subtitle>{{ order.establishmentCode }}</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card flat>
            <v-card-title class="text-h6 font-weight-bold">Código do Pedido</v-card-title>
            <v-card-subtitle>{{ order.code }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-card flat>
            <v-card-title class="text-h6 font-weight-bold">Nome do Cliente</v-card-title>
            <v-card-subtitle>{{ customer.name }}</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card flat>
            <v-card-title class="text-h6 font-weight-bold">CPF</v-card-title>
            <v-card-subtitle>{{ customer.cpf }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-card flat>
            <v-card-title class="text-h6 font-weight-bold">E-mail</v-card-title>
            <v-card-subtitle>{{ customer.email }}</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card flat>
            <v-card-title class="text-h6 font-weight-bold">Telefone</v-card-title>
            <v-card-subtitle>{{ customer.phoneNumber }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-card flat>
            <v-card-title class="text-h6 font-weight-bold">Status do Pedido</v-card-title>
            <v-card-subtitle>
              <v-chip info>{{ getStatusDescription(order.status) }}</v-chip>
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card flat>
            <v-card-title class="text-h6 font-weight-bold">Valor Final</v-card-title>
            <v-card-subtitle>
              R$ {{ parseFloat(order.finalValue || 0).toFixed(2) }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card flat>
            <v-card-title class="text-h6 font-weight-bold">Data de Criação</v-card-title>
            <v-card-subtitle>
              {{ new Date(order.createdAt).toLocaleString() }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-btn dark x-large v-if="order.status === 'waiting_cook_confirmation'" v-on:click="setCooking" class="mt-5">Marcar em Preparo</v-btn>
    <v-btn dark x-large v-if="order.status === 'cooking'" v-on:click="setReady" class="mt-5">Marcar Pronto</v-btn>
    <v-divider class="my-4"></v-divider>
    <div v-if="order.status === 'canceled'">
      <div v-if="cancelReason.length >= 3">
        <p> <strong>Motivo do Cancelamento:</strong> {{ cancelReason }} </p>
      </div>
    </div>
    <v-row v-if="['cooking', 'waiting_cook_confirmation'].includes(order.status)">
      <v-col class="d-flex align-baseline">
        <v-btn dark x-large v-on:click="setCanceled" class="mr-5">Marcar como Cancelado</v-btn>
        <v-text-field clearable outlined v-model="cancelReason" placeholder="Motivo do Cancelamento"></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'OrderDetail',

  data(){
    return{
      order: {},
      customer: {},
      message: null,
      cancelReason: null
    }
  },

  async mounted(){
    this.getOrder();
  },

  methods:{
    async getOrder() {
      try {

        // Fazendo as requisição
        const response = await this.$http.get(`http://localhost:3000/api/v1/orders/${this.$route.params.id}`);
        const data = await response.json();
        var order = new Object();
        var customer = new Object();
        
        if (data) {
          // Order
          order.establishmentCode = data.establishment_code;
          order.code = data.order.code;
          order.status = data.order.status;
          order.createdAt = data.order.created_at;
          order.portions = data.portions;
          order.finalValue = data.order.final_value;
          // Customer
          customer.name = data.order.name;
          customer.cpf = data.order.cpf;
          customer.email = data.order.email;
          customer.phoneNumber = data.order.phone_number;

          this.order = order;
          this.customer = customer;

          if (data.order.cancel_reason) {
            this.cancelReason = data.order.cancel_reason;
          } else {
            this.cancelReason = ' ';
          }
        }
      } catch (error) {
        this.message = "Pedido não encontrado.";
      }
    },

    async setCooking() {
      // Faz uma requisição patch para marcar como em preparo
      const response = await this.$http.patch(`http://localhost:3000/api/v1/orders/${this.$route.params.id}/set_status_cooking`);

      if (response.ok) {
        window.location.reload();
      } else {
        this.message = "Erro ao atualizar o pedido"; 
      }
    },

    async setReady() {
      // Faz uma requisição patch para marcar pedido como pronto
      const response = await this.$http.patch(`http://localhost:3000/api/v1/orders/${this.$route.params.id}/set_status_ready`)

      if (response.ok) {
        window.location.reload();
      } else {
        this.message = "Erro ao atualizar o pedido";
      }
    },

    async setCanceled() {
      // Faz uma requisição patch para marcar pedido como cancelado
      const response = await this.$http.patch(`http://localhost:3000/api/v1/${this.order.establishmentCode}/${this.order.code}/orders/${this.$route.params.id}/set_status_canceled?cancel_reason=${this.cancelReason}`)

      if (response.ok) {
        window.location.reload();
      } else {
        this.message = "Erro ao atualizar o pedido"; 
      }
    },

    getStatusDescription(status) {
      const statusDescriptions = {
        waiting_cook_confirmation: 'Esperando confirmação da cozinha',
        cooking: 'Pedido em preparo',
        canceled: 'Pedido cancelado',
        ready: 'Pedido pronto',
        delivered: 'Pedido entregue',
      };
      return statusDescriptions[status]
    }
  },
}

</script>

<style>
.v-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}
</style>