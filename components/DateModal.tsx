"use client";

import React from "react";
import Modal from "react-modal";

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
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "50%",
    marginRight: "-50%",
    opacity: "1",
  },
};

type Props = {
    isOpen: boolean
    // closeModal: (value: string) => void
};

export const DateModal = ({ isOpen, closeModal }: Props) => {
  return (
    <div>
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
      >
        <div className="bg-white px-10 py-10 flex flex-col gap-10 w-[50%]">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className=" text-lg text-white flex justify-center items-center w-10 h-10 bg-[#164e63] rounded-full"
            >
              X
            </button>
          </div>
          <div className="bg-red-500">modall</div>
        </div>
      </Modal>
    </div>
  );
};
