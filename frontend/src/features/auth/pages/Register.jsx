


import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })

const {loading,handleRegister}=useAuth()

   

   
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        const {username,email,password}=formData
        
            
            await handleRegister({username,email,password});
           
       
    }

  if(loading){
        return (<main><h1>Loading.......</h1></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input value={formData.username}
onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            type="text" id="username" name='username' placeholder='Enter username' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input  value={formData.email}
onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                       
                            type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input value={formData.password}
onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                           
                            type="password" id="password" name='password' placeholder='Enter password' />
                    </div>

                    <button  className='button primary-button' >Register</button>

                </form>

                <p>Already have an account? <Link to={"/login"} >Login</Link> </p>
            </div>
        </main>
    )
}

export default Register