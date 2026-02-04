export function FormInput({ label, id, ...props }) {
  return (
    <div>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-[#0B2545] mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
        {...props} 
      />
    </div>
  );
}