import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { getAPI, postApi } from "./api";
import { useParams,useLocation, useNavigate } from "react-router-dom";
import { convertTime } from "./convertTime";

export default function ProductDetail() {

const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const [productDetails, setProductDetails] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);
  const scrollRef = useRef(null);
  const [pending,setpending] = useState(false)
  // Fetch product details
  useEffect(() => {
    async function handleProfileDetails() {
      const endpoint = "productDetails/";
      const payload = { id: id };
      const res = await postApi(endpoint, payload);
      setProductDetails(res?.data || {});
    }
    if (id) handleProfileDetails();
  }, [id]);

  async function handleDelete(){
    try{
      setpending(true)
      const endpoint = "productDelete/";
      const param = id;
      console.log(id)
      const res = await getAPI(endpoint, param);
      console.log("res?.message : ",res?.message)
      if (res?.message){
        navigate("/")
      }
    }catch(e){
      console.log(e)
    }finally{
      setpending(false)
    }
  }

  const photoUrl = (() => {
  if (productDetails?.profile?.photo) {
    try {
      const arr = JSON.parse(productDetails?.profile?.photo.replace(/'/g, '"'));
      return Array.isArray(arr) ? arr[0] : productDetails?.profile?.photo;
    } catch {
      // Fallback if it's already a plain URL
      return productDetails?.profile?.photo;
    }
  }
  return null;
})();

  // Normalize images array
  const imagesArray = Array.isArray(productDetails?.images)
    ? productDetails.images
    : productDetails?.images
    ? JSON.parse(productDetails.images.replace(/'/g, '"'))
    : [];

  // Carousel scroll
  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  // Modal image navigation
  const prevImage = () => {
    if (imagesArray.length === 0) return;
    setSelectedIndex((i) => (i > 0 ? i - 1 : imagesArray.length - 1));
  };

  const nextImage = () => {
    if (imagesArray.length === 0) return;
    setSelectedIndex((i) => (i < imagesArray.length - 1 ? i + 1 : 0));
  };

  const closeModal = () => setSelectedIndex(null);



  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-xl p-8 md:p-10">
        {/* Product Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              {productDetails?.name}
            </h1>
            <p className="text-slate-500 text-sm">
              Uploaded on {convertTime(productDetails?.date_upload)}
            </p>
          </div>
          <span className="space-x-2 space-y-5">
            {state?.myproduct && <button
            onClick={handleDelete}

  className={["text-white text-sm font-semibold px-4 py-2 rounded-full transition duration-200",
    `${pending?"bg-red-300":"cursor-pointer bg-red-600 hover:bg-red-700 "}`
  ]}
>
  Delete
</button>}

          <span
            className={`mt-4 md:mt-0 px-4 py-2 text-sm font-medium rounded-full ${
              productDetails?.type?.toLowerCase() === "rent"
                ? "bg-slate-100 text-slate-800"
                : "bg-slate-800 text-white"
            }`}
          >
            {productDetails?.type}
          </span>
          </span>
          
        </div>

        {/* Image Carousel */}
        <div className="relative mb-10">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 shadow-lg rounded-full p-2 hover:bg-slate-100 z-10"
          >
            <ChevronLeft className="text-slate-700 w-6 h-6" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {imagesArray.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedIndex(i)}
                alt="Product"
                className="rounded-2xl border border-slate-200 object-cover w-72 h-52 cursor-pointer flex-shrink-0 hover:opacity-90 transition"
              />
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 shadow-lg rounded-full p-2 hover:bg-slate-100 z-10"
          >
            <ChevronRight className="text-slate-700 w-6 h-6" />
          </button>
        </div>

        {/* Product Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">
              Description
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {productDetails?.description}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-500 text-sm">Price</span>
              <span className="text-2xl font-bold text-slate-800">
                ${productDetails?.type?.toLowerCase() === "rent"
                  ? `${productDetails?.price}/Day`
                  : productDetails?.price}
              </span>
            </div>
            <div className="h-px bg-slate-200 my-4" />
            <div className="text-slate-600 text-sm">
              <p>
                <span className="font-medium text-slate-700">Uploaded:</span>{" "}
                {convertTime(productDetails?.date_upload)}
              </p>
              <p>
                <span className="font-medium text-slate-700">Category:</span>{" "}
                {productDetails?.type}
              </p>
            </div>
          </div>
        </div>

        {/* Seller Info */}
        <div className="mt-12 bg-slate-100 border border-slate-200 rounded-2xl p-6 flex items-center gap-6 shadow-inner">
          <img
            src={photoUrl}
            alt="Seller"
            className="w-20 h-20 rounded-full border-2 border-slate-300 object-cover"
            onError={(e) => (e.target.src = "https://via.placeholder.com/80")}
          />
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-1">
              {productDetails?.profile?.user?.username}
            </h2>
            <p className="text-slate-500 text-sm">
              {productDetails?.profile?.user?.email}
            </p>
            <div className="text-slate-600 text-sm mt-2">
              <p>Age: {productDetails?.profile?.age}</p>
              <p>Phone: {productDetails?.profile?.number}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 bg-white/90 p-2 rounded-full hover:bg-slate-100"
          >
            <X className="w-6 h-6 text-slate-700" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-8 bg-white/70 hover:bg-white/90 rounded-full p-3"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>

          <img
            src={imagesArray[selectedIndex]}
            alt="Zoomed"
            className="rounded-2xl max-h-[85vh] max-w-[90vw] object-contain shadow-lg"
          />

          <button
            onClick={nextImage}
            className="absolute right-8 bg-white/70 hover:bg-white/90 rounded-full p-3"
          >
            <ChevronRight className="w-6 h-6 text-slate-700" />
          </button>
        </div>
      )}
    </div>
  );
}
