import React,{useState} from 'react'
import {  Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth.js'

const Login = () => {

     const [formData, setFormData] = useState({
        
           email: "",
           password: ""
       })
const {loading,handleLogin}=useAuth()


    const handleSubmit = async (e) => {
     
        e.preventDefault();
        console.log(formData)
        const {email,password}=formData
        
            
            await handleLogin({email,password});
       
    }

      if(loading){
        return (<main><h1>Loading.......</h1></main>)
    }



    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                           value={formData.email}
onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            value={formData.password}
onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            
                      
                            type="password" id="password" name='password' placeholder='Enter password' />
                    </div>
                    <button  className='button primary-button' >Login</button>
                </form>
                <p>Don't have an account? <Link to={"/register"} >Register</Link> </p>
            </div>
        </main>
    )
}

export default Login
