
export const SocialLogin=({onSocialLogin})=>{
    return(
            <div className="social-login">
          <div className="social-title">
            <span>Hoặc đăng nhập bằng</span>
          </div>
          <div className="social-buttons">
            <button 
              type="button" 
              className="social-btn facebook"
              onClick={() => onSocialLogin('Facebook')}
            >
              <i className="fab fa-facebook-f"></i> Facebook
            </button>
            <button 
              type="button" 
              className="social-btn google"
              onClick={() => onSocialLogin('Google')}
            >
              <i className="fab fa-google"></i> Google
            </button>
          </div>
        </div>
    )
}