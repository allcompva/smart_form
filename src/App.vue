<template>
  <v-app>
    <v-app-bar app color="primary" dark v-if="
						$router.currentRoute.name != 'Smart_form' 
					">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <v-img style="display:none"
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://vecino.villaallende.gov.ar/App_Themes/images/GESTION%20vertical%202.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        @click.stop="drawer2 = !drawer2"
        style="margin-right: 1%"
      >
      <v-avatar>
        <v-img
          style="height: 55px; margin-top: 25px"
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://randomuser.me/api/portraits/women/81.jpg"
          width="100"
        />
      </v-avatar>
      </v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary v-if="
						$router.currentRoute.name != 'Smart_form' 
					">
      <v-list nav dense style="text-align: left">
        <v-list-item>
          <v-list-item-title><v-btn href="./Fichas" style="width:100%; text-align:left;">FICHAS</v-btn></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer v-model="drawer2" absolute temporary right v-if="
						$router.currentRoute.name != 'Smart_form' 
					">
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item >
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

<script>
export default {
  name: "App",
  items: [],
  data: () => ({
    drawer: false,
    drawer2:false,
  }),
};
</script>
