import { useEffect, useState } from "react";
import CalculatedValue from "../../../components/CalculatedValue.tsx";

interface Props {
  value: number;
}

export default function DisplayValue(props: Props) {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return <CalculatedValue value={value} />;
}
