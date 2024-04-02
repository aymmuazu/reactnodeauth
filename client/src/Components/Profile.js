import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EditProfile = () => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [btnmessage, setbtnmessage] = useState('Update Profile');
    const [finisheProfileUpdate, setFinishProfileUpdate] = useState(false);
    const [warningmessage, setWarningMessage] = useState('');
    const [warning, setWarning] = useState(false);

    const [successmessage, setSuccessMessage] = useState('');
    const [success, setSuccess] = useState(false);


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
                    setFirstName(response.data.first_name);
                    setLastName(response.data.last_name);
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
    }, [finisheProfileUpdate])
    
    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        setbtnmessage('Processing...');

        if (first_name == '' || last_name == '') {
            setWarning(true)
            setWarningMessage('All fields are required.')
            return;
        }
        else{

            try {

                const token = localStorage.getItem('token');

                const data = {
                    first_name: first_name,
                    last_name: last_name
                }
                
                const response  = await axios.post('http://localhost:8000/api/dashboard/profile', data, {
                    headers: {
                        Authorization: token,
                        Accept: 'application/json'
                    }
                })

                setFinishProfileUpdate(true);
                setbtnmessage('Update Profile')
                setSuccess(true)
                setSuccessMessage('Profile Updated Successful')

            } catch (error) {
                setWarning(true)
                setWarningMessage('Something went wrong.')
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
                            { warning && <div className="warning">{warningmessage}</div> }
                            { success && <div className="success">{successmessage}</div> }
                           
                            <strong>Dashboard - {userData.first_name}!</strong>

                            <p></p>

                            <Link to="/dashboard" className="button_small_sm">Back</Link>
                                
                            <h3>Edit Profile</h3>
                            
                            <form onSubmit={handleUpdateProfile}>
                                <div className="">
                                    <div style={{ fontSize: "13px", fontWeight: "bold" }}>First Name</div>
                                    <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} className="inputBox" required />
                                </div>

                                <div style={{marginTop: "8px"}}>
                                    <div style={{ fontSize: "13px", fontWeight: "bold" }}>Last Name</div>
                                    <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} className="inputBox" required/>
                                </div>

                                <div style={{marginTop: "8px"}}>
                                    <button className="button" type="submit">{btnmessage}</button>
                                </div>

                            </form>
                
                            <p>
                                <button className="button" onClick={logout}>Logout</button>
                            </p>
                        </div>


                    ) : 'Loading...'}
                </div>
            </div>
        );
    }
}
 
export default EditProfile;