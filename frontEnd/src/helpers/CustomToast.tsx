interface ToastProps {
  message: string;
  type: "success" | "error";
}

const CustomToast: React.FC<ToastProps> = ({ message, type }) => {
  return (
    <div className="fixed top-4 right-4  animate-fade-in z-9999">
      <div
        className={`px-6 py-3 rounded-lg shadow-lg text-white ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default CustomToast;
