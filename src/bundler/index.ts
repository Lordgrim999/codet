import * as esBuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let service: esBuild.Service;
const bundle = async (rawCode: string) => {
  if (!service) {
    service = await esBuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }
  try {
    const result = await service.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
      },
    });
    return {
      code: result.outputFiles[0].text,
      error: "",
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        code: "",
        error: err.message,
      };
    } else throw err;
  }
};
export default bundle;
