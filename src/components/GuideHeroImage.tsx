interface GuideHeroImageProps {
  src: string;
  alt: string;
}

const GuideHeroImage = ({ src, alt }: GuideHeroImageProps) => (
  <div className="mb-10 overflow-hidden rounded-xl" style={{ aspectRatio: '16/5', maxHeight: '400px' }}>
    <img
      src={src}
      alt={alt}
      width={1920}
      height={600}
      className="w-full h-full object-cover"
      loading="eager"
    />
  </div>
);

export default GuideHeroImage;
