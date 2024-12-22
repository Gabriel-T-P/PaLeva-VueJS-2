<template>

      <v-simple-table>
        <thead>
          <tr>
            <th class="text-center font-weight-bold">Código</th>
            <th class="text-center font-weight-bold">Nome</th>
            <th class="text-center font-weight-bold">E-mail</th>
            <th class="text-center font-weight-bold">Status</th>
            <th class="text-center font-weight-bold">Valor</th>
            <th class="text-center font-weight-bold">Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="o in orders" :key="o.id">
            <td class="text-center">{{ o.code }}</td>
            <td class="text-center">{{ o.name }}</td>
            <td class="text-center">{{ o.email }}</td>
            <td class="text-center">{{ getStatusDescription(o.status) }}</td>
            <td class="text-center">R$ {{ parseFloat(o.final_value || 0).toFixed(2) }}</td>
            <td class="text-center">
              <v-btn small outlined text color="primary" :to="{ name: 'detail', params: { id: o.id } }">Detalhes</v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>

</template>

<script>

export default {
  name: 'OrderTable',
  props:{
    orders:[]
  },

  methods:{
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
  }
}

</script>

<style scoped>
.table-row-alternate {
  background-color: #f9f9f9;
}

thead th {
  background-color: #f5f5f5;
}

v-card {
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.text-center {
  text-align: center;
}
</style>