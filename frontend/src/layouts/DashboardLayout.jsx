import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function DashboardLayout() {
    return (
        <div>
            <Navbar />
            <div className="pt-16">
                <Outlet />
            </div>
        </div>
    );
}