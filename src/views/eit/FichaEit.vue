<template>
    <v-container>
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
            <v-col cols="12" xl="3" lg="3" md="3"></v-col>
            <v-col cols="12" xl="6" lg="6" md="6">
                <v-card style="padding-top: 25px; text-align: center;">
                    <h2 style="color: #1f4a36;">Mis Datos</h2>
                    <hr style="    margin-left: 15px;
    margin-right: 15px;" />
                    <v-card-title style="display:block; padding-left:5%; margin-right: 5%; padding-top:45px;">
                        <v-text-field v-model="customer_id" disabled label="Customer Id"></v-text-field>
                        <v-text-field v-model="apellido" label="Apellido"></v-text-field>
                        <v-text-field v-model="nombre" label="Nombre"></v-text-field>
                        <v-text-field v-model="rut" label="RUT"></v-text-field>
                        <v-text-field v-model="mail" type="mail" label="e-Mail"></v-text-field>
                        <v-text-field v-model="telefono" label="Telefono"></v-text-field>
                        <v-btn @click="update()" style="background-color: rgb(31, 74, 54);
                                    color: white;
                                    padding: 20px;
                    customer_id                border-radius: 25px;
                                    width: 40%;">ACEPTAR</v-btn>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialogError">
            <template v-slot:default="dialogError">
                <v-card>
                    <v-toolbar style="
              background-color: red !important;
              border-color: red !important;
            " dark>Error!</v-toolbar>
                    <v-card-text>
                        <div style="
                            margin-top: 20px;
                            text-align: center;
                            color: black;
                            font-size: 20px;
                            font-family: 'DM Sans';
                        ">
                            {{ txtError }}
                        </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="dialogError.value = false">Cerrar</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
        <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialogOk">
            <template v-slot:default="dialogOk">
                <v-card>
                    <v-toolbar style="
              background-color: green !important;
              border-color: green !important;
            " dark>Felecidades!</v-toolbar>
                    <v-card-text>
                        <div style="
                            margin-top: 20px;
                            text-align: center;
                            color: black;
                            font-size: 20px;
                            font-family: 'DM Sans';
                        ">
                            {{ txtMsg }}
                        </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="dialogOk.value = false">Cerrar</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </v-container>
</template>
<script>
import { Buffer } from 'buffer'; Buffer.from('anything', 'base64');
export default {
    data: () => {
        return {
            customer_id: "",
            apellido: "",
            nombre: "",
            rut: "",
            mail: "",
            telefono: "",
            dialogError: false,
            txtError: "",
            dialogOk: false,
            txtMsg: "",
            resultado: null,
        };
    },

    async mounted() {
        if (!this.$storage.getTextOrInt("customer_id")) {
            this.$router.push("/Login");
        }
        this.customer_id = this.$storage.getTextOrInt("customer_id");
        this.apellido = this.$storage.getTextOrInt("apellido");
        this.nombre = this.$storage.getTextOrInt("_nombre");
        this.rut = this.$storage.getTextOrInt("rut");
        this.mail = this.$storage.getTextOrInt("mail");
        this.telefono = this.$storage.getTextOrInt("telefono");
    },
    methods: {
        async update() {
            if (this.apellido == "") {
                this.txtError = "Por favor ingrese su apellido";
                this.dialogError = true;
                return;
            }
            if (this.nombre == "") {
                this.txtError = "Por favor ingrese su nombre";
                this.dialogError = true;
                return;
            }
            if (this.rut == "") {
                this.txtError = "Por favor ingrese su RUT";
                this.dialogError = true;
                return;
            }
            if (this.mail == "") {
                this.txtError = "Por favor ingrese su mail";
                this.dialogError = true;
                return;
            }
            if (this.telefono == "") {
                this.txtError = "Por favor ingrese su telefono";
                this.dialogError = true;
                return;
            }
            let post = {
                id: this.$storage.getTextOrInt("idEit"),
                customer_id: this.customer_id,
                apellido: this.apellido,
                nombre: this.nombre,
                rut: this.rut,
                mail: this.mail,
                telefono: this.telefono,
            };

            this.resultado = (await this.$http.post("/Eit/update", post)).data;

            if (this.resultado.mensaje == "OK") {
                this.txtMsg = "Su datos personales se han actualizado con exito!";
                this.dialogOk = true;
                this.$storage.set("nombre", this.apellido + ', ' + this.nombre);
                this.$storage.set("apellido", this.apellido);
                this.$storage.set("_nombre", this.nombre);
                this.$storage.set("rut", this.rut);
                this.$storage.set("telefono", this.telefono);
                this.$storage.set("mail", this.mail);
                this.$forceUpdate();
            }
            else {
                this.txtError = this.resultado.mensaje;
                this.dialogError = true;
            }
        },
    },
};
</script>