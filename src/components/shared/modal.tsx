import React, { useState } from "react";
import Modal from "styled-react-modal";

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }: { theme: any }) => theme.background};
  border: 1px solid ${({ theme }: { theme: any }) => theme.colors.blue};
  border-radius: 6px;
  opacity: ${(props: any) => props.opacity};
  transition : all 0.3s ease-in-out;
  overflow: "auto"`;

export function ModalComponent({
  isOpen,
  toggle,
  children,
}: {
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
}) {
  const [opacity, setOpacity] = useState(0);

  function toggleModal() {
    setOpacity(0);
    toggle();
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }

  return (
    <div>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        {children}
      </StyledModal>
    </div>
  );
}
