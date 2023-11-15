<template>
    <div>
        <div class="boton-retorno mb-4">
            <NuxtLink to="/">&lt; <span>VOLVER</span></NuxtLink>
        </div>
        <h1>Seleccionar período de vacaciones</h1>
        <div>
            <label for="startDate">Fecha de inicio:</label>
            <datepicker id="startDate" v-model="startDate" :format="customFormatter" :disabled-dates="disabledDates">
            </datepicker>
        </div>
        <div>
            <label for="endDate">Fecha de fin:</label>
            <datepicker id="endDate" v-model="endDate" :format="customFormatter" :disabled-dates="disabledEndDates"
                :disabled="!startDate"></datepicker>
        </div>
        <h1>Seleccionar motivo de vacaciones</h1>
        <select v-model="vacationReason">
            <option disabled value="">Por favor seleccione uno</option>
            <option>Vacaciones</option>
            <option>Baja</option>
            <option>Día libre</option>
            <option>Ausencia injustificada</option>
            <option>Formación</option>
            <option>No trabajado</option>
            <!-- Agrega más motivos aquí -->
        </select>
        <button @click="setVacaciones" :disabled="!startDate || !endDate || !vacationReason">
            Solicitar
        </button>
        <!-- El resto de tu contenido existente -->
        <div v-if="vacations && vacations.length > 0" class="vacation-section">
            <h2>Vacaciones Solicitadas</h2>
            <ul class="vacation-list">
                <li v-for="(vacation, index) in vacations" :key="index" class="vacation-item">
                    <div class="vacation-detail"><strong>Desde:</strong> {{ formatearFecha(vacation.fieldData.FechaDesde) }}</div>
                    <div class="vacation-detail"><strong>Hasta:</strong> {{ formatearFecha(vacation.fieldData.FechaHasta) }}</div>
                    <div class="vacation-detail"><strong>Motivo:</strong> {{ vacation.fieldData.Motivo }}</div>
                    <div class="vacation-detail"><strong>Estado:</strong> {{ vacation.fieldData.Estado }} <span
                            v-if="vacation.fieldData.Estado === 'SOLICITADAS'" class="status-icon orange"></span>
                        <span v-else-if="vacation.fieldData.Estado === 'ACEPTADAS'" class="status-icon green"></span>
                        <span v-else-if="vacation.fieldData.Estado === 'RECHAZADAS'" class="status-icon red"></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script>
import Swal from "sweetalert2";
import Datepicker from 'vuejs-datepicker';

