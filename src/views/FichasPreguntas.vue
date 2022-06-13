<template>
  <v-container v-if="desserts != null && desserts != 'undefined'">
    <v-row>
      <v-col cols="12" style="text-align: right">
        <v-btn
          @click="nuevaPregunta()"
          style="background-color: #1c3e89 !important; color: white"
          >NUEVA PREGUNTA
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h3 v-html="ficha.nombre + '<br><br><small>Preguntas</small>'"></h3>
          </v-card-title>
          <v-card-text>
            <table style="width: 100%">
              <Draggable
                :list="ficha.lstPreguntas"
                tag="tbody"
                @end="saveorden()"
              >
                <tr v-for="(item, index) in ficha.lstPreguntas" :key="index">
                  <td
                    :style="[
                      item.activa
                        ? { padding: '5px' }
                        : {
                            'background-color': '#d3d3d359',
                            opacity: '0.5',
                          },
                    ]"
                  >
                    {{ item.pregunta }}
                  </td>
                  <td
                    :style="[
                      item.activa
                        ? { padding: '5px' }
                        : {
                            'background-color': '#d3d3d359',
                            opacity: '0.5',
                          },
                    ]"
                  >
                    {{ item.tipo }}
                  </td>
                  <td>
                    <v-menu top :close-on-content-click="closeOnContentClick">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          text
                          v-bind="attrs"
                          v-on="on"
                          style="float: right"
                        >
                          <v-icon class="fa fa-bars"></v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item>
                          <v-btn
                            @click="
                              editaPregunta(
                                item.id,
                                item.pregunta,
                                item.tipo_pregunta
                              )
                            "
                            text
                          >
                            <v-icon small> mdi-pencil </v-icon> Editar
                          </v-btn>
                        </v-list-item>
                        <v-list-item>
                          <v-btn
                            text
                            v-if="item.activa"
                            @click="activa_desactiva(item.id, false)"
                          >
                            <v-icon left class="fa fa-eye"></v-icon>
                            Desactivar
                          </v-btn>
                          <v-btn
                            text
                            v-else
                            @click="activa_desactiva(item.id, true)"
                          >
                            <v-icon left class="fa fa-eye-slash"></v-icon>
                            Activar
                          </v-btn>
                        </v-list-item>
                        <v-list-item
                          v-if="
                            item.tipo_pregunta == 1 || item.tipo_pregunta == 2
                          "
                        >
                          <v-btn
                            text
                            :href="
                              '/FichasRespuestas/' + item.id + '/' + ficha.id
                            "
                          >
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
                  </td>
                </tr>
              </Draggable>
            </table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" style="text-align: right">
        <v-btn href="/Fichas">SALIR</v-btn>
      </v-col>
    </v-row>
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
              ¿Esta seguro de eliminar la pregunta?
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
      max-width="80%"
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
            <v-card-title>Nueva Pregunta</v-card-title>
          </v-toolbar>

          <v-card-text style="margin-top: 20px">
            <v-row>
              <v-col cols="8">
                <v-text-field
                  v-model="nombrePregunta"
                  :rules="[rules.required]"
                  label="Texto Pregunta"
                >
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="select"
                  :hint="`${select.tipo_pregunta}`"
                  :items="items"
                  item-text="text"
                  item-value="value"
                  label="Tipo Pregunta"
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
            <v-btn text @click="guardarPregunta()">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>
