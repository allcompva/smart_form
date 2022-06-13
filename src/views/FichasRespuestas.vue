<template>
  <v-container v-if="pregunta != null && pregunta != 'undefined'">
    <v-row>
      <v-col cols="12" style="text-align: left">
        <h2
          v-html="pregunta.pregunta + ' | <small>' + pregunta.tipo + '</small>'"
        ></h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" style="text-align: right">
        <v-btn
          @click="nuevaPregunta()"
          style="background-color: #1c3e89 !important; color: white"
          >NUEVA RESPUESTA
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h3 v-html="'<small>Respuestas</small>'"></h3>
          </v-card-title>
          <v-card-text>
            <table style="width: 100%">
              <Draggable
                :list="pregunta.lstRespuestas"
                tag="tbody"
                @end="saveorden()"
              >
                <tr
                  v-for="(item, index) in pregunta.lstRespuestas"
                  :key="index"
                >
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
                    {{ item.texto }}
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
                            @click="editaPregunta(item.id, item.texto)"
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
        <v-btn
          :href="'/FichasPreguntas/' + parseInt(this.$route.params.idFicha)"
          >SALIR</v-btn
        >
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
              ¿Esta seguro de eliminar la respuesta?
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
            <v-card-title>Nueva Respuesta</v-card-title>
          </v-toolbar>

          <v-card-text style="margin-top: 20px">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="textoRespuesta"
                  :rules="[rules.required]"
                  label="Texto Respuesta"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialogAdd.value = false">Cancelar</v-btn>
            <v-btn text @click="guardarRespuesta()">Aceptar</v-btn>
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
      pregunta: null,
      respuesta_id_delete: null,
      dialogError: null,
      txtError: null,
      indice: null,
      dialogConfirma: false,
      dialogAdd: false,
      nombrePregunta: "",
      textoRespuesta: "",
      idRespuesta: 0,
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
    this.pregunta = (
      await this.$http.post("/FichasPreguntas/getByPk", post)
    ).data;
    this.desserts = this.pregunta.lstRespuestas;
    console.log(this.ficha);
  },
  methods: {
    async activa_desactiva(id, estado) {
      let post = {
        id: id,
        activa: estado,
        id_pregunta: parseInt(this.$route.params.id),
      };
      this.pregunta = (
        await this.$http.post("/FichasPreguntas/updateActivaRespuesta", post)
      ).data;
      this.desserts = this.ficha.lstPreguntas;
      console.log(this.pregunta);
    },
    nuevaPregunta() {
      this.dialogAdd = true;
      this.idRespuesta = 0;
      this.textoRespuesta = "";
    },
    editaPregunta(id, texto) {
      this.dialogAdd = true;
      this.idRespuesta = id;
      this.textoRespuesta = texto;
    },
    async guardarRespuesta() {
      if (this.textoRespuesta == "") {
        this.txtError = "Por favor ingrese el texto de la respuesta";
        this.dialogError = true;
        return;
      }
      if (this.idRespuesta == 0) {
        let post = {
          id_pregunta: parseInt(this.$route.params.id),
          texto: this.textoRespuesta,
        };
        this.pregunta = (
          await this.$http.post("/FichasPreguntas/insertRespuesta", post)
        ).data;
        this.desserts = this.pregunta.lstRespuestas;
        this.dialogAdd = false;
        console.log(this.pregunta);
      } else {
        let post = {
          id_pregunta: parseInt(this.$route.params.id),
          texto: this.textoRespuesta,
          id: this.idRespuesta,
        };
        this.pregunta = (
          await this.$http.post("/FichasPreguntas/updateRespuesta", post)
        ).data;
        this.desserts = this.pregunta.lstRespuestas;
        this.dialogAdd = false;
        console.log(this.pregunta);
      }
    },
    logicDelete(guid) {
      this.respuesta_id_delete = guid;
      this.dialogConfirma = true;
    },
    async confirmaLogicDelete() {
      let post = {
        id: this.respuesta_id_delete,
        id_pregunta: parseInt(this.$route.params.id),
      };
      this.pregunta = (
        await this.$http.post("/FichasPreguntas/deleteRespuesta", post)
      ).data;
      this.desserts = this.pregunta.lstRespuestas;
      console.log(this.pregunta);
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
      this.$http.get("/FichasPreguntas/reordenar?json=" + post);
    },
  },
};
</script>