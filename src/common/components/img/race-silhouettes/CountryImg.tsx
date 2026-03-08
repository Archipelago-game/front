import ImgCardWrapper from "./wrapper/ImgCardWrapper.tsx";
import CustomImage from "./wrapper/CustomImage.tsx";

interface Props {
  src: string;
  alt?: string;
}

export default function CountryImg({ src, alt }: Props) {
  return (
    <ImgCardWrapper>
      <CustomImage src={src} alt={alt ?? "Родина"} />
    </ImgCardWrapper>
  );
}
