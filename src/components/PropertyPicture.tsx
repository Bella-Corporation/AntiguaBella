import type { CSSProperties } from "react";

import type { PropertyPhoto } from "@/data/antiguabellaMedia";

type PropertyPictureProps = {
  photo: Pick<PropertyPhoto, "avif" | "webp" | "src" | "srcSet" | "width" | "height">;
  alt: string;
  className?: string;
  pictureClassName?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
  style?: CSSProperties;
};

const PropertyPicture = ({
  photo,
  alt,
  className,
  pictureClassName,
  loading = "lazy",
  fetchPriority,
  sizes,
  style,
}: PropertyPictureProps) => {
  return (
    <picture className={pictureClassName}>
      {photo.avif ? <source srcSet={photo.avif} type="image/avif" sizes={sizes} /> : null}
      {photo.webp ? <source srcSet={photo.webp} type="image/webp" sizes={sizes} /> : null}
      <img
        src={photo.src}
        srcSet={photo.srcSet}
        alt={alt}
        width={photo.width}
        height={photo.height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        sizes={sizes}
        className={className}
        style={style}
      />
    </picture>
  );
};

export default PropertyPicture;
