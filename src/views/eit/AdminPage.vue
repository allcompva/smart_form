<template>
	<v-container v-if="desserts != null && desserts != 'undefined'">
		<v-row>
			<v-col cols="12" style="text-align: left; margin-top:25px;">
				<img style="height: 30px;" src="../../assets/logoDark.png" />
			</v-col>
		</v-row>
		<v-row style="margin-top:25px;">
			<v-col cols="12">
				<v-card>
					<v-card-title>
						Mis Smart Forms
						<v-spacer></v-spacer>
						<v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
							hide-details>
						</v-text-field>
					</v-card-title>
					<v-data-table :headers="headers" :items="desserts" :search="search">
						<template v-slot:[`item.imagen`]="{ item }">
							<img :src="item.imagen" style="height: 50px; margin: 10px" />
						</template>
						<template v-slot:[`item.nombre`]="{ item }">
							<span :style="[
								item.activo
									? { padding: '5px' }
									: {
										'background-color': '#d3d3d359',
										opacity: '0.5',
									},
							]">
								{{ item.nombre }}
							</span>
						</template>
						<template v-slot:[`item.id`]="{ item }">
							<v-menu top :close-on-content-click="closeOnContentClick">
								<template v-slot:activator="{ on, attrs }">
									<v-btn text v-bind="attrs" v-on="on" style="float: right">
										<v-icon class="fa fa-bars"></v-icon>
									</v-btn>
								</template>

								<v-list>
									<v-list-item>
										<v-btn @click="compartir(item.nombre, item.id)" text>
											<v-icon small> mdi-share-variant </v-icon>&nbsp; Compartir
										</v-btn>
										
									</v-list-item>
									<v-list-item>
										<v-btn @click="misInscriptos(item.id, item.nombre, item.fecha)" text>
											<v-icon small class="fa fa-envelope"></v-icon>&nbsp; Mis Inscriptos
										</v-btn>
									</v-list-item>
									<v-list-item>
										<v-btn text :href="'#'">
											<v-icon small class="fa fa-credit-card"></v-icon>&nbsp; Mis Ventas
										</v-btn>
									</v-list-item>
								</v-list>
							</v-menu>
						</template>
					</v-data-table>
				</v-card>
			</v-col>
		</v-row>
		<v-dialog v-model="dialogCompartir" max-width="80%">
			<v-card outlined shaped>
				<v-card-title class="text-h5">

				</v-card-title>
				<v-card-subtitle style="font-size: 1.1rem !important" class="text-h6">

				</v-card-subtitle>
				<v-card-text class="justify-center">
					<h2 style="color: #1f4a36">SmartForm</h2>
					<p style="font-size: 18px; margin-top: 10px">{{ nombre }}</p>
					<v-text-field solo v-model="smartform"></v-text-field>
					<v-bottom-navigation v-model="value"
						style="height: auto; padding: 10px; box-shadow: none; margin-top:30px;">
						<v-btn @click="copyToClipBoard()">
							<span>Copiar</span>
							<v-icon style="font-size: 40px">mdi-content-copy</v-icon>
						</v-btn>
						<v-btn @click="whatsApp()" value="favorites">
							<span>WhatsApp</span>
							<v-icon style="font-size: 40px; color: #4bc55a">mdi-whatsapp</v-icon>
						</v-btn>

						<v-btn value="nearby" @click="acceder()">
							<span>Acceder</span>
							<v-icon style="font-size: 40px">mdi-cloud-search-outline</v-icon>
						</v-btn>
					</v-bottom-navigation>
					<v-spacer></v-spacer>
				</v-card-text>
				<v-card-actions class="justify-center" style="padding-bottom:20px;">
					<v-btn class="mx-2" dark color="#1f4a36" large @click="dialogCompartir = false"
						style="border-radius: 25px; width: 150px;">
						Salir
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog transition="dialog-top-transition" max-width="600" v-model="dialogConfirma">
			<template v-slot:default="dialogConfirma">
				<v-card>
					<v-toolbar style="
              background-color: red !important;
              border-color: red !important;
            " dark>
						<v-card-title>Confirmar</v-card-title>
					</v-toolbar>

					<v-card-text>
						<div style="
                margin-top: 20px;
                text-align: center;
                color: black;
                font-size: 20px;
                font-family: 'DM Sans';
              ">
							¿Esta seguro de eliminar el smart form?
						</div>
					</v-card-text>
					<v-card-actions class="justify-end">
						<v-btn text @click="dialogConfirma.value = false">Cancelar</v-btn>
						<v-btn text @click="confirmaLogicDelete()">Eliminar</v-btn>
					</v-card-actions>
				</v-card>
			</template>
		</v-dialog>
	</v-container>
