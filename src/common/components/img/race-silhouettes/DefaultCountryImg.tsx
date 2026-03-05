import ImgCardWrapper from "./wrapper/ImgCardWrapper.tsx";
import CustomImage from "./wrapper/CustomImage.tsx";

export default function DefaultCountryImg() {
  return (
    <ImgCardWrapper>
      <CustomImage src="/img/hero-card/default_country.png" alt="Родина" />
    </ImgCardWrapper>
  );
}
