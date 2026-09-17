import { useContext,useEffect } from "react";
import {AuthContext} from "../auth.context.jsx";
import {login,register,logout,getme} from "../services/auth.api.js";
import {useNavigate} from "react-router";
export function useAuth(){
    const context=useContext(AuthContext);

    const {user,setUser,loading,setLoading}=context;
const navigate=useNavigate();
    async function handleRegister({username,email,password}){
        setLoading(true);
        try {
            const data=await register({username,email,password});
            setUser(data.user);
            if(data){

                navigate("/login")
            }
        } catch (error) {
            alert("Registration failed. Please try again.");
            console.error("Error registering user:", error);
        }finally{
            setLoading(false);
        }
    }

async function handleLogin({email,password}){
    setLoading(true)
try {
      const data=await login({email,password});
            setUser(data.user);
            if(data){

                navigate("/")
            }
        } catch (error) {
            alert("Login failed. Please check your credentials and try again.");
            console.error("Error logging in user:", error);
        }finally{
            setLoading(false);
}
}


async function handleLogout(){
    setLoading(true)
try {
      const data=await logout();
            setUser(null);
            alert("You have been logged out successfully.");
} catch (error) {
    console.error("Error logout in user:", error);
}finally{
    setLoading(false);
}}

async function handleGetme(){
   
try {
      const data=await getme();
     
            setUser(data.user);
            console.log(user)
} catch (error) {
    console.error("Error in getme:", error);
}finally{
    setLoading(false);
}
}


useEffect(()=>{
handleGetme()
},[])


return {user,loading,handleRegister,handleLogin,handleLogout}

}