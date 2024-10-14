import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void; // Updated to accept a token parameter
  logout: () => void;
}
// ... existing code ...

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = Cookies.get('authToken'); // استرداد التوكن من الكوكيز
    // تحقق من التوكن بشكل صحيح (يمكنك هنا إضافة تحقق من صحة التوكن إذا لزم الأمر)
    setIsAuthenticated(!!token);
  }, []);

  const login = (token: string) => {
    // تخزين التوكن في الكوكيز عند تسجيل الدخول
    Cookies.set('authToken', token, { expires: 1 }); // تعيين انتهاء الصلاحية حسب الحاجة
    setIsAuthenticated(true);
  };

  const logout = () => {
    // إزالة التوكن من الكوكيز عند تسجيل الخروج
    Cookies.remove('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
