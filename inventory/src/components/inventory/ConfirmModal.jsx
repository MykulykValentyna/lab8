const ConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center m-0 p-4">

      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" 
        onClick={onCancel}
      ></div>

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 z-10 transform transition-all animate-in fade-in zoom-in duration-300 border border-white/20">
        <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-50 mb-6">
          <span className="text-red-600 text-2xl font-bold">!</span>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Підтвердіть видалення</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Ви впевнені? Це дію неможливо скасувати, предмет зникне з бази даних.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
          >
            Скасувати
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-200"
          >
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;