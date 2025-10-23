import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { postApi } from '../components/api';

export default function ForgetPassword() {

    const [pending,setpending] = useState(false)
    const navigate = useNavigate()
    

    const handleForm = async (e)=>{
        try{
        setpending(true)
        e.preventDefault();
        const formData = new FormData(e.target)
        const email = formData.get("email")
        const endpoint = "forgetpassword/"
        const payload = {email:email}
        let res = await postApi(endpoint,payload)
        if (res?.message){
            navigate("/VerifyCode", { state:{ email: email } })
        }
    }catch(e){
        console.log(e)
    }
    finally{
        setpending(false)
    }
    }
    

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <main className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10">
                <header className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-full">
                        <Lock className="w-6 h-6 text-slate-700" />
                    </div>


                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">
                            Forgot your password?
                        </h1>
                        
                    </div>
                </header>


                <form className="space-y-6" onSubmit={handleForm}  aria-describedby="desc">
                    <p id="desc" className="text-sm text-slate-500">
                        A password will be sent to the email associated with your account.
                        The password will expires after a short time.
                    </p>


                    <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@domain.com"
                            required
                            className="block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                        />
                    </div>


                    <div className="grid gap-2">
                        <button
                            type="submit"
                            className={["w-full inline-flex items-center justify-center rounded-lg  text-white px-4 py-3 text-sm font-medium shadow-sm ",
                                `${pending?"bg-slate-300 ":"cursor-pointer bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"}`
                            ].join(" ")}
                        >
                            Send reset Password
                        </button>


                        <Link
                            to='/signin'
                            type="button"
                            className="w-full inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 px-4 py-3 text-sm font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
                        >
                            Back to sign in
                        </Link>
                    </div>
                </form>


                <footer className="mt-6 text-center text-sm text-slate-400">
                    <p>
                        Didn't receive the email? Check your spam folder or try again in a
                        few minutes.
                    </p>
                </footer>
            </main>
        </div>
    );
}