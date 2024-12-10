
import Toast from "@/components/basic/Toast";
import { createContext, useContext, useState } from "react";

const ToastContext = createContext({
  message: "",
  visible: false,
  duration: 3000,
  color: "red",
  setToast: (
    message: string,
    visible: boolean,
    duration?: number,
    color?: string
  ) => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToastState] = useState({
    message: "",
    visible: false,
    duration: 3000,
    color: "red",
  });

  const setToast = (
    message: string,
    visible: boolean,
    duration: number = 3000,
    color: string = "red"
  ) => {
    console.log("setToast", message, visible, duration, color);
    setToastState({ message, visible, duration, color });
  };

  return (
    <ToastContext.Provider value={{ ...toast, setToast }}>
                  <Toast
                message={toast.message}
                visible={toast.visible}
                duration={toast.duration}
                color={toast.color}
                setToast={() => setToastState({ ...toast, visible: false })}
              />
      {children}
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastContextProvider');
  }
  return context;
}