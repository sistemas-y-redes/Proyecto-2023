<template>
    <nav class="navigation-bar">
        <div class="navigation-link" v-for="(link, index) in links" :key="index">
            <div :class="$nuxt.$route.path == link.link ? 'active' : ''">
                <nuxt-link :to="link.link" class="navigation-link-button">
                    <b-icon :icon="link.icon"></b-icon>
                    <div class="link-name">{{ link.name }}</div>
                </nuxt-link>
            </div>
        </div>
    </nav>
</template>
  
<script>
export default {
    data() {
        return {
            links: [
                {
                    name: "Inicio",
                    link: "/",
                    icon: "house",
                    color: "black",
                },
                {
                    name: "Fichar",
                    link: "/fichar",
                    icon: "clock",
                    color: "black",
                },
                {
                    name: "Proyectos",
                    link: "/proyectos",
                    icon: "gear",
                    color: "standard",
                },
                {
                    name: "Previsión",
                    link: "/tareas",
                    icon: "card-checklist",
                    color: "standard",
                },
            ],
        };
    },
};
</script>
  
<style scoped>
.navigation-bar {
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(12.5px);
    -webkit-backdrop-filter: blur(12.5px);
    
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2% 0%;
    width: 100vw;

    position: fixed; /* Fija el menú en una posición absoluta */
    bottom: 0;       /* Ubica el menú en la parte inferior de la pantalla */
    left: 0;         /* Asegura que el menú se extienda desde el lado izquierdo */
}

.navigation-link {
    display: grid;
    height: 50px;
    width: 50px;
    margin: 0 5%;
    text-align: center;
}

.link-name {
    font-size: 10px;
    text-align: center;
    text-transform: uppercase;
}

.navigation-link-button {
    border-radius: var(--border-radius);
    color: black;
    background-color: transparent;
    border: none;
    font-size: 27px;
    padding: 0%;
    margin: auto;
}

.button-label {
    text-align: center;
}

.nuxt-link-exact-active {
    font-weight: bold;
    color: blue;
}
</style>

  