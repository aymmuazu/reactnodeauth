import { Link } from "react-router-dom";

const Home = () => {
    return ( 
        <div className="home">
            <h2 style={{ textAlign: "center" }}>Authentication System <br></br> (ReactJS & NodeJS)</h2>
            <p className="box">
                Multi-Factor consisting:
                <ol style={{padding: "10px;"}}>
                    <li>Knowledge Based Authentication</li>
                    <li>Possession Factor (2FA Tokens)</li>
                    <li>Google SignIn Authentication</li>
                    <li>Email Authentication</li>
                </ol>
            </p>
            <p></p>
            <Link to="/login" className="link">Login</Link>
            <p></p>
            <Link to="/register" className="link">Register</Link>
        </div>
     );
}
 
export default Home;