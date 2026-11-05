import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import LoadingSpinner from "../Components/LoadingSpiner/LoadingSpiner";

const AuthAdminContext = createContext(null);


export const AuthAdminProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Check if user is logged in on application mount / refresh
  useEffect(() => {
    const checkAuthAdminStatus = async () => {
      try {
        // Backend verifies the HTTP-only refresh cookie here
        const response = await axios.get('https://api.tilthaimart.in/api/auth/authCheck', {withCredentials: true});
        if(!response.data.user){
            
          console.log('Session Expired! Please Login.') // e.g., { id: 1, name: 'Alice' }
          return;
        }else{
          setUser(response.data.user)
          // console.log(response.data.user)
        }
        
      } catch (err) {
        setUser(null)
        // if (err.response || err.response.status === 401) {
        //   setUser(null);
        //   // console.log('Session Expired!', err.response.data.message)
        // } else {
        //   console.log('Auth check failed:');
        // }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAdminStatus();
  }, []);

  if(isLoading){
    return <LoadingSpinner />;
  }

  // 2. Login function
  const admin_login = async (credentials) => {
    try{
    const response = await axios.post('https://api.tilthaimart.in/api/auth/login', credentials, {withCredentials:true});
    setUser(response); 
    return response;
    }catch(err){
      console.log(err)
    }finally{
      setIsLoading(false)
    }
  };

  // 3. Logout function
  const admin_logout = async () => {
    try {
      const res = await axios.post('https://api.tilthaimart.in/api/auth/logout', {}, {withCredentials:true});
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

  const authAdminContextValues = {
    user,
    setUser,
    isAuthenticated: !!user, 
    isLoading, 
    admin_login, 
    admin_logout
  }

  return (
    <AuthAdminContext.Provider value={authAdminContextValues}>
      {children}
    </AuthAdminContext.Provider>
  );
};

export const useAuth = () => useContext(AuthAdminContext);
