import { useState } from "react";
import { getAPI } from "../components/api";

export default function SearchBar({setProducts}) {
  const [pending,setPending] = useState(false)

  const handleForm  = async(e)=>{
    try{
    setPending(true)
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const filter = formData.get("filter")
    const query = formData.get("query")
    const price = formData.get("price")
    const endpoint = "getProducts"   

    let param = new URLSearchParams();
    param.append("filter", filter);
    param.append("query", query);
    param.append("price", price);

    const res = await getAPI(endpoint,param)
    
    setProducts(res)
    }catch(e){
      console.log(e)
    }finally{
      setPending(false)
  }
  }

return (
  <form
    onSubmit={handleForm}
    className="bg-slate-100 w-full py-4 shadow-sm border-b border-slate-200"
  >
    <div
      className="max-w-5xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center 
                 justify-center gap-3 px-4 sm:gap-4"
    >
      {/* Price Filter */}
      <select
        name="price"
        id="price"
        onChange={(e) => e.target.form.requestSubmit()}
        className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 
                   focus:bg-white text-slate-700 text-sm focus:outline-none 
                   focus:ring-2 focus:ring-slate-400 transition"
      >
        <option value="">Any Price</option>
        <option value="10">Under 10k</option>
        <option value="20">Under 20k</option>
        <option value="50">Under 50k</option>
        <option value="100">Under 100k</option>
      </select>

      {/* Time Filter */}
      <select
        name="filter"
        id="filter"
        onChange={(e) => e.target.form.requestSubmit()}
        className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 
                   focus:bg-white text-slate-700 text-sm focus:outline-none 
                   focus:ring-2 focus:ring-slate-400 transition"
      >
        <option value="">Any Time</option>
        <option value="1h">1 Hour</option>
        <option value="1d">1 Day</option>
        <option value="1w">1 Week</option>
        <option value="1m">1 Month</option>
      </select>

      {/* Search Input */}
      <input
        name="query"
        id="query"
        type="text"
        placeholder="Search..."
        className="w-full sm:flex-1 min-w-[180px] px-4 py-2.5 rounded-xl border border-slate-300 
                   focus:outline-none focus:ring-2 focus:ring-slate-400 
                   text-slate-800 placeholder-slate-400 transition"
      />

      {/* Button */}
      <button
        id = "submitForm"
        type="submit"
        className={[
          "w-full sm:w-auto px-6 py-2.5 rounded-xl text-white font-semibold active:scale-95 transition-all",
          `${pending ? "bg-slate-300" : "cursor-pointer bg-slate-800 hover:bg-slate-700"}`,
        ].join(" ")}
      >
        Search
      </button>

    </div>
  </form>
);

}
