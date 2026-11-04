import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Check if user is logged in on application mount / refresh
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Backend verifies the HTTP-only refresh cookie here
        const response = await axios.get('https://tilthaimart.in/api/auth/user/protected', {withCredentials: true});
        if(!response.data.user){
          // console.log('Session Expired! Please Login.') // e.g., { id: 1, name: 'Alice' }
          return;
        }else{
          setUser(response.data.user)
        }
        
      } catch (err) {
        if (err.response || err.response.status === 401) {
          setUser(null);
        } else {
          console.error('Auth check failed:', err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if(isLoading){
    return <div>Loading your profile...</div>;
  }

  // 2. Login function
  const login = async (credentials) => {
    try{
    const response = await axios.post('https://tilthaimart.in/api/auth/user/login', credentials, {withCredentials:true});
    setUser(response.data.user); 
    return response.data.user;
    }catch(err){
      console.log(err)
    }finally{
      setIsLoading(false)
    }
  };

  // 3. Logout function
  const logout = async () => {
    try {
      const res = await axios.post('https://tilthaimart.in/api/auth/user/logout', {}, {withCredentials:true});
      if(!res){
        console.log('logout not working')
        return;
      }else{
        return res.data;
      }
    } catch (error) {
      console.error("Logout failed on backend", error);
    } finally {
      setUser(null); // Always clear client-side state
      setIsLoading(false)
    }
  };

  const authContextValues = {
    user,
    isAuthenticated: !!user, 
    isLoading, 
    login, 
    logout
  }

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
