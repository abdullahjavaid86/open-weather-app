import type { ReactNode } from "react";
import styled from "styled-components";

const FullWidth = styled.div`
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Content = ({ children }: { children: ReactNode }) => {
  return <FullWidth>{children}</FullWidth>;
};
