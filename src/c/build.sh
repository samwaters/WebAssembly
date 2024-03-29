#!/bin/zsh
clang --target=wasm32 \
  -O3 \
  -flto \
  -nostdlib \
  -Wl,--no-entry \
  -Wl,--export-all \
  -Wl,--lto-O3 \
  -o dist/wasm/$1.wasm \
  src/c/$1.c