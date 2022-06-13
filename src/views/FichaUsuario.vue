<template>
  <v-container>
    <v-row>
      <v-col cols="8" style="text-align: left; margin-top: 25px">
        <img style="height: 30px" src="../assets/logoDark.png" />
      </v-col>
      <v-col cols="4" style="text-align: right; margin-top: 25px">
        <v-btn
          style="
            background-color: #1f4a36;
            color: white;
            padding: 20px;
            border-radius: 25px;
          "
          href="/Fichas"
          >Volver</v-btn
        >
      </v-col>
    </v-row>
    <v-row style="margin-top: 25px">
      <v-col cols="12" xl="3" lg="3" md="3"></v-col>
      <v-col cols="12" xl="6" lg="6" md="6">
        <v-card style="padding-top: 25px; text-align: center">
          <h2 style="color: #1f4a36">Mis Datos</h2>
          <hr style="margin-left: 15px; margin-right: 15px" />
          <v-card-title
            style="
              display: block;
              padding-left: 5%;
              margin-right: 5%;
              padding-top: 45px;
            "
          >
            <v-text-field
              v-model="usuario"
              disabled
              label="Usuario"
            ></v-text-field>
            <v-text-field v-model="apellido" label="Apellido"></v-text-field>
            <v-text-field v-model="nombre" label="Nombre"></v-text-field>
            <v-text-field
              v-model="mail"
              type="mail"
              label="e-Mail"
            ></v-text-field>
            <v-text-field v-model="telefono" label="Telefono"></v-text-field>
            <v-btn
              @click="update()"
              style="background-color: rgb(31, 74, 54);
                                    color: white;
                                    padding: 20px;
                    customer_id                border-radius: 25px;
                                    width: 40%;"
              >ACEPTAR</v-btn
            >
          </v-card-title>
        </v-card>
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
      v-model="dialogOk"
    >
      <template v-slot:default="dialogOk">
        <v-card>
          <v-toolbar
            style="
              background-color: green !important;
              border-color: green !important;
            "
            dark
            >Felecidades!</v-toolbar
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
import { Buffer } from "buffer";
Buffer.from("anything", "base64");
export default {
  data: () => {
    return {
      idUsuario: "",
      usuario: "",
      apellido: "",
      nombre: "",
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
    if (!this.$storage.getTextOrInt("idUsuario")) {
      this.$router.push("/");
    }
    this.idUsuario = this.$storage.getTextOrInt("idUsuario");
    this.usuario = this.$storage.getTextOrInt("usuario");
    this.apellido = this.$storage.getTextOrInt("apellidoUsuario");
    this.nombre = this.$storage.getTextOrInt("_nombreUsuario");
    this.mail = this.$storage.getTextOrInt("mailUsuario");
    this.telefono = this.$storage.getTextOrInt("telefonoUsuario");
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
        id: this.$storage.getTextOrInt("idUsuario"),
        apellido: this.apellido,
        nombre: this.nombre,
        mail: this.mail,
        telefono: this.telefono,
      };

      this.resultado = (await this.$http.post("/Usuarios/update", post)).data;

      if (this.resultado.mensaje == "OK") {
        this.txtMsg = "Su datos personales se han actualizado con exito!";
        this.dialogOk = true;
        this.$storage.set("nombreUsuario", this.apellido + ", " + this.nombre
        );
        this.$storage.set("_nombreUsuario", this.nombre);
        this.$storage.set("apellidoUsuario", this.apellido);
        this.$storage.set("telefonoUsuario", this.telefono);
        this.$storage.set("mailUsuario", this.mail);
        this.$storage.set("usuario", this.usuario);
        this.$forceUpdate();
      } else {
        this.txtError = this.resultado.mensaje;
        this.dialogError = true;
      }
    },
  },
};
</script>