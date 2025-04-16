// src/types/custom.d.ts
declare module 'src/redux/*' {
    // Export everything as `any` type to bypass type checking for all JS files in the redux folder
    const value: any;
    export default value;
  }
  