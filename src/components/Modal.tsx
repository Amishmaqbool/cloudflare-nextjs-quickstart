import Image from "next/image";
import { useEffect } from "react";
import Close from "@/assets/svgs/close.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="px-5 fixed bg-opacity-75 inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={800}
          height={600}
          loading="lazy"
          className="rounded-lg h-[50vh] sm:h-[60vh] lg:max-w-[50vw] w-auto"
          
        />
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 text-white rounded-full bg-black p-2 text-sm sm:text-base"
        >
          <Image
            loading="lazy"
            src={Close}
            alt="Close"
            width={16}
            height={16}
            
          />
        </button>
      </div>
    </div>
  );
};

export default Modal;
