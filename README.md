# PaLeva-VueJS-2

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### dependencies
```
vue: 2.6.14
vue/cli: 5.0.8
vue-resource: 1.5.3
vue-router: 3.5.1
vuetify: 2.6.0
```

### API
Os seguintes endpoints da API do PaLevá são consumidos neste app:
-/api/v1/orders/:id
-/api/v1/orders/:id/set_status_cooking
-/api/v1/orders/:id/set_status_ready
-/api/v1/:establishmentCode/:orderCode/orders/:id/set_status_canceled?cancel_reason=?

