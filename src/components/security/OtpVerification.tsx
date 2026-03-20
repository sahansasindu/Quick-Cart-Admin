import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { authService } from '../../services/authService';

const OtpVerification: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resending, setResending] = useState(false);
  
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || '';

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    
    // Move to next input if value is entered
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const data = e.clipboardData.getData('text').trim();
    if (!/^\d+$/.test(data)) return;
    
    const digits = data.split('').slice(0, 4);
    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      newOtp[index] = digit;
    });
    setOtp(newOtp);
    
    // focus the last filled input or the next empty one
    const nextIndex = Math.min(digits.length, 3);
    inputRefs[nextIndex].current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 4) {
      setError('Please enter the full code');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      await authService.verifyEmail(email, code);
      setSuccess('Email verified successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    try {
      await authService.resendOtp(email);
      setSuccess('Verification code resent successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to resend code');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="security-container">
      <div className="security-card">
        <h1>Verify Email</h1>
        <p className="navigation-link" style={{ marginBottom: '24px' }}>
          We've sent a 4-digit code to <br />
          <strong>{email}</strong>
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="otp-input-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="otp-field"
                required
              />
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message" style={{ textAlign: 'center' }}>{success}</div>}

          <button type="submit" className="btn-primary" disabled={loading || otp.some(d => !d)}>
            {loading ? <div className="spinner"></div> : 'Verify Code'}
          </button>

          <div className="navigation-link">
            Didn't receive code?{' '}
            <button 
              type="button" 
              onClick={handleResend} 
              disabled={resending}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--primary-color)', 
                fontWeight: '600', 
                cursor: 'pointer',
                padding: 0
              }}
            >
              {resending ? 'Resending...' : 'Resend Code'}
            </button>
          </div>
          
          <div className="navigation-link">
            <Link to="/signup">Back to Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
