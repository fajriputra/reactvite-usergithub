import { useRef } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useEscapePress } from "@/hooks/useEscapePress";
import Card from "@/components/Card";

const Modal = (props) => {
  const { show, setShow, data } = props;

  const refModal = useRef(null);

  const handleClose = () => setShow((prev) => !prev);

  useEscapePress(handleClose);
  useClickOutside(refModal, handleClose);

  return (
    <>
      {show ? (
        <div className="w-full h-full lg:overflow-y-auto top-0 left-0 bg-[#000000CC]/40 fixed flex z-40 justify-center items-center">
          <div className="" ref={refModal}>
            <Card isModal onClose={handleClose} data={data} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
