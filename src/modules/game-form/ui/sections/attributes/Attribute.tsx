import type { ReactNode } from "react";

import SubSection from "../../components/section/SubSection.tsx";

interface Props {
  children: ReactNode;
}
export default function Attribute({ children }: Props) {
  return <SubSection>{children}</SubSection>;
}
