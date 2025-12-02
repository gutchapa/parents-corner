
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (role: 'parent' | 'admin') => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Toggle state
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For prototype: If "admin" is typed in ID, or admin toggle is on, treat as admin
      if (isAdmin || username.toLowerCase() === 'admin') {
         onLogin('admin');
      } else {
         onLogin('parent');
      }
    }, 1000);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
        setShowForgotPassword(false);
        setResetSent(false);
        setResetEmail('');
        alert("Password reset instructions sent to your email/mobile.");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 p-4 relative">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-stone-200 transition-all duration-300">
        <div className="text-center mb-8">
          <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 transition-colors ${isAdmin ? 'bg-stone-800' : 'bg-brand-600'}`}>
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isAdmin ? (
                  <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5z"></path>
                ) : (
                  <>
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </>
                )}
             </svg>
          </div>
          <h1 className="text-2xl font-bold text-stone-800">Bodhana & Learning Tree Montessori</h1>
          <p className="text-stone-500 mt-2">{isAdmin ? 'Admin Portal' : 'Parents Corner Login'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{isAdmin ? 'Admin Username' : 'Parent ID / Mobile'}</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-white text-stone-900 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all placeholder-stone-400"
              placeholder={isAdmin ? "admin" : "Enter your registered ID"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white text-stone-900 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all placeholder-stone-400"
              placeholder="••••••••"
            />
            {!isAdmin && (
              <div className="text-right mt-1">
                <button 
                  type="button" 
                  onClick={() => setShowForgotPassword(true)}
                  className="text-xs text-brand-600 hover:text-brand-800 font-medium"
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center ${isAdmin ? 'bg-stone-800 hover:bg-stone-900' : 'bg-brand-600 hover:bg-brand-700'}`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <div className="mt-6 border-t border-stone-200 pt-4 flex justify-between items-center text-xs text-stone-500">
           <button 
             type="button" 
             onClick={() => setIsAdmin(!isAdmin)}
             className="text-brand-600 hover:underline"
           >
             {isAdmin ? '← Back to Parent Login' : 'Login as Admin'}
           </button>
           {!isAdmin && <span>Contact Administration for help</span>}
        </div>
      </div>

      {/* Forgot Password Modal (Same as before) */}
      {showForgotPassword && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
           <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm relative animate-fade-in">
             <button 
               onClick={() => setShowForgotPassword(false)}
               className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
             </button>
             
             <h2 className="text-xl font-bold text-stone-800 mb-2">Reset Password</h2>
             <p className="text-sm text-stone-500 mb-6">Enter your email or registered mobile number to receive a reset link.</p>
             
             {resetSent ? (
               <div className="text-center py-4 text-brand-600 font-medium">
                 Sending request...
               </div>
             ) : (
               <form onSubmit={handleResetSubmit} className="space-y-4">
                 <input
                    type="text"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-white text-stone-900 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                    placeholder="Email or Mobile"
                  />
                  <button
                    type="submit"
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2 rounded-lg transition-colors"
                  >
                    Send Reset Link
                  </button>
               </form>
             )}
           </div>
        </div>
      )}
    </div>
  );
};

export default Login;
