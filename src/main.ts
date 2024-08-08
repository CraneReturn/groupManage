import "@/assets/base.css";
import "@/assets/main.css";
import "animate.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// @ts-ignore
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "dayjs/locale/zh-cn";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
// 导入 pinia
import pinia from "./stores/index";
// 持久化存储
const app = createApp(App);

app.use(router).use(ElementPlus, { locale: zhCn }).use(pinia).mount("#app");

export {};
