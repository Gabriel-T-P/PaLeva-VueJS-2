<template>
  <div class="card">
    <h3>Pedido {{ code }}</h3>
    <address>
      <p>Status: {{ status }}</p>
      <p>Dono do pedido: {{ name }}</p>
      <p>Número do celular: {{ phone_number }}</p>
      <p>E-mail: {{ email }}</p>
      <p>Valor do Pedido: R$ {{ final_value }}</p>
    </address>
  </div>
</template>

<script>

export default {
  name: 'Order',
  props:{
    id: Number,
    name: String,
    email: String,
    code: String,
    phone_number: String,
    status: String,
    final_value: String
  }
}

</script>

<style>
</style>