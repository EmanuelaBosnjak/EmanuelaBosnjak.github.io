import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

createApp(App)
  .use(
    createRouter({
      history: createWebHistory(),
      routes: [
        {
          name: "home",
          path: "/",
          component: () => import("./pages/Home.vue"),
        },
        {
          name: "gallery",
          path: "/gallery",
          component: () => import("./pages/Gallery.vue"),
        },
        {
          name: "commissions",
          path: "/commissions",
          component: () => import("./pages/Comms.vue"),
        },
        {
          name: "contact",
          path: "/contact",
          component: () => import("./pages/Contact.vue"),
        },
      ],
    }),
  )
  .mount("#app");
