import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from 'views/Home.vue'
// import register from 'views/register.vue'
// import Login from 'views/Login.vue'
// import userinfo from 'views/userinfo.vue'
// import edit from 'views/edit.vue'
// import artical from 'views/artical.vue'
// import editCategory from 'views/editCategory.vue'

const Home = () =>
    import ('views/Home.vue')
const register = () =>
    import ('views/register.vue')
const Login = () =>
    import ('views/Login.vue')
const userinfo = () =>
    import ('views/userinfo.vue')
const edit = () =>
    import ('views/edit.vue')
const artical = () =>
    import ('views/artical.vue')
const editCategory = () =>
    import ('views/editCategory.vue')


Vue.use(VueRouter)

const routes = [{

        path: '/',
        redirect: '/home',
        component: Home,

    },
    {
        path: '/home',
        component: Home,
        meta: {
            keepalive: true
        }
    },
    {
        path: '/register',
        component: register
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/userinfo',
        component: userinfo,
        meta: {
            istoken: true
        }
    },
    {
        path: '/edit',
        component: edit,
        meta: {
            istoken: true
        }
    },
    {
        path: '/artical/:id',
        component: artical
    },
    {
        path: '/editCategory/',
        component: editCategory
    }


]

const router = new VueRouter({
    mode: 'history',
    routes
})

//添加路由导航守卫
router.beforeEach((to, from, next) => {
    //因为每次进入页面都会执行beforeEach，包括首页和详情页，所以在需要验证的路由加上meta
    if (!localStorage.getItem('id') && !localStorage.getItem('token') && to.meta.istoken == true) {
        router.push('/login');
        Vue.prototype.$msg.fail('请重新登录')
        return
    }
    next();
})
export default router