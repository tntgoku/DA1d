// Component chính
import Footer from "../components/client/Footer";
import Header from "../components/client/Header";
import LoginForm from "../components/client/FormLogin";
import RegisterForm from "../components/client/FormRegister";
import { useState } from "react";
const AuthForms = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSocialLogin = (provider) => {
    alert(`Đăng nhập bằng ${provider} được kích hoạt.`);
  };

  return (
    <>
    <Header/>
    <div className="auth-container container">
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12 col-12 col-xl-4 offset-xl-4 offset-lg-4 offset-md-3 offset-xl-3 " style={{margin: "auto"}}>
          <div className="auth-forms block-background" style={{margin: '28px 0'}}>
            {isLogin ? (
              <LoginForm 
                switchToRegister={() => setIsLogin(false)} 
                onSocialLogin={handleSocialLogin}
              />
            ) : (
              <RegisterForm 
                switchToLogin={() => setIsLogin(true)} 
                onSocialLogin={handleSocialLogin}
              />
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AuthForms;