import { Link } from "react-router-dom";
import Header from "./Header";
import CustomPageTitle from "./CustomPageTitle";

const Home = () => {

    const title = "Home";

    return ( 
        <div className="home">
            <CustomPageTitle title="Authentication - Home" />
            <Header title={title} />
            <div className="box">
                Multi-Factor consisting:
                <ol style={{padding: "10px"}}>
                    <li>Knowledge Based Authentication</li>
                    <li>Possession Factor (2FA Tokens)</li>
                    <li>Google SignIn Authentication</li>
                    <li>Email Authentication</li>
                </ol>
            </div>
            <p></p>
            <Link to="/login" className="link">Login</Link>
            <p></p>
            <Link to="/register" className="link">Register</Link>
        </div>
     );
}
 
export default Home;