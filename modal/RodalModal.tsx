import { ReactNode } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";

interface ModalProps {
  show: boolean;
  closeModal: () => void;
  children: ReactNode;
  title: string;
  width?: number;
  height?: number;
}

const Modal = ({
  show,
  closeModal,
  children,
  title,
  width,
  height,
}: ModalProps) => {
  return (
    <>
      <div className="hidden md:block">
        <Rodal
          visible={show}
          onClose={closeModal}
          width={width}
          height={height}
          animation="slideDown"
          duration={600}
        >
          <div className="text-black px-4">
            <h2 className="mb-8 text-xl font-medium">{title}</h2>

            {children}
          </div>
        </Rodal>
      </div>
      <div className="md:hidden">
        <Rodal
          visible={show}
          onClose={closeModal}
          width={350}
          height={height}
          animation="slideDown"
          duration={600}
        >
          <div className="text-black px-4">
            <h2 className="mb-8 text-xl font-medium">{title}</h2>

            {children}
          </div>
        </Rodal>
      </div>
    </>
  );
};

export default Modal;
