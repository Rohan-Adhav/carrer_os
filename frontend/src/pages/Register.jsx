import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function Register() {

    const [form, setForm] = useState({
        name: "", email: "", password: "", confirmPassword: ""
    })

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm({
            ...form, [name]: value
        })

        setError((prev) => ({
            ...prev,
            [name]: ""
        }))
    }

    const validate = () => {
        const newErrors = {};

        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        if (!form.password) newErrors.password = "Password is required";
        if (!form.confirmPassword) newErrors.confirmPassword = "Confirm password is required";

        if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({})

        const newErrors = validate()

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors)
            return
        }

        try {
            setLoading(true)

            console.log("Register Data: ", form)

            setForm({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            })

        } catch (err) {
            setError({
                general: err?.response?.data?.message || "Registration Failed"
            })
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0b0f1a] px-4 sm:px-6 lg:px-8 relative overflow-hidden">

            <div className="absolute w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-purple-600 rounded-full blur-[140px] opacity-30 top-[-120px] left-[-120px]" />
            <div className="absolute w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-500 rounded-full blur-[140px] opacity-30 bottom-[-140px] right-[-140px]" />

            <div className="relative w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">

                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
                    Create Account
                </h2>

                <p className="text-center text-gray-300 text-sm sm:text-base mt-2">
                    Join Carrer Os
                </p>

                {error.general && (
                    <div className="mt-4 bg-red-500/20 border border-red-400 text-red-200 text-sm px-3 py-2 rounded-lg">
                        {error.general}
                    </div>
                )}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4">

                    <Input
                        label="Name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        autoComplete="name"
                        error={error.name}
                    />

                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="johndoe@gmail.com"
                        required
                        autoComplete="email"
                        error={error.email}
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="******"
                        required
                        error={error.password}
                    />

                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="******"
                        required
                        error={error.confirmPassword}
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                        loading={loading}
                    >
                        Register
                    </Button>

                </form>
                <p className="text-center text-gray-400 text-sm mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-purple-400 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}