</template>
<script>
import { Buffer } from 'buffer';import MisInscriptosVue from './MisInscriptos.vue';
 Buffer.from('anything', 'base64');
export default {
	data: () => {
		return {
			smartform: "",
			value: "",
			closeOnContentClick: false,
			search: "",
			headers: [
				{ text: "IMAGEN", value: "imagen" },
				{ text: "NOMBRE", value: "nombre" },
				{ text: "FECHA", value: "_fecha" },
				{ text: "HORA", value: "_hora" },
				{ text: "", value: "id" },
			],
			rules: {
				required: (value) => !!value || "Campo requerido",
			},
			desserts: null,
			idSmartForm: 0,
			dialogError: null,
			txtError: null,
			dialogConfirma: false,
			dialogAdd: false,
			dialogCompartir: false,
			nombre: "",
			customer_id: 0,
		};
	},

	async mounted() {
		if (!this.$storage.getTextOrInt("customer_id")) {
			this.$router.push("/Login");
		}
		try {
			this.desserts = (await this.$http.get("/Fichas/readActivos")).data;
		} catch (error) {
			this.desserts = null;
		}
	},
	methods: {
		copyToClipBoard() {
			let dat = this.$storage.getTextOrInt("customer_id") + "," + this.idSmartForm;
			var querystring = Buffer.from(dat).toString(
				"base64"
			);
			var text_to_copy = "https://smartform-dev.teomaglobal.cl/" + querystring;

			if (!navigator.clipboard) {
				// use old commandExec() way
			} else {
				navigator.clipboard
					.writeText(text_to_copy)
					.then(function () {
						alert("SmartLink copiado"); // success
					})
					.catch(function () {
						alert("err"); // error
					});
			}
		},
		whatsApp() {
			let dat = this.$storage.getTextOrInt("customer_id") + "," + this.idSmartForm;
			var querystring = Buffer.from(dat).toString(
				"base64"
			);
			window.open(
				"https://api.whatsapp.com/send?text=" +
				encodeURIComponent("https://smartform-dev.teomaglobal.cl/" + querystring),
				"_blank"
			);
		},
		acceder() {
			let dat = this.$storage.getTextOrInt("customer_id") + "," + this.idSmartForm;
			var querystring = Buffer.from(dat).toString(
				"base64"
			);
			let route = this.$router.resolve({ path: "/SmartForm/" + querystring });
			window.open(route.href);

		},
		compartir(nombre, idSmartForm) {
			this.nombre = nombre;
			this.idSmartForm = idSmartForm;
			this.dialogCompartir = true;

			let dat = this.$storage.getTextOrInt("customer_id") + "," + this.idSmartForm;
			var querystring = Buffer.from(dat).toString(
				"base64"
			);
			this.smartform = "https://smartform-dev.teomaglobal.cl/" + querystring;
		},
		misInscriptos(idSmartForm, nombre, fecha){
			let dat = this.$storage.getTextOrInt("idEit") + "," + idSmartForm + "," + nombre + "," + fecha;
			var querystring = Buffer.from(dat).toString(
				"base64"
			);
			this.$router.push("/MisInscriptos/" + querystring);
		},
	},
};
</script>