<script>
import Draggable from "vuedraggable";
export default {
  data: () => {
    return {
      closeOnContentClick: false,
      search: "",
      headers: [
        { text: "Nombre", value: "title" },
        { text: "", value: "guid" },
      ],
      rules: {
        required: (value) => !!value || "Campo requerido",
      },
      desserts: null,
      ficha: null,
      pregunta_id_delete: null,
      dialogError: null,
      txtError: null,
      indice: null,
      dialogConfirma: false,
      dialogAdd: false,
      nombrePregunta: "",
      idPregunta: 0,
      select: { text: "Multiple Opcion - Respuesta Unica", value: 1 },
      items: [
        { text: "Multiple Opcion - Respuesta Unica", value: 1 },
        { text: "Multiple Opcion - Respuesta Multiple", value: 2 },
        { text: "Respuesta Numerica", value: 3 },
        { text: "Respuesta de Texto", value: 4 },
        { text: "Ranking", value: 5 },
      ],
    };
  },
  components: {
    Draggable,
  },
  async mounted() {
    if (!this.$storage.getTextOrInt("idUsuario")) {
      this.$router.push("/");
    }
    let post = {
      id: parseInt(this.$route.params.id),
    };
    this.ficha = (await this.$http.post("/Fichas/getByPk", post)).data;
    this.desserts = this.ficha.lstPreguntas;
    console.log(this.ficha);
  },
  methods: {
    async activa_desactiva(id, estado) {
      let post = {
        id: id,
        activa: estado,
        id_ficha: parseInt(this.$route.params.id),
      };
      this.ficha = (
        await this.$http.post("/Fichas/updateActivaPregunta", post)
      ).data;
      this.desserts = this.ficha.lstPreguntas;
      console.log(this.ficha);
    },
    nuevaPregunta() {
      this.dialogAdd = true;
      this.idPregunta = 0;
    },
    editaPregunta(id, nombre, value) {
      this.dialogAdd = true;
      this.idPregunta = id;
      this.nombrePregunta = nombre;
      switch (value) {
        case 1:
          this.select = { text: "Multiple Opcion - Respuesta Unica", value: 1 };
          break;
        case 2:
          this.select = {
            text: "Multiple Opcion - Respuesta Multiple",
            value: 2,
          };
          break;
        case 3:
          this.select = { text: "Respuesta Numerica", value: 3 };
          break;
        case 4:
          this.select = { text: "Respuesta de Texto", value: 4 };
          break;
        case 5:
          this.select = { text: "Ranking", value: 5 };
          break;
      }
    },
    async guardarPregunta() {
      if (this.nombrePregunta == "") {
        this.txtError = "Por favor ingrese el texto de la pregunta";
        this.dialogError = true;
        return;
      }
      if (this.select.text == "") {
        this.txtError = "Por favor ingrese el tipo de pregunta";
        this.dialogError = true;
        return;
      }
      if (this.idPregunta == 0) {
        let post = {
          id_ficha: parseInt(this.$route.params.id),
          pregunta: this.nombrePregunta,
          tipo_pregunta: this.select.value,
        };
        this.ficha = (
          await this.$http.post("/Fichas/insertPregunta", post)
        ).data;
        this.desserts = this.ficha.lstPreguntas;
        this.dialogAdd = false;
        console.log(this.ficha);
      } else {
        let post = {
          id_ficha: parseInt(this.$route.params.id),
          pregunta: this.nombrePregunta,
          tipo_pregunta: this.select.value,
          id: this.idPregunta,
        };
        this.ficha = (
          await this.$http.post("/Fichas/updatePregunta", post)
        ).data;
        this.desserts = this.ficha.lstPreguntas;
        this.dialogAdd = false;
        console.log(this.ficha);
      }
    },
    logicDelete(guid) {
      this.pregunta_id_delete = guid;
      this.dialogConfirma = true;
    },
    async confirmaLogicDelete() {
      let post = {
        id: this.pregunta_id_delete,
        id_ficha: parseInt(this.$route.params.id),
      };
      this.ficha = (await this.$http.post("/Fichas/deletePregunta", post)).data;
      this.desserts = this.ficha.lstPreguntas;
      console.log(this.ficha);
      this.dialogConfirma = false;
    },
    saveorden() {
      var post = "[";
      this.desserts.forEach((element) => {
        post +=
          "{ 'id' : " +
          element.id +
          ", 'idMembership' : " +
          parseInt(this.$route.params.id) +
          "},";
      });
      post = post.substring(0, post.length - 1);
      post += "]";
      this.$http.get("/Fichas/reordenar?json=" + post);
    },
  },
};
</script>