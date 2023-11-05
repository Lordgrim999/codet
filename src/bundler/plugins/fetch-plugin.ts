import * as esbuild from "esbuild-wasm";
import localforage from "localforage";
import axios from "axios";
const moduleCache = localforage.createInstance({
  name: "moduleCache",
});
export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      //Handle root entry file of 'index.js'
      build.onLoad({ filter: /^index\.js$/ }, () => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      });

      // check for any files if they are cached then return
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // check if the file path already cached then return the result
        const cachedResult = await moduleCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (cachedResult) return cachedResult;
        return null;
      });

      //handle load for any css file imported
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents = `
              const style=document.createElement('style');
              style.innerText='${escaped}'
              document.head.appendChild(style);`;
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        //store the data in cache and return the loaded modules
        await moduleCache.setItem(args.path, result);
        return result;
      });

      // handle load for js files
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        //store the data in cache and return the loaded modules
        await moduleCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
