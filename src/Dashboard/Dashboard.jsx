import Navbar from "../components/Navbar"
import SearchBar from "./SearchBar"
// import { products } from './DummyProduct'
import ProductCard from "./ProductCard"
import { useEffect, useState } from "react"
import { getAPI } from "../components/api"
import { Link } from "react-router-dom"
// import { useEffect } from "react"


export default function Dashboard() {
   const [Products,setProducts] = useState([])
  useEffect(()=>{
    async function getProducts(){
      const endpoint = 'getProducts/'
      const res = await getAPI(endpoint)
      console.log("res")
      setProducts(res)
    }
    getProducts()
  },[])

  return (
    <>
      <SearchBar setProducts={setProducts}/>

      <div className="flex flex-wrap justify-center gap-6 py-6 ">
        {Products?.map((product) => (
          
          <Link to={`/ProductDetail/${product.id}`} state={{myproduct:false}} key={product.id} className="flex-shrink-0 block hover:scale-105 transition-transform duration-200">
            <ProductCard product={product} />
          </Link>
        ))}
      </div>

    </>
  )
}