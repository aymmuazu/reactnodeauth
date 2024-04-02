import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";

const Dashboard = () => {

    const navigate = useNavigate()
    
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [twofa, setTwofa] = useState();
    const [verifyTwoBody, setVerifyTwoBody] = useState(false);
    const [qrcode, setQrCode] = useState(null);
    const [qrcodesecret, setQrCodeSecret] = useState(null);
    const [otptoken, setOtpToken] = useState('');
    const [disabledTwoAction, setDisabledTwoAction] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            axios.get('http://localhost:8000/api/user', {
                headers: {
                    Authorization: `${token}`
                }
            })
            .then(response => {
                setTimeout(() => {
                    setUserData(response.data);
                    setLoading(false);
                }, 1000);
            })
            .catch(error => {
                localStorage.removeItem('token');
                navigate('/login')
                setLoading(false);
            })
        }
        else{
            window.location.href = '/login';
        }
    }, [verifyTwoBody, disabledTwoAction])

    const enableTwoFactor = async (e) => {
        e.preventDefault();

        try {

            const token = localStorage.getItem('token');
            
            const response = await axios.post('http://localhost:8000/api/dashboard/generatetwofa', null, {
                headers: {
                    Authorization: token
                }
            })

            setVerifyTwoBody(true);
            setQrCode(response.data.otpauth_url)
            setQrCodeSecret(response.data.secret)

        } catch (error) {
            console.log(error)
        }

    }

    const disabledTwoFactor = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:8000/api/dashboard/diabledtwofa', null, {
                headers: {
                    Authorization: token,
                    Accept: 'application/json'
                }
            })

            setDisabledTwoAction(true);

        } catch (error) {
            console.log('Something went wrong', error)
        }

    }

    const verifyQrCode = async (e) => {
        e.preventDefault();
        
        if (otptoken == '') {
            alert('Type Token Please.')
        }else{
            const data = {
                secret: qrcodesecret,
                qrcode: qrcode,
                otptoken: otptoken
            };

            try {
                const token = localStorage.getItem('token');

                const response = await axios.post('http://localhost:8000/api/dashboard/validatetwofa', data, {
                    headers: {
                        Authorization: token,
                        Accept: "application/json"
                    }
                })
                
                setVerifyTwoBody(false);
                
            } catch (error) {
                navigate('/dashboard')
            }
        }
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        navigate('/login')
    }

    if (loading) {
        return <p>Loading...</p>;
    }else{
        return (
            <div className="home">
                <h2 style={{ textAlign: "center" }}>Authentication System</h2>
                <div className="box">
                    {userData ? (

                        <div>
                            
                                <strong>Dashboard - {userData.first_name}!</strong>
                                <p>
                                    { userData.last_name }<br></br>
                                    { userData.email }
                                    <Link to="/dashboard/profile" className="button_small_sm" style={{marginLeft: "5px"}}>Edit</Link>
                                </p>

                            <p></p>

                            {userData.twofa === true ? (
                                <div>
                                    <button onClick={disabledTwoFactor} className="button_small">Disable 2FA</button>
                                </div>
                            ) : (
                                <div>
                                    <button onClick={enableTwoFactor} className="button_small">Enable 2FA</button>

                                    {verifyTwoBody === true && (
                                        <div>
                                            <hr />
                                            <div style={{ textAlign: "center" }}><QRCode value={qrcode} /></div>
                                            <br/>
                                            
                                            <form onSubmit={verifyQrCode}>
                                                <label htmlFor="" style={{ textAlign: "center", fontSize: "13px", fontWeight: "bold" }}>OTP Token from Hardware</label>
                                                <input type="text" 
                                                value={otptoken}
                                                onChange={(e) => setOtpToken(e.target.value)}
                                                className="inputBox" required/>
                                                <p/>
                                                <button className="button">Verify</button>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            )}

                            <p>
                                <button className="button" onClick={logout}>Logout</button>
                            </p>
                        </div>


                    ) : 'Loading...'}
                </div>
            </div>
        )
    }
}
 
export default Dashboard;