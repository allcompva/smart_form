<template>
    <v-container>
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
            <v-col cols="12" xl="3" lg="3" md="3"></v-col>
            <v-col cols="12" xl="6" lg="6" md="6">
                <v-card style="padding-top: 25px; text-align: center;">
                    <h2 style="color: #1f4a36;">Actualizar Contraseña</h2>
                    <hr style="    margin-left: 15px;
    margin-right: 15px;" />
                    <v-card-title style="display:block; padding-left:5%; margin-right: 5%; padding-top:45px;">
                        <v-text-field solo v-model="passwordAnt" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show2 ? 'text' : 'password'" name="input-10-1" label="Contraseña Actual"
                            @click:append="show2 = !show2"></v-text-field>
                        <v-text-field solo v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'" name="input-10-1" label="Nueva Contraseña"
                            @click:append="show1 = !show1"></v-text-field>
                        <v-btn @click="cambioPass()" style="background-color: rgb(31, 74, 54);
                                    color: white;
                                    padding: 20px;
                                    border-radius: 25px;
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
            usuario: "",
            password: "",
            passwordAnt: "",
            show1: false,
            show2: false,
            dialogError: false,
            txtError: "",
            dialogOk: false,
            txtMsg: "",
            resultado: null,
        };
    },

    async mounted() {
		if (!this.$storage.getTextOrInt("idUsuario")) {
			this.$router.push("/");
		}
    },
    methods: {
        async cambioPass() {
            if (this.passwordAnt == "") {
                this.txtError = "Por favor ingrese su contraseña actual";
                this.dialogError = true;
                return;
            }
            if (this.password == "") {
                this.txtError = "Por favor ingrese su nueva contraseña";
                this.dialogError = true;
                return;
            }
            let post = {
                id: this.$storage.getTextOrInt("idUsuario"),
                oldpassword: this.passwordAnt,
                password: this.password,
            };

            this.resultado = (await this.$http.post("/Usuarios/ChangePassword", post)).data;

            if (this.resultado.mensaje == "OK") {
                this.txtMsg = "Su contraseña se ha actualizado con exito!";
                this.dialogOk = true;
            }
            else
            {
                this.txtError = this.resultado.mensaje;
                this.dialogError = true;
            }
        },
    },
};
</script>