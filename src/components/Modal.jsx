function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;