
import { useState } from "react"
import Cookies from "js-cookie"
import {Navigate, useNavigate} from "react-router"
import "./index.css"
const LoginPage = () => {
    const [showPass,setShowPass]=useState(false)
    const [username,setUserName]=useState("")
    const [password,setPassword]=useState('')
    const [errormsg,setErrorMsg]=useState(false)
    const navigate=useNavigate()
    const onSubmitSuccess = (jwtToken) => {
        Cookies.set("jwt_Token",jwtToken)
        navigate("/",{replace:true})
    }

    const onSubmitFailure = (errorMsg) => {
        setErrorMsg(true)
        setErrorMsg(errorMsg)
    }

    const submitForm=async (event)=>{
        event.preventDefault()
        const userDetails={username,password}
        console.log(userDetails)
        const url="https://apis.ccbp.in/login"
        const options={
            method:"POST",
            body:JSON.stringify(userDetails)
        }
        const response=await fetch(url,options)
        const data=await response.json()
        console.log(data)
        if(response.ok===true){
            onSubmitSuccess(data.jwt_token)
        }
        else{
            onSubmitFailure(data.message || data.error_msg)
        }
    }

    // const handleRegister=async (event)=>{
    //     event.preventDefault()
    //     const userDetails={username,password}
    //     const url="http://localhost:5000/register"
    //     const options={
    //         method:"POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body:JSON.stringify(userDetails)
    //     }
    //     try {
    //         const response=await fetch(url,options)
    //         const data=await response.json()
    //         if(response.ok){
    //             alert(data.message);
    //             setErrorMsg("")
    //         }
    //         else{
    //             onSubmitFailure(data.message || data.error_msg)
    //         }
    //     } catch (error) {
    //         onSubmitFailure("Network error during registration")
    //     }
    // }

    const token=Cookies.get("jwt_Token")
    if(token!==undefined){
        return <Navigate to="/"/>
    }


    return (
        <>
            <div className="quad-background-grid">
                <div className="grid-segment" style={{ backgroundImage: "url('https://res.cloudinary.com/dvzmtafph/image/upload/v1775881578/8faf00be5eb69a93a65afbe3d74139ee52d7c888_bjcga6.jpg')" }}></div>

                <div className="grid-segment" style={{ backgroundImage: "url('https://res.cloudinary.com/dvzmtafph/image/upload/v1775881603/17264c25b2390e63bf21e8f09205a575650c9b3f_aeozxm.jpg')" }}></div>

                <div className="grid-segment" style={{ backgroundImage: "url('https://res.cloudinary.com/dvzmtafph/image/upload/v1775881617/df41397809637783efe77643f73b5262ba12bbea_bjh5u1.jpg')" }}></div>

                <div className="grid-segment" style={{ backgroundImage: "url('https://res.cloudinary.com/dvzmtafph/image/upload/v1775881627/76cc17ce61edba1f611c2f04d50ed2fb0aa0d69c_inz363.jpg')" }}></div>
                <div className="login-container">
                <form className="loginForm" onSubmit={submitForm}>
                    <img className="loginImg" alt="logo" src="https://res.cloudinary.com/dvzmtafph/image/upload/v1775882251/6fad20838855997d164dd88d885fad87bdfa3be6_fpr0nw.png"/>
                    
                    <div className="input-group">
                        <label className="input-label">Username</label>
                        <input className="input-field" type="text" value={username} onChange={(e)=>{
                            setUserName(e.target.value)
                        }}/>
                    </div>
                    
                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input className="input-field" type={showPass?"text":"password"} value={password} onChange={(e)=>{
                            setPassword(e.target.value)
                        }}/>
                    </div>
                    
                    <div className="checkbox-row">
                        <input type="checkbox" id="show-password" onChange={()=>{
                            setShowPass(!showPass)
                        }}/>
                        <label htmlFor="show-password">Show Password</label>
                    </div>
                    
                    <div style={{display: 'flex', gap: '10px'}}>
                        <button className="submit-btn" type="submit" style={{flex: 1}}>Login</button>
                    </div>
                    {errormsg && <p style={{color: "red", fontSize: "14px", marginTop: "10px", textAlign: "center"}}>*{errormsg}</p>}
                </form>
            </div>
            </div>
            
        </>
    )
}

export default LoginPage