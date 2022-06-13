<template>
    <v-container v-if="informe != null && informe != 'undefined'">
        <v-row>
            <v-col cols="8" style="text-align: left; margin-top:25px;">
                <img style="height: 30px;" src="../assets/logoDark.png" />
            </v-col>
            <v-col cols="4" style="text-align: right; margin-top:25px;">
                <v-btn style="background-color: #1f4a36;
    color: white;
    padding: 20px;
    border-radius: 25px;" href="/Fichas">Volver</v-btn>
            </v-col>
        </v-row>
        <v-row style="margin-top:25px;">
            <v-col cols="12">
                <v-card>
                    <v-card-title style="display:block">
                        <p><small>Listado de EIT</small></p>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
                            hide-details>
                        </v-text-field>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="informe" :search="search">
                        <template v-slot:[`item.id`]="{ item }">
                            <v-menu top :close-on-content-click="closeOnContentClick">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn text v-bind="attrs" v-on="on" style="float: right">
                                        <v-icon class="fa fa-bars"></v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item>
                                        <v-btn @click="
                                            editaFicha(
                                                item.id,
                                                item.customer_id,
                                                item.rut,
                                                item.apellido,
                                                item.nombre,
                                                item.telefono,
                                                item.mail
                                            )
                                        " text>
                                            <v-icon small> mdi-pencil </v-icon> Editar
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
    </v-container>
</template>
<script>
export default {
    data: () => {
        return {
            smartform: "",
            fecha: "",
            closeOnContentClick: false,
            search: "",
            headers: [
                { text: "CUSTOMERID", value: "customer_id" },
                { text: "RUT", value: "rut" },
                { text: "APELLIDO", value: "apellido" },
                { text: "NOMBRE", value: "nombre" },
                { text: "MAIL", value: "mail" },
                { text: "TELEFONO", value: "telefono" },
            ],
            informe: [],
        };
    },

    async mounted() {
        if (!this.$storage.getTextOrInt("idUsuario")) {
            this.$router.push("/");
        }
        try {
            this.informe =
                await (await this.$http.get("/Eit/read")).data;
        } catch (error) {
            this.informe = null;
        }
    },
    methods: {

    },
};
</script>