import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "@/screens/Main";
import Table from "@/screens/Table";

Vue.use(VueRouter);

const routes = [
  { path: '/main', component: Main },
  { path: '/', component: Table }
];

const router = new VueRouter({
 mode: 'history',
 hash: false,
 base: process.env.BASE_URL,
 routes
});

export default router;
