/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: () =>
        import ( /* webpackChunkName: "Home" */ '../views/Home.vue'),
}, 
{
    path: '/FichasPreguntas/:id',
    name: 'FichasPreguntas',
    component: () =>
        import ( /* webpackChunkName: "Live" */ '../views/FichasPreguntas.vue')
},    
{
    path: '/FichasRespuestas/:id/:idFicha',
    name: 'FichasRespuestas',
    component: () =>
        import ( /* webpackChunkName: "Live" */ '../views/FichasRespuestas.vue')
},     
{
    path: '/Fichas',
    name: 'Fichas',
    component: () =>
        import ( /* webpackChunkName: "Live" */ '../views/Fichas.vue')
}, 
{
    path: '/Smart_form/:id',
    name: 'Smart_form',
    component: () =>
        import ( /* webpackChunkName: "Live" */ '../views/Smart_form.vue')
},  ]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,

    routes
})
export default router