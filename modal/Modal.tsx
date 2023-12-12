import { useModal } from "@/context/useModal";
import { FC, PropsWithChildren } from "react";
import Modal from "react-modal";

export const AppModal: FC<PropsWithChildren> = ({ children }) => {
  const { isOpen, closeModal } = useModal();

  // Styles for modal
  const customStyles: Modal.Styles = {
    overlay: {
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      opacity: "1",
    },
    content: {
      borderRadius: "10px",
      opacity: "1",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      contentLabel="Start Project Modal"
      overlayClassName={`left-0 bg-[#00000070] outline-none transition-all ease-in-out duration-500`}
      className="w-full h-full flex items-center justify-center"
    //   parentSelector={() => document.querySelector(".root")!}
    >
      <button
        type="button"
        onClick={closeModal}
        className="absolute top-10 right-10 text-sm text-white px-4 h-12 bg-black rounded-lg"
      >
        Close
      </button>
      {children}
    </Modal>
  );
};
