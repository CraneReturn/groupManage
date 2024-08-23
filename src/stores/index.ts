// store.ts
import { createPinia } from "pinia";
import persist from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(persist);

export * from "./counter";
export * from "./student";
export * from "./user/index";

export default pinia;
