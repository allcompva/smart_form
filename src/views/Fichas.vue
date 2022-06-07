<template>
  <v-container v-if="desserts != null && desserts != 'undefined'">
    <v-row>
      <v-col cols="12" style="text-align: right">
        <v-btn
          @click="nuevaFicha()"
          style="background-color: #1c3e89 !important; color: white"
          >NUEVA ENCUESTA
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            ENCUESTAS
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="desserts" :search="search">
            <template v-slot:[`item.nombre`]="{ item }">
              <span
                :style="[
                  item.activo
                    ? { padding: '5px' }
                    : {
                        'background-color': '#d3d3d359',
                        opacity: '0.5',
                      },
                ]"
              >
                {{ item.nombre }}
              </span>
            </template>
            <template v-slot:[`item.entorno`]="{ item }">
              <span
                :style="[
                  item.activo
                    ? { padding: '5px' }
                    : {
                        'background-color': '#d3d3d359',
                        opacity: '0.5',
                      },
                ]"
              >
                {{ item.entorno }}
              </span>
            </template>
            <template v-slot:[`item.id`]="{ item }">
              <v-menu top :close-on-content-click="closeOnContentClick">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text v-bind="attrs" v-on="on" style="float: right">
                    <v-icon class="fa fa-bars"></v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item>
                    <v-btn
                      @click="editaFicha(item.id, item.nombre, item.entorno)"
                      text
                    >
                      <v-icon small> mdi-pencil </v-icon> Editar
                    </v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn
                      text
                      v-if="item.activo"
                      @click="activa_desactiva(item.id, false)"
                    >
                      <v-icon left class="fa fa-eye"></v-icon>
                      Desactivar
                    </v-btn>
                    <v-btn text v-else @click="activa_desactiva(item.id, true)">
                      <v-icon left class="fa fa-eye-slash"></v-icon>
                      Activar
                    </v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn text :href="'FichasPreguntas/' + item.id">
                      <v-icon small> mdi-cogs </v-icon> Configurar
                    </v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn text @click="logicDelete(item.id)">
                      <v-icon small> mdi-delete </v-icon> Eliminar
                    </v-btn>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      v-model="dialogConfirma"
    >
      <template v-slot:default="dialogConfirma">
        <v-card>
          <v-toolbar
            style="
              background-color: red !important;
              border-color: red !important;
            "
            dark
          >
            <v-card-title>Confirmar</v-card-title>
          </v-toolbar>

          <v-card-text>
            <div
              style="
                margin-top: 20px;
                text-align: center;
                color: black;
                font-size: 20px;
                font-family: 'DM Sans';
              "
            >
              ¿Esta seguro de eliminar la encuesta?
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialogConfirma.value = false">Cancelar</v-btn>
            <v-btn text @click="confirmaLogicDelete()">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      v-model="dialogAdd"
    >
      <template v-slot:default="dialogAdd">
        <v-card>
          <v-toolbar
            style="
              background-color: #1c3e89 !important;
              border-color: #1c3e89 !important;
            "
            dark
          >
            <v-card-title>Nueva Encuesta</v-card-title>
          </v-toolbar>

          <v-card-text style="margin-top: 20px">
            <v-row>
              <v-col cols="8">
                <v-text-field
                  v-model="nombreFicha"
                  :rules="[rules.required]"
                  label="Nombre Encuesta"
                >
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="select"
                  :hint="`${select.entorno}`"
                  :items="items"
                  item-text="state"
                  item-value="state"
                  label="Entorno"
                  persistent-hint
                  return-object
                  single-line
                >
                </v-select>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialogAdd.value = false">Cancelar</v-btn>
            <v-btn text @click="guardarEncuesta()">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      v-model="dialogError"
    >
      <template v-slot:default="dialogError">
        <v-card>
          <v-toolbar
            style="
              background-color: red !important;
              border-color: red !important;
            "
            dark
            >Error!</v-toolbar
          >
          <v-card-text>
            <div
              style="
                margin-top: 20px;
                text-align: center;
                color: black;
                font-size: 20px;
                font-family: 'DM Sans';
              "
            >
              {{ txtError }}
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialogError.value = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  data: () => {
    return {
      closeOnContentClick: false,
      search: "",
      headers: [
        { text: "NOMBRE", value: "nombre" },
        { text: "ENTORNO", value: "entorno" },
        { text: "", value: "id" },
      ],
      rules: {
        required: (value) => !!value || "Campo requerido",
      },
      desserts: null,
      idEncuesta: null,
      dialogError: null,
      txtError: null,
      dialogConfirma: false,
      dialogAdd: false,
      nombreFicha: "",
      select: { state: "CURSO" },
      items: [{ state: "CURSO" }, { state: "PAGINA" }, { state: "SESIONES GRABADAS" }, { state: "HOME" }, { state: "LIVE" }],
    };
  },

  async mounted() {
    try {
        alert();
      this.desserts = (await this.$http.get("/Fichas/readCMS")).data;
    } catch (error) {
      this.desserts = null;
    }   
  },
  methods: {
    logicDelete(id) {
      this.idEncuesta = id;
      this.dialogConfirma = true;
    },
    nuevaFicha() {
      this.dialogAdd = true;
      this.idEncuesta = 0;
    },
    editaFicha(id, nombre, entorno) {
      this.dialogAdd = true;
      this.idEncuesta = id;
      this.nombreFicha = nombre;
      this.select.state = entorno;
    },
    async guardarEncuesta() {
      if (this.nombreFicha == "") {
        this.txtError = "Por favor ingrese el nombre de la ficha";
        this.dialogError = true;
        return;
      }
      if (this.select.state == "") {
        this.txtError = "Por favor ingrese el entorno de la ficha";
        this.dialogError = true;
        return;
      }
      if (this.idEncuesta == 0) {
        let post = {
          nombre: this.nombreFicha,
          entorno: this.select.state,
        };
        this.desserts = (await this.$http.post("/Fichas/insert", post)).data;
        this.dialogAdd = false;
      }
      else{
         let post = {
          nombre: this.nombreFicha,
          entorno: this.select.state,
          id: this.idEncuesta,
        };
        this.desserts = (await this.$http.post("/Fichas/update", post)).data;
        this.dialogAdd = false;         
      }
    },
    async confirmaLogicDelete() {
        let post = {
          id: this.idEncuesta,
        };
        this.desserts = (await this.$http.post("/Fichas/delete", post)).data;
        this.dialogConfirma = false;
    },
    async activa_desactiva(id, estado) {
         let post = {
          id: id,
          activo: estado,
        };
        this.desserts = (await this.$http.post("/Fichas/updateActiva", post)).data;      
    },
  },
};
</script>