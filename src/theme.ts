import { useDark } from "@vueuse/core";

let isDark = useDark({
  disableTransition: false,
  storageKey: "theme",
});

export default isDark;
