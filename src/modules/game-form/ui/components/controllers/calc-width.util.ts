const ADORNMENT_BLOCK_WIDTH = 54;
const FIELD_WIDTH = 35;

interface CalcWidth {
  fullWidth: boolean;
  isNumberType: boolean;
  showChangeValueBtn: boolean;
}

export function calcWidth({
  fullWidth,
  isNumberType,
  showChangeValueBtn,
}: CalcWidth) {
  if (fullWidth) {
    return "100%";
  }
  const adornment =
    isNumberType && showChangeValueBtn ? ADORNMENT_BLOCK_WIDTH : 0;
  if (isNumberType) {
    return `${adornment + FIELD_WIDTH}px`;
  } else {
    return "100%";
  }
}
