import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import google from '../google.png'
import { useGoogleLogin } from '@react-oauth/google'
import Header from "./Header";
import CustomPageTitle from "./CustomPageTitle";

const Login = () => {

    const title = "Login";

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [])
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authenticator_code, setAuthenticatorCode] = useState('')

    const [warningmessage, setWarningMessage] = useState('');
    const [warning, setWarning] = useState(false);

    const [successmessage, setSuccessMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const [btnmessage, setBtnMessage] = useState('Login')
    const [googleBtn, setGoogleBtn] = useState(false);

    const [authenticator, setAuthenticator] = useState(false);

    const handClick = async (e)=> {
        e.preventDefault();

        if (email == '' || password == '') {
            setWarning(true)
            setWarningMessage('All fields are required.')
            setTimeout(() => {
                setWarning(false)
            }, 1000);
            setBtnMessage('Login')
        }else{
            const data = {
                email: email,
                password: password
            }

            try {
                const response = await axios.post('http://localhost:8000/api/login', data, {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                
                const token = response.data.token;
                
                if (response.data.twofa == true) {
                    
                    setAuthenticator(true);
                    
                    if (authenticator_code == '') {
                        return;
                    }

                    const postdata = {
                        email: email,
                        password: password,
                        authenticator_code: authenticator_code
                    }
                    try {
                        const data = await axios.post('http://localhost:8000/api/login/twofa', postdata, {
                            headers: {
                                Accept: 'application/json'
                            }
                        })

                        const newtoken = data.data.token;

                        localStorage.setItem('token', newtoken);
                        setWarning(false)
                        setSuccess(true)
                        setSuccessMessage(data.data.message)
                        setBtnMessage('Login')

                        setTimeout(() => {
                            navigate('/dashboard');
                        }, 1000);

                    } catch (error) {
                        setSuccess(false);
                        setWarning(true);
                        setWarningMessage('Something went wrong.')
                        setBtnMessage('Login')
                    }

                }else{

                    localStorage.setItem('token', token);
                    setWarning(false)
                    setSuccess(true)
                    setSuccessMessage(response.data.message)
                    setBtnMessage('Login')

                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 1000);
                }

            } catch (error) {
                setSuccess(false);
                setWarning(true);
                setWarningMessage('Something went wrong.')
                setBtnMessage('Login')
            }
        }
        
    }

    const handleLoginClick = (e) => {
        e.preventDefault(); 

        setGoogleBtn(true);

        loginApp();
    };

    const loginApp = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const data = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${response.access_token}`
                    }
                });

                if (data.data.email_verified == true) {
                    const apidata = {
                        message: "Google Authentication Login",
                        email: data.data.email,
                        authorization: data.data.email_verified,
                    }

                    try {
                        
                        const response = await axios.post('http://localhost:8000/api/googlelogin', apidata, {
                            headers: {
                                Accept: 'application/json'
                            }
                        })

                        const token = response.data.token;
                        localStorage.setItem('token', token);

                        setWarning(false)
                        setSuccess(true)
                        setSuccessMessage(response.data.message)
                        setBtnMessage('Login')

                        setTimeout(() => {
                            navigate('/dashboard');
                        }, 1000);

                    } catch (error) {
                        setWarning(true);
                        setWarningMessage('Something went wrong.')
                    }

                }else{
                    console.log('Something went wrong.')
                    setGoogleBtn(false);
                }
            } catch (error) {
                console.log(error);
                setGoogleBtn(false);
            }
        }
    });

    return ( 
        <div className="home">
            <CustomPageTitle title="Authentication System - Login"/>
            <Header title={title}/>
            
            { warning && <div className="warning">{warningmessage}</div> }
            { success && <div className="success">{successmessage}</div> }

            <div className="box">
                <div style={{ textAlign: "center", fontWeight: "bold" }} >Login System</div>
                <form style={{marginTop: "20px"}}>

                    <div style={{marginTop: "10px"}}>
                        <div style={{ fontSize: "13px", fontWeight: "bold" }}>Email</div>
                        <input type="email" 
                        value={email} 
                        onChange={(event) => setEmail(event.target.value)} 
                         className="inputBox" />
                    </div>

                    <div style={{marginTop: "10px"}}>
                        <div style={{ fontSize: "13px", fontWeight: "bold" }}>Password</div>
                        <input type="password" 
                        value={password} 
                        onChange={(event) => setPassword(event.target.value)} 
                         className="inputBox" />
                    </div>

                    {authenticator == true ? (
                        <div style={{marginTop: "10px"}}>
                            <div style={{ fontSize: "13px", fontWeight: "bold" }}>Authenticator Code</div>
                            <input type="password" 
                            value={authenticator_code} 
                            onChange={(event) => setAuthenticatorCode(event.target.value)} 
                            className="inputBox" />
                        </div>
                    ) : null}

                    <div style={{marginTop: "10px"}}>
                        <button className="button" onClick={handClick}>{ btnmessage }</button>
                        <p></p>
                        <button className={googleBtn == true ? `googleactive` : `google`} onClick={handleLoginClick} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={google} width={35} alt="" style={{ marginRight: '10px' }} />
                            Sign In with Google
                        </button>
                    </div>
                </form>
                <p></p>
                <div style={{ textAlign: "center", fontSize: "12px" }} >Already have an account ? <Link to="/register">Register</Link></div>
            </div>

        </div>
     );
}
 
export default Login;