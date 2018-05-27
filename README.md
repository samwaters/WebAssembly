# WebAssembly
C + JS = Greatness

## Purpose
To test how well JS and Web Assembly can work together

## Running the project
 - Check out the code
 - Run `yarn install`
 - Run `yarn run build.dev` to compile the bundle
 - Run `yarn start` to start the node server
 - Project will be available on http://localhost:9000

## Compiling the C code
Compiled using Emscripten (on a Linux build host)
Compile commmand: `emcc -O3 -s WASM=1 -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]' prime.c -o prime.js`

## Notes
WASM files _must_ be served with a `application/wasm` header
