function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;