class WASMLoader {
  public loadWASM(path: string) {
    const script = document.createElement('script')
    script.src = `/wasm/${path}.js`
    document.head.appendChild(script)
  }
}

export {WASMLoader}
