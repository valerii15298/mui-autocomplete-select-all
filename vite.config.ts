import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "MuiAutocompleteSelectAll",
      fileName: `MuiAutocompleteSelectAll`,
    },
    rollupOptions: {
      external(source, importer, isResolved) {
        if (source?.includes("mui-autocomplete-select-all")) {
          return false;
        }
        return true;
      },
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
