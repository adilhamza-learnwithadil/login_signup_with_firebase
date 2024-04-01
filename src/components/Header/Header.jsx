import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div className="text-center py-6 bg-[#6c81f821]">
            <NavLink to='/' className="text-xl text-center mr-5">Home</NavLink>
            <NavLink to='/login' className="text-xl text-center mr-5">Login</NavLink>
            <NavLink to='/signup' className="text-xl text-center mr-5">SignUp</NavLink>
            <NavLink to='/login-with-others' className="text-xl text-center">Login with others</NavLink>
        </div>
    );
};

export default Header;