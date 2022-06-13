/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VueRouter from 'vue-router'
import $storage from '../plugins/storage'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Login',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Login.vue'),
},
{
    path: '/FichasPreguntas/:id',
    name: 'FichasPreguntas',
    component: () =>
        import( /* webpackChunkName: "Live" */ '../views/FichasPreguntas.vue')
},
{
    path: '/FichasRespuestas/:id/:idFicha',
    name: 'FichasRespuestas',
    component: () =>
        import( /* webpackChunkName: "Live" */ '../views/FichasRespuestas.vue')
},
{
    path: '/Fichas',
    name: 'Fichas',
    component: () =>
        import( /* webpackChunkName: "Live" */ '../views/Fichas.vue')
},
{
    path: '/CambioPass',
    name: 'CambioPass',
    component: () =>
        import( /* webpackChunkName: "Live" */ '../views/eit/CambioPass.vue')
},
{
    path: '/FichaEit',
    name: 'FichaEit',
    component: () =>
        import( /* webpackChunkName: "Live" */ '../views/eit/FichaEit.vue')
},
{
    path: '/SmartFormView/:id',
    name: 'SmartFormView',
    component: () =>
        import( /* webpackChunkName: "Live" */ '../views/SmartFormView.vue')
},
{
    path: '/SmartForm/:id',
    name: 'SmartForm',
    component: () =>
        import( /* webpackChunkName: "Live" */ '../views/SmartForm.vue')
},
{
    path: '/MisInscriptos/:id',
    name: 'MisInscriptos',
    component: () =>
        import( /* webpackChunkName: "Live" */ '../views/eit/MisInscriptos.vue'),
        meta: {
            requiresAuth: true,
        },        
},
{
    path: '/eit',
    name: 'eit-home',
    component: () =>
        import( /* webpackChunkName: "landing-AdminPage" */ '../views/eit/AdminPage.vue'),
    meta: {
        requiresAuth: true,
    },
},]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,

    routes
})
export default router