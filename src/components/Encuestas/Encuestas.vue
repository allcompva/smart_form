<template>
  <v-container v-if="data.lstPreguntas != null && data.lstPreguntas != 'undefined'" style="padding:0">
    <v-card :style="[$vuetify.breakpoint.name != 'xs' &
      $vuetify.breakpoint.name != 'sm' &&
      $vuetify.breakpoint.name != 'md' ? {
      'margin-bottom': '100px', background: 'transparent', boxShadow: 'none'
    } : {
      background: 'transparent',
      paddingLeft: '0px',
      paddingRight: '0px',
      width: '100%',
      boxShadow: 'none'
    }
    ]">
      <v-card-title :style="{
        color: 'rgb(26, 71, 54)',
        fontSize: '24px',
        display: 'block',
        fontWeight: '600',
        paddingTop: '30px',
        backgroundPosition: '50% 0px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }" v-if="data.lstPreguntas != null && data.lstPreguntas != 'undefined'">
        <h2 style="
              color: #FFDE16;
              font-family: Montserrat, Sans-serif;
              font-size: 25px;
              font-weight: 600;
              line-height: 1em;
              letter-spacing: -1.1px;">Masterclass</h2>
        <h2 style="    
                color: #FFFFFF;
                font-family: Montserrat, Sans-serif;
                font-size: 35px;
                font-weight: 700;
                padding-top: 5px;
                line-height: 1em;
                letter-spacing: -1.1px;">{{ data.nombre }}</h2>

        <div
          style="margin: 0px 0px 0px 0px;background .3s,border .3s,border-radius .3s,box-shadow .3s,-webkit-border-radius .3s,-webkit-box-shadow .3s">
          <ul style="margin-right: calc(-18px/2);
    margin-left: calc(-18px/2);padding: 0; -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;    list-style: none;
    display: inline-flex;
    color: white;
    padding-top: 5px;
    margin-left: 2px;">
            <li style="
                  font-family: Montserrat, Sans-serif;
                  font-size: 23px;
                  font-weight: 600;
                  letter-spacing: -1.1px;">
              <span style="
                      font-family: Montserrat, Sans-serif;
                      font-size: 23px;
                      font-weight: 600;
                      letter-spacing: -1.1px;">
                <i aria-hidden="true" class="far fa-calendar-alt" style="
                                        -webkit-font-smoothing: antialiased;
                                        display: inline-block;
                                        font-style: normal;
                                        font-variant: normal;
                                        text-rendering: auto;
                                        line-height: 1;
                                        color: #FFFFFF;
                                            margin-right: 10px;
                                        font-size: 17px;"></i> </span>
              <span style="
                      font-family: Montserrat, Sans-serif;
                      font-size: 23px;
                      font-weight: 600;
                      letter-spacing: -1.1px;">24 de Julio</span>
            </li>
            <li style="
                  font-family: Montserrat, Sans-serif;
                  font-size: 23px;
                  font-weight: 600;
                  letter-spacing: -1.1px;">
              <span style="
                      font-family: Montserrat, Sans-serif;
                      font-size: 23px;
                      font-weight: 600;
                      letter-spacing: -1.1px;">
                <i aria-hidden="true" class="far fa-clock" style="
                                        -webkit-font-smoothing: antialiased;
                                        display: inline-block;
                                        font-style: normal;
                                        font-variant: normal;
                                        text-rendering: auto;
                                        line-height: 1;
                                        color: #FFFFFF;
                                            margin-right: 10px;
                                                margin-left: 30px;
                                        font-size: 17px;"></i> </span>
              <span style="
                      font-family: Montserrat, Sans-serif;
                      font-size: 23px;
                      font-weight: 600;
                      letter-spacing: -1.1px;">20:30 hrs</span>
            </li>
          </ul>
        </div>
        <h2 style="color: #FFDE16;
    font-family: Montserrat, Sans-serif;
    padding-top:5px;
    font-size: 20px;
    font-weight: 600;
    line-height: 1em;
    letter-spacing: -1.1px;">¡Inscríbete y accede por Zoom!</h2>
      </v-card-title>
      <v-card-text style="padding-left: 2px; padding-right:2px;"  >
        <v-row>
          <v-col cols="12" style="padding-bottom:0;">
            <v-container v-for="(item, indice) in data.lstPreguntas" :key="indice">
              <v-row>
                <v-col cols="12" style="padding-top: 0;">
                  <v-radio-group v-if="item.tipo_pregunta == 1" style="margin-top: 0"
                    v-model="respuestas[indice].respInt">
                    <v-radio color="indigo" v-for="(item2, indice2) in item.lstRespuestas" :key="indice2"
                      :value="item2.id" :label="item2.texto"></v-radio>
                  </v-radio-group>
                  <div style="padding-bottom: 20px" v-if="item.tipo_pregunta == 2">
                    <v-checkbox hide-details style="margin-bottom: 0" color="indigo"
                      v-model="respuestas[indice].respmulti" v-for="(item3, indice3) in item.lstRespuestas"
                      :key="indice3" :value="item3.id" :label="item3.texto">
                    </v-checkbox>
                  </div>
                  <v-text-field v-if="item.tipo_pregunta == 3" outlined dense type="number"
                    v-model="respuestas[indice].respInt">
                  </v-text-field>
                  <v-text-field v-if="item.tipo_pregunta == 4" style="color:black" :label="item.pregunta" outlined solo hide-details
                    v-model="respuestas[indice].respText">
                  </v-text-field>
                  <v-rating v-if="item.tipo_pregunta == 5" v-model="respuestas[indice].respInt" color="yellow darken-3"
                    background-color="grey darken-1" hover large></v-rating>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>

        <v-row style="margin-top: 0;">
          <v-col cols="12" style="padding-left: 24px;">
            <v-btn v-if="$router.currentRoute.name != 'SmartFormView'"  style="
                background-color: #2FB777; 
                color: #ffffff;
                flex-basis: auto;
                padding-top: 0;
                padding-bottom: 0;
                border: none;    display: inline-block;
                line-height: 1;
                font-size: 15px;
                min-height: 40px;
                padding: 12px 24px;
                border-radius: 3px;
                fill: #fff;
                text-align: center;
                -o-transition: all .3s;
                transition: all .3s;" :loading="load" @click="prueba()">INSCRIBIRME</v-btn>
            <v-btn v-else disabled  style="
                background-color: #2FB777; 
                color: #ffffff;
                flex-basis: auto;
                padding-top: 0;
                padding-bottom: 0;
                border: none;    display: inline-block;
                line-height: 1;
                font-size: 15px;
                min-height: 40px;
                padding: 12px 24px;
                border-radius: 3px;
                fill: #fff;
                text-align: center;
                -o-transition: all .3s;
                transition: all .3s;" :loading="load" @click="prueba()">INSCRIBIRME</v-btn>                
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<style>
.v-text-field--solo>.v-input__control>.v-input__slot {
  background: #FFFFFF !important;
  color: black !important;
}
</style>
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

      this.respuestas.splice(0, 1);
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