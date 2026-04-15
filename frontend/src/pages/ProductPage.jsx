import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import api from "../services/api";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [review, setReview] = useState({ rating: 5, comment: "" });

  const load = async () => {
    const { data } = await api.get(`/products/${id}`);
    setProduct(data);
  };
  useEffect(() => { load(); }, [id]);

  const submitReview = async (e) => {
    e.preventDefault();
    await api.post(`/products/${id}/reviews`, review);
    toast.success("Review saved");
    setReview({ rating: 5, comment: "" });
    load();
  };

  if (!product) return <div>Loading...</div>;
  return (
    <div className="page">
      <Navbar search={search} setSearch={setSearch} />
      <div className="card">
        <img src={product.image || "https://via.placeholder.com/250x160"} alt={product.name} />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Rs. {product.price}</p>
      </div>
      <form className="card form" onSubmit={submitReview}>
        <h3>Add Review</h3>
        <input type="number" min="1" max="5" value={review.rating} onChange={(e) => setReview({ ...review, rating: e.target.value })} />
        <input value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })} placeholder="Comment" />
        <button className="btn">Submit</button>
      </form>
      <div className="card">
        <h3>Reviews</h3>
        {product.reviews?.map((r) => <p key={r._id}>{r.rating}/5 - {r.comment}</p>)}
      </div>
    </div>
  );
};

export default ProductPage;
