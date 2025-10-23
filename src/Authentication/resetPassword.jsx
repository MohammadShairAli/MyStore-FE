import React, { useState } from "react";
import { postApi } from "../components/api";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const location = useLocation();
    const { email } = location.state || {};
    const navigate = useNavigate();
    const [pending,setpending] = useState(false)

    const handleForm = async(e)=>{
        try{
        e.preventDefault();
        setpending(true)
        const formData = new FormData(e.target)
        const new_password = formData.get("new_password")
        const confirm_password = formData.get("confirm_password")
        if (new_password != confirm_password){
            console.log("error")
            return
        }
        const endpoint = "resetPassword/"
        const payload = {email:email,password:new_password}
        const res = await postApi(endpoint,payload)
        if (res?.message){
            navigate("/signin")
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
            Reset Password
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Enter your new password below.
          </p>
        </header>

        <form className="space-y-6" onSubmit={handleForm} >
          <div>
            <label
              htmlFor="new_password"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              New Password
            </label>
            <input
              id="new_password"
              name="new_password"
              type="password"
              placeholder="Enter new password"
              required
              className="block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>

          <div>
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="Confirm password"
              required
              className="block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>

          <button
            type="submit"
            className={["w-full mt-6 inline-flex items-center justify-center rounded-lg text-white px-4 py-3 text-sm font-medium shadow-sm ",
                `${pending?"bg-slate-300":"cursor-pointer bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"}`
            ].join(" ")}
          >
            Reset Password
          </button>
        </form>
      </main>
    </div>
  );
};

export default ResetPassword;
