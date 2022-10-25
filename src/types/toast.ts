export interface ToastProps {
  message: string;
  status: "invalid" | "success";
  onShowToast: () => void;
}
