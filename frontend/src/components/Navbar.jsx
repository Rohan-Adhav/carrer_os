import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";


export default function Navbar() {

    const baseLink =
        "relative text-sm font-medium transition-colors duration-200";
    
    const navigate = useNavigate()

    const {logout} = useAuth()

    const handleLogout =async()=>{
        await logout()
        navigate("/login")

    }

    const underlineBase =
        "absolute left-0 -bottom-1 h-[2px] w-full origin-left transition-transform duration-300 bg-gradient-to-r from-purple-500 to-blue-500";

    const getLinkClass = ({ isActive }) =>
        `${baseLink} ${
            isActive ? "text-white" : "text-gray-400 hover:text-white"
        }`;

    const renderLink = (to, label) => (
        <NavLink to={to} className={getLinkClass}>
            {({ isActive }) => (
                <span
                    className="group relative"
                    aria-current={isActive ? "page" : undefined}
                >
                    {label}

                    <span
                        className={`${underlineBase} ${
                            isActive
                                ? "scale-x-100"
                                : "scale-x-0 group-hover:scale-x-100"
                        }`}
                    />
                </span>
            )}
        </NavLink>
    );

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 z-50 bg-[#0b0f1a]/80 backdrop-blur-xl border-b border-white/10">

            <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">

                {/* LEFT - Logo */}
                <Link
                    to="/dashboard"
                    className="flex items-center gap-2 hover:opacity-90 transition"
                >
                    <img
                        src="/career.svg"
                        alt="CareerOS Logo"
                        className="h-8 w-8"
                    />
                    <h1 className="text-white font-bold text-lg tracking-wide">
                        CareerOS
                    </h1>
                </Link>

                {/* CENTER - Navigation */}
                <ul className="flex items-center gap-10">
                    <li>{renderLink("/dashboard", "Dashboard")}</li>
                    <li>{renderLink("/jobs", "Jobs")}</li>
                </ul>

                {/* RIGHT - Logout */}
                <button
                    className="
                        text-sm font-semibold px-5 py-2 rounded-lg
                        text-red-400
                        border border-red-500/20
                        bg-white/5
                        hover:bg-red-500/10 hover:text-red-300
                        hover:border-red-400/30
                        transition-all duration-200
                        active:scale-95
                        backdrop-blur-md
                    "
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>
        </nav>
    );
}