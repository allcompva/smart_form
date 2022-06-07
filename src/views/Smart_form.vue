<template>
    <v-container>
        <v-row style="margin-top: 25px">
            <v-col cols="12">
                <section style="background-color: #e9ebee; padding-top: 60px" v-if="datos_encuesta">
                    <EncuestaHome :data="datos_encuesta" @ocultar_modal="ocultar_modal"></EncuestaHome>
                </section>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import EncuestaHome from "../components/Encuestas/Encuestas.vue";
export default {
    data: () => {
        return {
            datos_encuesta: null,
        };
    },
  methods: {
    ocultar_modal(estado) {
      this.dialogencuesta = estado;
	  this.dialog = true;
    },
  },    
    components: {
        EncuestaHome,
    },
    components: {},
    async mounted() {
        this.datos_encuesta = (
            await this.$http.get("/FichasRelevamientos/encuestaModal?id=1")
        ).data;
    },
};
</script>