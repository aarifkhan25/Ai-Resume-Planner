import axios from "axios"


const api=axios.create({
    baseURL:"http://localhost:8888/api/auth",
    withCredentials:true
    
})
export async function register({username,email,password}){
try {
   
    const response = await api.post("/register",{username,email,password});
    console.log("registerData"+response)
    return response.data
} catch (error) {
    console.error("Error during registration:",error.response.status, error);
    throw error;
}
}
export async function login({email,password}){
try {
     const response = await api.post("/login",{email,password});
      console.log("loginData"+response)
     return response.data
} catch (error) {
    console.error("Error during login:",error.response.status, error);
    throw error;
}
}
export async function logout(){
try {
   
    const response = await api.get("/logout");
     console.log("logoutData"+response)
    return response.data
} catch (error) {
    console.error("Error during logout:",error.response.status, error);
    throw error;
}
}
export async function getme(){
try {
     const response = await api.get("/get-me");
     console.log("getMeData"+response)
    return response.data
} catch (error) {
    console.error("Error during get user details:",error.response.status, error);
    throw error;
}
}