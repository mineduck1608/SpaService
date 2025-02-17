import { useEffect, useState } from "react";

export function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Giải mã JWT để kiểm tra thời gian hết hạn
  const isTokenValid = (token: string | null) => {
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Giải mã phần payload của JWT
      return payload.exp * 1000 > Date.now(); // Kiểm tra xem token còn hạn không
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem("token");
      if (!isTokenValid(token)) {
        sessionStorage.removeItem("token"); // Xóa token nếu hết hạn
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();

    // Lắng nghe thay đổi của sessionStorage (trong trường hợp token bị xóa từ tab khác)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "token") {
        checkAuth();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Kiểm tra token mỗi phút (phòng trường hợp token hết hạn nhưng không reload)
    const interval = setInterval(checkAuth, 60000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (isAuthenticated === null) {
    return null; // Không hiển thị gì khi đang kiểm tra token
  }

  return isAuthenticated ? <>{children}</> : null;
}
