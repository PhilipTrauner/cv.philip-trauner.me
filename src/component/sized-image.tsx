import React from "react";

type OwnProps = {
  src: {
    src: string;
    width: number;
    height: number;
  };
};

type ImageProps = Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  keyof OwnProps["src"]
>;

export const ComponentSizedImage = React.forwardRef(
  (props: OwnProps & ImageProps, ref: React.ForwardedRef<HTMLImageElement>) => {
    const { src, ...intrinsics } = props;

    return (
      <img
        src={src.src}
        width={src.width}
        height={src.height}
        ref={ref}
        {...intrinsics}
      />
    );
  },
);
