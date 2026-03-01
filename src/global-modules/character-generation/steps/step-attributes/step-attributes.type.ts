export type DistributionMethod = "standard" | "purchase" | "random";
export interface StepAttributesContext {
  method: DistributionMethod;
}