export default {
    middleware: "authentication",
    components: {
        Datepicker
    },
    data() {
        return {
            startDate: null,
            endDate: null,
            vacationReason: '',
            disabledDates: {
                to: new Date(new Date().setDate(new Date().getDate() - 1)), // Deshabilita fechas pasadas
            },
            vacations: [],
        };
    },
    computed: {
        disabledEndDates() {
            const start = this.startDate;
            if (!start) {
                return { from: null, to: null }; // No hay fechas deshabilitadas si no se ha seleccionado la fecha de inicio
            }

            // Establece el límite inferior como el día después de la fecha de inicio
            const dayAfterStart = new Date(start);
            dayAfterStart.setDate(dayAfterStart.getDate() + 1);
            return {
                to: new Date(dayAfterStart) // Deshabilita todas las fechas hasta el día después de la fecha de inicio
            };
        }
    },
    methods: {
        customFormatter(date) {
            if (!date) return ''; // Asegúrate de que la fecha no sea nula o indefinida
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            return new Intl.DateTimeFormat('es-ES', options).format(new Date(date));
        },
        formatearFecha(fecha) {
            // Dividir la fecha en un array [MM, DD, YYYY]
            var partes = fecha.split('/');

            // Verificar si la fecha tiene el formato correcto
            if (partes.length !== 3 || partes[0].length !== 2 || partes[1].length !== 2 || partes[2].length !== 4) {
                return 'Fecha no válida';
            }

            // Cambiar el orden de los elementos para obtener el formato DD-MM-YYYY
            var nuevaFecha = partes[1] + '/' + partes[0] + '/' + partes[2];

            return nuevaFecha;
        },
        async setVacaciones() {
            if (!this.startDate || !this.endDate || !this.vacationReason) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    confirmButtonColor: "#000",
                    text: `Por favor, completa todos los campos. `,
                });
                console.log("Por favor, completa todos los campos.");
                return;
            }
            let tec = this.$store.state.User;
            try {
                let response = await this.$axios.$post(
                    "/api/vacaciones/new",
                    { Tec: tec, motivo: this.vacationReason, FechaIni: this.customFormatter(this.startDate), FechaFin: this.customFormatter(this.endDate) },
                    {
                        headers: {
                            Authorization: `Bearer ${this.$cookies.get("TOKEN")}`,
                        },
                    }
                );
                if (response) {
                    Swal.fire({
                        icon: "success",
                        title: "Enviado a Filemaker",
                        confirmButtonColor: "#000",
                        text: `Se ha enviado a Filemaker y será insertado en breves`,
                    });
                    window.location.href = window.location.href
                }
            } catch (e) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    confirmButtonColor: "#000",
                    text: `Las fechas de las vacaciones se solapan con una solicitud existente. `,
                });
                this.error = true;
                console.log(e);
            }
            this.loading = false;
        }, async getVacaciones() {

            let tec = this.$store.state.User;
            try {
                let response = await this.$axios.$post(
                    "/api/vacaciones/find",
                    { Tec: tec },
                    {
                        headers: {
                            Authorization: `Bearer ${this.$cookies.get("TOKEN")}`,
                        },
                    }
                );
                if (response instanceof Object) {
                    this.vacations = response;
                }

            } catch (e) {
                this.error = true;
                console.log(e);
            }
            this.loading = false;
        }
    },
    mounted() {
        this.getVacaciones();
    },
}
</script>
  
<style scoped>
/* Estilos generales para móviles */
div {
    padding: 0 15px;
    /* Añade padding a los lados para evitar que el contenido toque los bordes */
}

h1 {
    font-size: 1.5em;
    /* Aumenta el tamaño para una mejor visibilidad */
    margin-bottom: 0.5em;
    /* Añade un poco de margen debajo de los títulos */
}

label {
    display: block;
    /* Asegura que la etiqueta esté en su propia línea */
    margin: 10px 0;
    /* Añade margen para separarla de otros elementos */
}

input[type="text"],
select {
    width: 100%;
    /* Usa todo el ancho disponible */
    padding: 10px;
    /* Añade padding para hacerlos más fáciles de tocar */
    margin-bottom: 20px;
    /* Añade espacio debajo de cada campo */
    border: 1px solid #ccc;
    /* Añade o ajusta el borde según sea necesario */
    font-size: 1em;
    /* Ajusta el tamaño de la fuente para mejorar la legibilidad */
}

.datepicker,
select,
button {
    width: 100%;
    /* Aprovecha el ancho completo */
    max-width: 100%;
    /* Asegura que no sobrepase el ancho de la pantalla */
    margin-bottom: 20px;
}

.vacation-list {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Centra los elementos en el eje cruzado */
}

.vacation-item {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 15px;
    margin: 10px 0;
    width: 80%;
    /* O el ancho que prefieras */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.vacation-detail {
    margin-bottom: 10px;
}

h2 {
    text-align: center;
}

.vacation-section {
    background-color: #f9f9f9;
    /* Color de fondo suave */
    border-top: 2px solid #eee;
    /* Borde superior para separar las secciones */
    padding-top: 20px;
    /* Espacio en la parte superior */
    margin-top: 30px;
    /* Margen superior para más separación */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    /* Sombra sutil */
}

.status-icon {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-left: 5px;
}

.orange {
    background-color: orange;
}

.green {
    background-color: green;
}

.red {
    background-color: red;
}
</style>