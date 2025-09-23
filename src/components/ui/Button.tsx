export default function Button({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-md font-medium shadow-md bg-primary text-white hover:bg-indigo-700 transition ${className}`}
    >
      {children}
    </button>
  );
}