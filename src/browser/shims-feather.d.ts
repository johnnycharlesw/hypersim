declare module 'feather-icons' {
  interface Feather {
    replace: (attrs?: Record<string, string | number>) => void;
  }
  const feather: Feather;
  export default feather;
}
