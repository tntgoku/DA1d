import { login as loginService } from '../service/Authentication';

export const useAuthen = () => {
  const handleSubmit = (e, formData) => {
    e.preventDefault();
    const requestdata={username:formData.email,passwordHash:formData.password};
    console.log(requestdata);
    // Gọi API đăng nhập
    loginService(requestdata.username,requestdata.passwordHash)
      .then(data => {
        console.log('Login successful:', data);
        alert('Đăng nhập thành công!');
      })
      .catch(error => {
        console.error('Login failed:', error);
        alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      });
  };

  return { handleSubmit };
};
