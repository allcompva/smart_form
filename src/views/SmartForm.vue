<template>
    <v-container fluid style="background-image: url('https://global-uploads.webflow.com/6165fc8b9937157a625da2ce/6165fc8b99371571455da3de_AdobeStock_151941226.jpeg');
    background-position: 50% 0;
    background-size: cover;
    background-repeat: no-repeat;" v-if="$vuetify.breakpoint.name == 'xs'">
        <v-container>
            <v-row>
                <v-col cols="12" style="text-align: center;">
                    <img style="height: 30px;" src="../assets/logoDark.png" />
                </v-col>
                <v-col cols="12" style="vertical-align: middle;
    display: grid;">
                    <v-icon class="fa fa-user" style="font-size: 48px;
    color: #1a4736;"></v-icon>
                </v-col>
                <v-col cols="12" style="background-color: #ffffffc7;
    text-align: center;
    border-radius: 25px;">
                    <h2 style="color: rgb(26, 71, 54); font-size: 18px;">BEDA MARGOT MORA ARANEDA</h2>
                    <h2 style="color: rgb(26, 71, 54); font-size: 18px;">EIT#118726</h2>
                </v-col>
            </v-row>
            <v-row style="margin-top: 25px">
                <v-col cols="12">
                    <section v-if="datos_encuesta">
                        <Encuestas :data="datos_encuesta" @ocultar_modal="ocultar_modal"></Encuestas>
                    </section>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
    <v-container fluid style="background-image: url('https://global-uploads.webflow.com/6165fc8b9937157a625da2ce/6165fc8b99371571455da3de_AdobeStock_151941226.jpeg');
    background-position: 50% 0;
    background-size: cover;
    background-repeat: no-repeat;" v-else="$vuetify.breakpoint.name == 'xs'">
        <v-container>
            <v-row>
                <v-col cols="6" style="border-right: solid 2px rgb(26, 71, 54)">
                    <img style="height: 40px;" src="../assets/logoDark.png" />
                </v-col>
                <v-col cols="1" style="vertical-align: middle;
    display: grid;">
                    <v-icon class="fa fa-user" style="font-size: 48px;
    color: #1a4736;"></v-icon>
                </v-col>
                <v-col cols="5">
                    <h2 style="color: rgb(26, 71, 54); font-size: 18px;">BEDA MARGOT MORA ARANEDA</h2>
                    <h2 style="color: rgb(26, 71, 54); font-size: 18px;">EIT#118726</h2>
                </v-col>
            </v-row>
            <v-row style="margin-top: 25px">
                <v-col cols="12">
                    <section v-if="datos_encuesta">
                        <Encuestas :data="datos_encuesta" @ocultar_modal="ocultar_modal"></Encuestas>
                    </section>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
import { Buffer } from 'buffer'; Buffer.from('anything', 'base64');
import Encuestas from "../components/Encuestas/Encuestas.vue";
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
        Encuestas,
    },
    components: { Encuestas },
    async mounted() {
        var queryStringBase64 = new Buffer.from(this.$route.params.id, "base64");
        var vector = queryStringBase64.toString().split(",");      
        this.datos_encuesta = (
            await this.$http.get("/FichasRelevamientos/encuestaModal?id=" + vector[1])
        ).data;
    },
};
</script>