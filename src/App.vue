<template>
  <v-app>
    <v-app-bar app color="#1f4a36" dark v-if="
      $router.currentRoute.name != 'Smart_form' && $router.currentRoute.name != 'Login' && $router.currentRoute.name != 'SmartForm'
    ">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <v-img style="display:none" alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100"
          src="https://vecino.villaallende.gov.ar/App_Themes/images/GESTION%20vertical%202.png" width="100" />
      </div>

      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawer2 = !drawer2" style="margin-right: 1%">
        <v-avatar>
          <v-img style="height: 55px; margin-top: 25px" alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down"
            contain min-width="100" src="https://electronicssoftware.net/wp-content/uploads/user.png" width="100" />
        </v-avatar>
      </v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary v-if="
      $router.currentRoute.name != 'Smart_form' && $router.currentRoute.name != 'Login' && $router.currentRoute.name != 'SmartForm'
    ">
      <v-list nav dense style="text-align: left">
        <v-list-item>
          <v-list-item-title>
            <v-btn href="./Fichas" style="width:100%; text-align:left;">FICHAS</v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer v-model="drawer2" absolute temporary right v-if="
      $router.currentRoute.name != 'Smart_form' && $router.currentRoute.name != 'Login' && $router.currentRoute.name != 'SmartForm'
    ">
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://electronicssoftware.net/wp-content/uploads/user.png" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ nombre }}</v-list-item-title>
            <v-list-item-subtitle>EIT#{{ customer_id }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<style>
h1,
h2,
h3,
h4,
h5,
h6,
p,
span,
a,
div {
  word-break: break-word !important;
}
</style>
<script>
export default {
  name: "App",
  items: [],
  data: () => ({
    drawer: false,
    drawer2: false,
    nombre: "",
    customer_id: "",
    selectedItem: null,
    items: [
      { text: 'Mis Datos', icon: 'mdi-account' },
      { text: 'Cambiar contraseña', icon: 'mdi-key' },
      { text: 'Cerrar sesión', icon: 'mdi-logout' },
    ],
  }),
  mounted() {
    try {
      this.nombre = this.$storage.getTextOrInt("nombre");
      this.customer_id = this.$storage.getTextOrInt("customer_id");
    } catch (error) {

    }
  },

};
</script>
