import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postApi } from "../components/api";

const VerifyCode = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || {};
    const inputsRef = useRef([]);
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [pending,setpending] = useState(false)

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]?$/.test(value)) {
            // update the code state
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // move to next input
            if (value && index < 5) {
                inputsRef.current[index + 1].focus();
            }
        }
    };

    const handleResend = async () => {
        try{
        setpending(true)
        const endpoint = "forgetpassword/"
        const payload = { email: email }
        let res = await postApi(endpoint, payload)
        if (res?.message) {
            navigate("/VerifyCode", { state: { email: email } })
        }}catch(e){
            console.log(e)
        }finally{
            setpending(false)
        }
    }

    const handleForm = async(e) => {
        try{
        e.preventDefault();
        setpending(true)
        const fullCode = code.join("");
        const endpoint = "verifyOTP/"
        const payload = { email: email, code: fullCode }
        const res =await postApi(endpoint, payload)
        if (res.message) {
            navigate('/ResetPassword',{ state: { email: email } })
        }}catch(e){
            console.log(e)
        }finally{
            setpending(false)
        }

    }


    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <main className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10">
                <header className="mb-6 text-center">
                    <h1 className="text-2xl font-semibold text-slate-900">
                        Enter Verification Code
                    </h1>
                    <p className="text-sm text-slate-500 mt-2">
                        We have sent a 6-digit code to your email. Enter it below to reset
                        your password.
                    </p>
                </header>

                <form className="space-y-6" onSubmit={handleForm}>
                    <div className="flex justify-between gap-2">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                ref={(el) => (inputsRef.current[index] = el)}
                                onChange={(e) => handleChange(e, index)}
                                className="w-12 h-12 text-center text-xl border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className={["w-full mt-6 inline-flex items-center justify-center rounded-lg text-white px-4 py-3 text-sm font-medium shadow-sm ",
                            `${pending?"bg-slate-300":"bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"}`
                        ].join(" ")}
                    >
                        Verify Code
                    </button>
                </form>

                <footer className="mt-6 text-center text-sm text-slate-400">
                    <p>
                        Didn't receive the code?{" "}
                        <button onClick={handleResend} className={`${pending?"text-slate-300":"text-slate-900 hover:underline cursor-pointer"}`}>Resend</button>
                    </p>
                </footer>
            </main>
        </div>
    );
};

export default VerifyCode;
