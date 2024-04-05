import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

const Register = () => {

    const title = "Register";

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [])

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');

    const [warningmessage, setWarningMessage] = useState('');
    const [warning, setWarning] = useState(false);

    const [successmessage, setSuccessMessage] = useState('');
    const [success, setSuccess] = useState(false);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [btnmessage, setBtnMessage] = useState('Register')

    const handClick = async (event) => {
        event.preventDefault();
        setBtnMessage('Processing...')

        if (first_name == '' || last_name == '' || email == '' || password == '') {
            setWarning(true)
            setWarningMessage('All fields are required.')
            setTimeout(() => {
                setWarning(false)
            }, 1000);
            setBtnMessage('Register')
        }
        else{
            const data = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password
            }
            try {
                const response  = await axios.post('http://localhost:8000/api/register', data, {
                    headers: {
                        Accept: 'application/json'
                    }
                });
                setWarning(false)
                setSuccess(true)
                setSuccessMessage(response.data.message)
                setBtnMessage('Register')

                setTimeout(() => {
                    navigate('/login');
                }, 1000);

            } catch (error) {
                setSuccess(false);
                setWarning(true);
                setWarningMessage('Something went wrong.')
                setBtnMessage('Register')
            }

        }
        
    }

    return ( 
        <div className="home">
            <Header title={title} />
            
            { warning && <div className="warning">{warningmessage}</div> }
            { success && <div className="success">{successmessage}</div> }

            <div className="box">
                <div style={{ textAlign: "center", fontWeight: "bold" }} >Registration System</div>
                <form style={{marginTop: "20px"}}>
                    <div>
                        <div style={{ fontSize: "13px", fontWeight: "bold" }}>First Name</div>
                        <input type="text" 
                            value={first_name} 
                            onChange={(event) => setFirstName(event.target.value)} 
                            className="inputBox" />
                    </div>
                    <div style={{marginTop: "10px"}}>
                        <div style={{ fontSize: "13px", fontWeight: "bold" }}>Last Name</div>
                        <input type="text" 
                        value={last_name} 
                        onChange={(event) => setLastName(event.target.value)} 
                         className="inputBox" />
                    </div>

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

                     <div style={{marginTop: "10px"}}>
                       <button className="button" onClick={handClick}>{ btnmessage }</button>
                    </div>
                </form>
                <p></p>
                <div style={{ textAlign: "center", fontSize: "12px" }} >Already have an account ? <Link to="/login">Login</Link></div>
            </div>

        </div>
     );
}
 
export default Register;