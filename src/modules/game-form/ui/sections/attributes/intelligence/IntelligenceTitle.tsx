import AttributeTitle from "../AttributeTitle.tsx";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";

export default function IntelligenceTitle() {
  const { values } = useCustomFormContext();

  if (!values) {
    return null;
  }

  return <AttributeTitle title={values.stats.intelligence} fieldName={} />;
}
