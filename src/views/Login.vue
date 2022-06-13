<template>
  <v-container
    fluid
    style="
      background-image: url('https://global-uploads.webflow.com/6165fc8b9937157a625da2ce/6165fc8b99371571455da3de_AdobeStock_151941226.jpeg');
      background-position: 50% 0;
      background-size: cover;
      height: 100vh;
      background-repeat: no-repeat;
    "
  >
    <v-row>
      <v-col cols="12" xl="4" lg="4" md="4"></v-col>
      <v-col
        cols="12"
        xl="4"
        lg="4"
        md="4"
        style="text-align: center; margin-top: 25px"
      >
        <v-card elevation="20" shaped>
          <v-card-title
            style="
              background-color: #1f4a36;
              color: white;
              text-align: center;
              display: block;
              height: 100px;
              padding-top: 40px;
            "
          >
            <h3>Inicia tu sesión</h3>
          </v-card-title>
          <v-card-text style="margin-top: 50px">
            <v-row>
              <v-col cols="12" style="padding-left: 50px; padding-right: 50px">
                <img style="height: 30px" src="../assets/logoDark.png" />
              </v-col>
            </v-row>
            <v-row style="margin-top: 30px">
              <v-col cols="12" style="padding-left: 50px; padding-right: 50px">
                <v-text-field v-model="usuario" label="Usuario"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" style="padding-left: 50px; padding-right: 50px">
                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Contraseña"
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row style="margin-top: 30px">
              <v-col cols="12" style="padding-left: 50px; padding-right: 50px">
                <v-select
                  v-model="select"
                  :hint="`${select.state}`"
                  :items="items"
                  item-text="state"
                  item-value="state"
                  label="Tipo"
                  persistent-hint
                  return-object
                  single-line
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row style="margin-top: 30px; padding-bottom: 30px">
              <v-col cols="12">
                <v-btn
                  @click="validate()"
                  style="
                    background-color: rgb(31, 74, 54);
                    color: white;
                    padding: 30px;
                    border-radius: 25px;
                    width: 40%;
                  "
                  >INGRESAR</v-btn
                >
                <v-snackbar v-model="snackbar">
                  Usuario o contraseña incorrectos
                  <template v-slot:action="{ attrs }">
                    <v-btn
                      color="red"
                      text
                      v-bind="attrs"
                      @click="snackbar = false"
                    >
                      Cerrar
                    </v-btn>
                  </template>
                </v-snackbar>
              </v-col>
            </v-row>
          </v-card-text>
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
  </v-container>
</template>
<script>
export default {
  data: () => {
    return {
      snackbar: false,
      show1: false,
      password: "",
      usuario: "",
      dialogError: false,
      txtError: "",
      objUser: null,
      select: { state: "EIT" },
      items: [{ state: "EIT" }, { state: "EQUIPO TEOMA" }],
    };
  },
  mounted() {
    if (this.$storage.getTextOrInt("customer_id")) {
      this.$router.push("/eit");
    }
  },
  methods: {
    async validate() {
      if (this.usuario == "") {
        this.txtError = "Por favor ingrese su nombre de usuario";
        this.dialogError = true;
        return;
      }
      if (this.password == "") {
        this.txtError = "Por favor ingrese su contraseña";
        this.dialogError = true;
        return;
      }

      if (this.select.state == "EIT") {
        let post = {
          customer_id: parseInt(this.usuario),
          password: this.password,
        };
        this.objUser = (await this.$http.post("/Eit/autenticar", post)).data;
        if (this.objUser) {
          this.$storage.set("idEit", this.objUser.id);
          this.$storage.set("customer_id", this.objUser.customer_id);
          this.$storage.set("nombre", this.objUser.apellido + ", " + this.objUser.nombre);
          this.$storage.set("apellido", this.objUser.apellido);
          this.$storage.set("_nombre", this.objUser.nombre);
          this.$storage.set("rut", this.objUser.rut);
          this.$storage.set("telefono", this.objUser.telefono);
          this.$storage.set("mail", this.objUser.mail);

          this.$storage.set("idUsuario", null);
          this.$storage.set("nombreUsuario", null);
          this.$storage.set("_nombreUsuario", null);
          this.$storage.set("apellidoUsuario", null);
          this.$storage.set("telefonoUsuario", null);            
          this.$storage.set("mailUsuario", null);  
          this.$storage.set("usuario", null); 

          this.$forceUpdate();
          location.reload();
          this.$router.go(0);
          this.$router.push("/eit");
        } else {
          this.snackbar = true;
        }
      }
      if (this.select.state == "EQUIPO TEOMA") {
        let post2 = {
          usuario: this.usuario,
          password: this.password,
        };        
        this.objUser = (
          await this.$http.post("/Usuarios/autenticar", post2)
        ).data;
        if (this.objUser) {
          this.$storage.set("idUsuario", this.objUser.id);
          this.$storage.set("nombreUsuario", this.objUser.apellido + ", " + this.objUser.nombre);
          this.$storage.set("_nombreUsuario", this.objUser.nombre);
          this.$storage.set("apellidoUsuario", this.objUser.apellido);
          this.$storage.set("telefonoUsuario", this.objUser.telefono);            
          this.$storage.set("mailUsuario", this.objUser.mail);              
          this.$storage.set("usuario", this.objUser.usuario);             

          this.$storage.set("idEit", null);
          this.$storage.set("customer_id", null);
          this.$storage.set("nombre", null);
          this.$storage.set("apellido", null);
          this.$storage.set("_nombre", null);
          this.$storage.set("rut", null);
          this.$storage.set("telefono", null);
          this.$storage.set("mail", null);
          this.$forceUpdate();
          this.$router.push("/Fichas");
        } else {
          this.snackbar = true;
        }
      }
    },
  },
};
</script>