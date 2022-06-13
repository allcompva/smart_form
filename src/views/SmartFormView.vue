<template>
    <div>
        <v-container fluid style="
                background-color:white; height: 160px;" v-if="$vuetify.breakpoint.name == 'xs' || $vuetify.breakpoint.name == 'sm'">
            <v-container>
                <v-row>
                    <v-col cols="12" style="text-align:center;">
                        <img style="height: 30px;" src="../assets/logoDark.png" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3" style="
                        text-align: right;">
                        <v-icon class="far fa-user-circle" style="
                                background-color: rgb(255, 222, 22);
                                font-size: 25px;
                                border-radius: 50%;
                                color: rgb(47, 183, 119);
                                padding: 10px;
                                height: 50px;
                                width: 50px;"></v-icon>
                    </v-col>
                    <v-col cols="9" style="padding-top: 15px; padding-left: 0;">

                        <h2 style="color: #696969;
                            font-family: Montserrat, Sans-serif;
                            font-size: 18px;
                            font-weight: 600;
                            line-height: 1em;
                            letter-spacing: -1.2px;">{{ datos_eit.nombre }}  {{ datos_eit.apellido }}</h2>
                        <h2 style="    
                            margin-top: 5px;
                            color: #696969;
                            font-family: DM Sans, Sans-serif;
                            font-size: 16px;
                            font-weight: 500;
                            line-height: 1em;
                            letter-spacing: 0px;">EIT#{{ datos_eit.customer_id }}</h2>
                    </v-col>
                </v-row>
            </v-container>

            <div style="background-color: black; margin-left:-15px; margin-right: -15px; margin-top: 15px; height: 100vh;">
                <div :style="{ backgroundImage: 'url(' + datos_encuesta.imagen + ')' }" style="
                    background-position: center left;
                    background-repeat: no-repeat;
                    background-size: cover;
                    opacity: 0.53;
                    height: 100%;
                    width: 100%;
                    left: 0;
                    position: absolute;
                    background-color: #000000;
                    transition: background 0.3s, border-radius 0.3s, opacity 0.3s;"></div>
                <v-container style="padding-left: 0; padding-right: 0;">

                    <v-row>
                        <v-col cols="12">
                            <section v-if="datos_encuesta">
                                <Encuestas :data="datos_encuesta" @ocultar_modal="ocultar_modal"></Encuestas>
                            </section>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </v-container>
        <v-container fluid style="
                background-color:white; height: 90px;" v-else>
            <v-container>
                <v-row>
                    <v-col cols="8">
                        <img style="height: 40px;" src="../assets/logoDark.png" />
                    </v-col>
                    <v-col cols="1" style="
                        text-align: right;">
                        <v-icon class="far fa-user-circle" style="
                                background-color: rgb(255, 222, 22);
                                font-size: 25px;
                                border-radius: 50%;
                                color: rgb(47, 183, 119);
                                padding: 10px;
                                height: 50px;
                                width: 50px;"></v-icon>
                    </v-col>
                    <v-col cols="3" style="padding-top: 15px; padding-left: 0;">

                        <h2 style="color: #696969;
                            font-family: Montserrat, Sans-serif;
                            font-size: 18px;
                            font-weight: 600;
                            line-height: 1em;
                            letter-spacing: -1.2px;">Sergio Pinto</h2>
                        <h2 style="    
                            margin-top: 5px;
                            color: #696969;
                            font-family: DM Sans, Sans-serif;
                            font-size: 16px;
                            font-weight: 500;
                            line-height: 1em;
                            letter-spacing: 0px;">EIT#112233</h2>
                    </v-col>
                </v-row>
            </v-container>

            <div style="background-color: black; margin-left:-15px; margin-right: -15px; margin-top: 5px; height: 100vh;">
                <div :style="{ backgroundImage: 'url(' + datos_encuesta.imagen + ')' }" style="
                    background-position: top center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    opacity: 0.53;
                    height: 100%;
                    width: 100%;
                    top: 90px;
                    left: 0;
                    position: absolute;
                    background-color: #000000;
                    transition: background 0.3s, border-radius 0.3s, opacity 0.3s;"></div>
                <v-container>

                    <v-row>
                        <v-col cols="6"></v-col>
                        <v-col cols="6" style="padding-top:70px; padding-left: 0;">
                            <section v-if="datos_encuesta">
                                <Encuestas :data="datos_encuesta" @ocultar_modal="ocultar_modal"></Encuestas>
                            </section>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </v-container>
    </div>
</template>

<script>
import { Buffer } from 'buffer'; Buffer.from('anything', 'base64');
import Encuestas from "../components/Encuestas/Encuestas.vue";
export default {
    data: () => {
        return {
            datos_encuesta: null,
            datos_eit: null,
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
            await this.$http.get("/FichasRelevamientos/encuestaModal?id=" + this.$route.params.id)
        ).data;
    },
};
</script>