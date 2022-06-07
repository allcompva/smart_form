<template>
  <v-container>
    <v-row style="margin-top: 25px">
      <v-col cols="8" style="text-align: left">
        <h2>BADEC</h2>
      </v-col>
      <v-col cols="4" style="text-align: right">
        <v-btn><v-icon class="fa fa-plus"></v-icon> Agregar Badec</v-btn>
      </v-col>
    </v-row>
    <v-row style="margin-top: 25px">
      <v-col cols="12">
        <template v-if="desserts != null && desserts != 'undefined'">
          <v-card>
            <v-card-title>
              Base de datos de contribuyentes
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="desserts" :search="search">
              <template v-slot:[`item.nro_bad`]="{ item }">
                <v-menu top :close-on-content-click="closeOnContentClick">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn text v-bind="attrs" v-on="on" style="float: right">
                      <v-icon class="fa fa-bars"></v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item>
                      <v-btn :href="'/LiveEdit/' + item.nro_bad" text>
                        <v-icon small> mdi-pencil </v-icon> Editar
                      </v-btn>
                    </v-list-item>
                    <v-list-item>
                      <v-btn text @click="logicDelete(item.nro_bad)">
                        <v-icon small> mdi-delete </v-icon> Eliminar
                      </v-btn>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => {
    return {
      search: "",
      headers: [
        { text: "Nro. Badec", value: "nro_bad" },
        { text: "Nombre", value: "nombre" },
        { text: "Tipo Doc.", value: "tipo_doc" },
        { text: "Nro. Doc", value: "nro_doc" },
        { text: "Mail", value: "e_mail" },
        { text: "", value: "nro_bad" }
      ],
      desserts: null,
      closeOnContentClick: false,
    };
  },
  components: {},
  async mounted() {
    try {
      this.desserts = (await this.$http.get("/Badec/read2")).data;
    } catch (error) {
      this.desserts = null;
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.v-navigation-drawer--bottom.v-navigation-drawer--is-mobile {
  max-height: none;
  top: auto;
  bottom: 0;
  min-width: auto;
}
</style>