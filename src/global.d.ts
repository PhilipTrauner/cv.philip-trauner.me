declare module "*.png" {
  const value: string;
  export = value;
}

declare module "sized:*.png" {
  const value: {
    src: string;
    width: number;
    height: number;
  };
  export = value;
}

declare module "*.mp4" {
  const value: string;
  export = value;
}
declare module "*.webm" {
  const value: string;
  export = value;
}
declare module "*.mov" {
  const value: string;
  export = value;
}

declare module "*.webp" {
  const value: string;
  export = value;
}

declare module "*.svg" {
  const value: string;
  export = value;
}

declare module "*.woff2" {
  const value: string;
  export = value;
}

/* injected during build */
declare const HYDRATE: boolean;
