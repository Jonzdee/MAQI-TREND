interface ImageProps {
  imgSrc: string;
  className?: string;
  alt?: string;
  loading?: "lazy" | "eager";
}

const Image = ({ imgSrc, className, alt, loading }: ImageProps) => {
  return <img className={className} src={imgSrc} alt={alt ?? imgSrc} loading={loading} />;
};

export default Image;
