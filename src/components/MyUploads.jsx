import { useEffect, useState } from "react"
import { getAPI } from "./api"
import { Link } from "react-router-dom"
import ProductCard from "../Dashboard/ProductCard"

export default function MyUploads(){

    const [Products,setProducts] = useState([])
      useEffect(()=>{
        async function getProducts(){
          const endpoint = 'MyUploads/'
          const res = await getAPI(endpoint)
          setProducts(res)
        }
        getProducts()
      },[])

    return(
        <>
        <h1 className="text-center mt-5  text-2xl font-bold">My Profile</h1>
        <div className="flex flex-wrap justify-center gap-6 py-6 ">
        {Products?.map((product) => (
          <Link to={`/ProductDetail/${product.id}`} state={{myproduct:true}} key={product.id} className="flex-shrink-0 block hover:scale-105 transition-transform duration-200">
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
        </>
    )
}