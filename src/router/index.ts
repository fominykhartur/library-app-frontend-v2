// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "toolBar",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        //
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "Home" */ "@/views/Home.vue"),
      },
      {
        path: "/auth",
        name: "Authentication",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "Authentication" */ "@/views/Auth.vue"),
      },
      {
        path: "/users",
        name: "users",
        component: () =>
          import(/* webpackChunkName: "users" */ "@/views/Users.vue"),
      },
      {
        path: "/users/:id",
        name: "userProfile",
        component: () =>
          import(
            /* webpackChunkName: "userProfile" */ "@/views/UserProfileBooks.vue"
          ),
      },
      {
        path: "/books",
        name: "books",
        component: () =>
          import(/* webpackChunkName: "books" */ "@/views/Books.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
