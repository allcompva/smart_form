<template>
    <v-container v-if="informe != null && informe != 'undefined'">
        <v-row>
            <v-col cols="8" style="text-align: left; margin-top:25px;">
                <img style="height: 30px;" src="../../assets/logoDark.png" />
            </v-col>
            <v-col cols="4" style="text-align: right; margin-top:25px;">
                <v-btn style="background-color: #1f4a36;
    color: white;
    padding: 20px;
    border-radius: 25px;" href="/eit">Volver</v-btn>
            </v-col>            
        </v-row>
        <v-row style="margin-top:25px;">
            <v-col cols="12">
                <v-card>
                    <v-card-title style="display:block">
                        <p style="margin-bottom:0;"><span style="color:rgb(31, 74, 54)">Masterclas:</span> {{ this.smartform }}</p>
                        <p><small>{{ this.fecha }}</small></p>
                        <p><small>Listado de Inscriptos</small></p>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
                            hide-details>
                        </v-text-field>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="informe" :search="search">
                        <template v-slot:[`item.imagen`]="{ item }">
                            <span>{{ item.fecha }}</span>
                        </template>
                        <template v-slot:[`item.html`]="{ item }">
                            <span v-html="item.html"></span>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { Buffer } from 'buffer'; Buffer.from('anything', 'base64');
export default {
    data: () => {
        return {
            smartform: "",
            fecha: "",
            closeOnContentClick: false,
            search: "",
            headers: [
                { text: "FECHA INSCRIPCIÓN", value: "fecha" },
                { text: "PARTICIPANTE", value: "html" },
            ],
            informe: null,
        };
    },

    async mounted() {
        if (!this.$storage.getTextOrInt("customer_id")) {
            this.$router.push("/");
        }
        try {
            var queryStringBase64 = new Buffer.from(this.$route.params.id, "base64");
            var vector = queryStringBase64.toString().split(",");
            this.informe = (
                await this.$http.get("/FichasRelevamientos/informeInscriptos?idFicha=" + vector[1] + "&idEit=" + vector[0])
            ).data;
            this.smartform = vector[2];
            var d = new Date(vector[3]);
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            this.fecha = d.toLocaleDateString("es-ES", options);          
        } catch (error) {
            this.desserts = null;
        }
    },
    methods: {

    },
};
</script>