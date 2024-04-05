const Header = (props) => {

    const title = props.title;

    return ( 
        <div>
            <h2 style={{ textAlign: "center" }}>Authentication System - {title}</h2>
        </div>
     );
}
 
export default Header;