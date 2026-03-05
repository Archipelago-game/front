import ImgCardWrapper from "./wrapper/ImgCardWrapper.tsx";
import CustomImage from "./wrapper/CustomImage.tsx";

export default function DefaultCountry() {
  return (
    <ImgCardWrapper>
      <CustomImage
        src="public/img/hero-card/default_country.png"
        alt="Родина"
      />
    </ImgCardWrapper>
  );
}
