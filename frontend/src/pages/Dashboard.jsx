import { useAuth } from "../context/AuthContext.jsx"
export default function Dashboard() {
    const { user } = useAuth()
    return (
        <>
            {user ?
                <>
                    <div className="p-6 mt-6">
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="mt-2 text-gray-400">Welcome back, {user.name}</p>
                    </div>
                    <div className="mt-6 p-4 rounded-lg border max-w-sm">
                        <p className="font-semibold">Profile Completion</p>
                        <p className="text-2xl font-bold">0%</p>
                    </div>
                </>

                :
                <p>User Not Found</p>
            }
        </>

    )
}