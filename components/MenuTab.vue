<template>
    <div class="menu-tab-movil" style="z-index: 10;">
        <NuxtLink to="/tareas" class="tab-item">
            <i class="fa fa-user-cog"></i> <!-- Icono de vacaciones -->
            <!-- <span>Solicitar Vacaciones</span> -->
        </NuxtLink>
        <NuxtLink to="/fichar" class="tab-item">
            <i class="fa fa-clock"></i> <!-- Icono de reloj -->
            <!-- <span>Registro Horario</span> -->
        </NuxtLink>
        <NuxtLink to="/vacaciones" class="tab-item">
            <i class="fa fa-umbrella-beach"></i> <!-- Icono de vacaciones -->
            <!-- <span>Solicitar Vacaciones</span> -->
        </NuxtLink>

    </div>
</template>
<script>
export default {
    // Tu lógica del componente aquí
};
</script>

<style>
.menu-tab-movil {
    height: 50px;
    display: flex;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
}

.tab-item {
    flex-grow: 1;
    text-align: center;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.tab-item i {
    font-size: 20px;
    /* Tamaño del icono */
    margin-bottom: 5px;
}
</style>