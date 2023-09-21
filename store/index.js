export const state = () => ({
    User: null,
    Horas: []
});

export const mutations = {
    saveUser(state, User) {
        state.User = User;
    },
    insertHora(state, Hora) {
        state.Horas.push(Hora);
    },
    deleteHora(state, indexHora) {
        state.Horas.splice(indexHora, 1)
    }
}