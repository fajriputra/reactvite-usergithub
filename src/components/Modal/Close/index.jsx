const CloseButton = ({ onClose }) => {
  return (
    <button
      className="btn-close box-content w-5 h-5 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
      onClick={onClose}
    >
      X
    </button>
  );
};

export default CloseButton;
