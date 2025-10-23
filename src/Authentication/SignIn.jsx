import { Mail, Lock, User, Phone } from 'lucide-react';
import { useActionState } from 'react';
import { postApi } from "../components/api"
import { Link, useNavigate } from "react-router-dom"

export default function SignIn() {
    const navigate = useNavigate();

    const handleForm = async (_, formdata) => {
        const email = formdata.get("email")
        const password = formdata.get("password")
        if (!email | !password) {
            return { error: "All fields are required", email: email, password: password }
        }
        const endpoint = "signin/"
        const payload = { email: email, password: password }
        const res = await postApi(endpoint, payload)
        if (res?.message) {
            localStorage.setItem("token", res.access_token);

            navigate('/')
        } else {
            res["email"] = email
            res["password"] = password
            return res
        }
    }
    const [data, action, pending] = useActionState(handleForm, undefined)

    return (
        <>
            <div className="flex ">
                {/* Left Side */}
                <div className="flex flex-1 flex-col justify-center px-6 py-12 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
                    {/* Background Animation */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-20 -left-20 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-slate-300/40 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-slate-200/30 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center">
                        <div className="mx-auto w-16 h-16 mb-8 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-600 rounded-2xl blur-lg opacity-40 animate-pulse"></div>
                            <div className="relative bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-2xl p-3 shadow-2xl transform hover:scale-110 transition-transform duration-300">
                                <Link to="/"> <User className="w-full h-full text-white" /> </Link>
                            </div>
                        </div>

                        <h2 className="text-4xl font-black text-slate-900 mb-2">Welcome Back</h2>
                        <p className="text-slate-600 text-sm">We hope you are well</p>
                    </div>
                </div>

                {/* Right Side */}
                <form action={action} className="min-h-screen flex-1 flex items-center justify-center px-10 py-5">
                    <div className="w-full max-w-md relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-slate-300 to-slate-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>

                        <div className="relative bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">

                            {/* Email */}
                            <div className='my-5'>
                                <label htmlFor="email" className="block text-sm font-semibold text-slate-800 mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data?.email}
                                    placeholder="you@example.com"
                                    className={["w-full rounded-xl border px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 outline-none transition-all hover:border-slate-400",
                                        `${data?.error ? "border-red-500 bg-red-50" : "border-slate-300 bg-slate-50"}`
                                    ].join(" ")}
                                />
                            </div>

                            {/* Password */}
                            <div className='my-5'>
                                <label htmlFor="password" className="block text-sm font-semibold text-slate-800 mb-2">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data?.password}
                                    placeholder="Enter your password"
                                    className={["w-full rounded-xl border px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 outline-none transition-all hover:border-slate-400",
                                        `${data?.error ? "border-red-500 bg-red-50" : "border-slate-300 bg-slate-50"}`
                                    ].join(" ")}
                                />
                            </div>

                            <Link
                                to="/ForgetPassword"
                                className="text-sm text-slate-700 hover:text-slate-900 hover:underline transition-colors duration-200 font-medium flex justify-end my-1"
                            >
                                Forgot Password?
                            </Link>

                            <div className="">
                                <button
                                    type="submit"
                                    // disabled={pending}
                                    className={['w-full rounded-xl px-4 py-3.5 text-sm font-bold text-white transition-all transform  shadow-lg',
                                        pending
                                            ? 'bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200' :
                                            'cursor-pointer bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 hover:from-slate-600 hover:via-slate-700 hover:to-slate-800 hover:scale-105 hover:shadow-2xl'

                                    ].join(" ")}
                                >
                                    Login
                                </button>
                            </div>

                            <p className="mt-6 text-center text-sm text-slate-600">
                                Already have an account?{" "}
                                <Link to="/signup" className="font-semibold text-slate-800 hover:text-slate-600 transition-colors duration-200">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>

                <style jsx="true">{`
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `}</style>
            </div>

        </>
    )
}