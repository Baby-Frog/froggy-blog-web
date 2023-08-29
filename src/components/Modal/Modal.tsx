import React, { useState } from "react";
import { createPortal } from "react-dom";
import { styled } from "styled-components";
import { CloseButtonIcon } from "../Icon";

type TModalProps = {
  isOpen?: boolean;
  children: React.ReactNode;
  handleClose?: () => void;
  maxWidth?: string;
};

const ModalAlign = styled.div<{ $isOpen: boolean }>`
  font-family: "DM Sans", sans-serif;
  position: fixed;
  transition: all 200ms ease-in-out;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
`;

const ModalOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div<{ $maxWidth?: string }>`
  background: #fff;
  position: relative;
  z-index: 10;
  padding: 24px;
  border-radius: 20px;
  width: 100%;
  max-width: ${(props) => props.$maxWidth || "512px"};
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 24px;
  height: 24px;
  border-radius: 100rem;
  background-color: #e7ecf3;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 12px;
    height: 12px;
  }
`;

const Modal = ({ isOpen = false, handleClose, maxWidth, children }: TModalProps) => {
  if (typeof document === "undefined") return <div className="modal"></div>;
  return createPortal(
    <ModalAlign $isOpen={isOpen}>
      <ModalOverlay onClick={handleClose} />
      <ModalContent $maxWidth={maxWidth}>
        <ModalCloseButton onClick={handleClose}>
          <CloseButtonIcon />
        </ModalCloseButton>
        {children}
      </ModalContent>
    </ModalAlign>,
    document.body,
  );
};

export default Modal;
