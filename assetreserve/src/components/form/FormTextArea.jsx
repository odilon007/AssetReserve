export function FormTextArea({ label, id, rows = 4, ...props }) {
  return (
    <div>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-[#0B2545] mb-1"
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
        {...props}
      />
    </div>
  );
}