function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}) {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "bg-slate-200 hover:bg-slate-300 text-slate-800",

    danger:
      "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-5
        py-2.5
        rounded-xl
        font-medium
        transition
        duration-200
        ${variants[variant]}
      `}
    >
      {children}
    </button>
  );
}

export default Button;