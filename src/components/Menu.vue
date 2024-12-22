<template>
  <v-container>
    <v-row>
      <v-col>
        <v-toolbar color="grey lighten-4">
          <v-toolbar-title>PaLevá</v-toolbar-title>
          <v-spacer></v-spacer>
          <nav>
           <v-btn text color="grey" to="/"> Home </v-btn>
           <v-btn text color="grey" to="/orders"> Pedidos </v-btn>
           <v-btn text color="grey" to="/order/new"> Cadastrar Pedido </v-btn>
           <v-btn text color="grey" to="/about"> About </v-btn>
          </nav>
        </v-toolbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Menu'
}

</script>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>