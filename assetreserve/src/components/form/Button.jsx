export function Button({ children, className = "", isLoading, ...props }) {
  return (
    <button
      className={`bg-[#0B2545] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#163b6b] transition duration-300 disabled:opacity-50 ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Carregando..." : children}
    </button>
  );
}