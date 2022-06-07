<template>
  <v-container v-if="data != null && data != 'undefined'">
    <v-card shaped :style="[$vuetify.breakpoint.name != 'xs' &
      $vuetify.breakpoint.name != 'sm' &&
      $vuetify.breakpoint.name != 'md' ? {
      'padding-left': '20px',
      'padding-right': '20px',
      'margin-top': '50px',
      'margin-bottom': '50px'
    } : {
      'padding-left': '0px',
      'padding-right': '0px',
      'width': '100%'
    }
    ]">
      <v-card-title style="border-bottom: solid lightgray"
        v-if="data.lstPreguntas != null && data.lstPreguntas != 'undefined'">
        {{ data.nombre }}
      </v-card-title>
      <v-card-text style="margin-top: 20px">
        <v-container v-for="(item, indice) in data.lstPreguntas" :key="indice">
          <v-row>
            <v-col cols="12">
              <h3>{{ item.pregunta }}</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" style="padding-top: 0; padding-left: 25px">
              <v-radio-group v-if="item.tipo_pregunta == 1" style="margin-top: 0" v-model="respuestas[indice].respInt">
                <v-radio color="indigo" v-for="(item2, indice2) in item.lstRespuestas" :key="indice2" :value="item2.id"
                  :label="item2.texto"></v-radio>
              </v-radio-group>
              <div style="padding-bottom: 20px" v-if="item.tipo_pregunta == 2">
                <v-checkbox hide-details style="margin-bottom: 0" color="indigo" v-model="respuestas[indice].respmulti"
                  v-for="(item3, indice3) in item.lstRespuestas" :key="indice3" :value="item3.id" :label="item3.texto">
                </v-checkbox>
              </div>
              <v-text-field v-if="item.tipo_pregunta == 3" outlined type="number" v-model="respuestas[indice].respInt">
              </v-text-field>
              <v-text-field v-if="item.tipo_pregunta == 4" outlined v-model="respuestas[indice].respText">
              </v-text-field>
              <v-rating v-if="item.tipo_pregunta == 5" v-model="respuestas[indice].respInt" color="yellow darken-3"
                background-color="grey darken-1" hover large></v-rating>
            </v-col>
          </v-row>
        </v-container>
        <v-row>
          <v-col cols="12" style="text-align: center; margin-top: 10px; margin-bottom: 30px">
            <v-btn color="primary" :loading="load" @click="prueba()">ENVIAR</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => {
    return {
      closeOnContentClick: false,
      encuesta: null,
      column: null,
      control: false,
      respuestas: [
        {
          id_pregunta: 0,
          respInt: 0,
          respText: "",
          respmulti: [],
        }
      ],
      i: 0,
      load: false,
    };
  },
  props: {
    data: {
      type: [Object],
      default: () => { return {} },
    },
  },
  mounted() {
    try {
      this.data.lstPreguntas.forEach((element) => {
        this.respuestas.push({
          id_pregunta: element.id,
          respInt: 0,
          respText: "",
          respmulti: [],
        });
      })
      
      this.respuestas.splice(0,1);
    } catch (error) {
      this.desserts = null;
    }
  },
  methods: {
    async prueba() {
      this.respuestas.forEach((element) => {
        if (
          (element.respmulti == null ||
            element.respmulti == "undefined" ||
            element.respmulti == "") &&
          element.respInt == 0 &&
          element.respText == ""
        ) {
          this.control = true;
        }
      });
      if (this.control) {
        alert("Por favor responda todas las preguntas");
        this.control = false;
      } else {
        this.respuestas.forEach((element) => {
          if (
            element.respmulti != null &&
            element.respmulti != "undefined" &&
            element.respmulti != ""
          ) {
            this.data.lstRespuestas[this.i].respmulti = element.respmulti;
          }
          if (element.respInt != 0) {
            this.data.lstRespuestas[this.i].respInt = parseInt(element.respInt);
          }
          if (element.respText != "") {
            this.data.lstRespuestas[this.i].respText = element.respText;
          }
          this.i++;
        });

        await this.$http.post(
          "/FichasRelevamientos/encuestaModalHomeResultado",
          this.data
        );
        this.$emit("ocultar_modal", false);
      }
    },
  },
};
</script>