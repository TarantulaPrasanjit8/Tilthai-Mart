import { useEffect, useState } from "react";
import { addProduct, getProducts, updateProduct, errMsg } from "../api";


export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({product_name:"", marchant_name:"", description:"", price:"", tax:"", discount:"", is_available: null, category: ""});
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  // Loads Products from the server
  const load = async () => {
    try { setProducts((await getProducts()).data); }
    catch (e) { setError(errMsg(e)); }
    finally{ setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  
  // page loader
  if (loading && products.length === 0) {
    return <div>Loading products...</div>;
  }

  const productList = Object.values(products)
  // console.log(productList)


  // sets form data(text)
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  // reset the form fields to default
  const reset = () => { 
    setForm({}); 
    setEditingId(null); 
  };


  // handle submit of form alongwith image file
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); 
    setError("");

    const formData = new FormData(e.target);
    // const payload = { ...form, price: Number(form.price), is_available: Boolean(form.is_available) };
    try {
      if (editingId) {
        const { data } = await updateProduct(editingId, formData);
        // setProducts((l) => l.map((p) => (p._id === editingId ? data : p)));
        load()
        setSuccessMsg(data);
        console.log(successMsg)
      } else {
        const { data } = await addProduct(formData);
        load()
      }
      reset();
    } catch (err) { 
      if (err.response && err.response.data) {
        errMsg(err.response.data.error)
        setError(err.response.data.error); // Save to React state
  } }
    finally { setBusy(false); }
  };

  // handles update of a product's info
  const edit = (p) => {
    setEditingId(p.id);
    setForm({ product_name: p.product_name, price: p.price, category: p.category, description: p.description, tax: p.tax, discount: p.discount, marchant_name: p.marchant_name, is_available: p.is_available});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // console.log(form)
  // Delete a product from the server 
  // const remove = async (p) => {
  //   if (!window.confirm(`Delete "${p.name}"?`)) return;
  //   try { 
  //     await deleteProduct(p.id); 
  //     if (editingId === p.id) reset(); 
  //   }
  //   catch (err) { 
  //     setError(errMsg(err)); 
  //   }
  // };

  return (
    <>
      <header className="head"><h2>Products</h2></header>
      <form className="card form" onSubmit={submit}>
        <h3>{editingId ? "Edit product" : "Add product"}</h3>
        <div className="grid">
          <label>Product Name <span className="error">*</span><input name="product_name" required value={!form.product_name?"":form.product_name} onChange={set("product_name")}/></label>
          <label>Price (Rs) <span className="error">*</span><input name="price" required type="number" min="0" step="0.1" value={!form.price? "":form.price} onChange={set("price")} /></label>
          <label>Category <span className="error">*</span>
            <select name="category" value={!form.category?"":form.category} onChange={set("category")} required>
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Grocery">Grocery</option>
              <option value="Raw Items">Raw Items</option>
              <option value="Desserts">Desserts</option>
              <option value="Beverages">Beverages</option>
              <option value="Decorations">Decorations</option>
              <option value="Raw Fish & Meat">Raw Fish & Meat</option>
              <option value="Raw Vegetables">Raw Vegetables</option>
            </select>
          </label>
          <label>Image URL<input type="file" name="image" value={form.image} placeholder="https://..." /></label>
          <label>Marchant Name<input name="marchant_name" value={!form.marchant_name?"":form.marchant_name} onChange={set("marchant_name")} placeholder="Restaurant Name" /></label>
          <label>GST<input type="text" name="tax" value={!form.tax?"":form.tax} onChange={set("tax")} placeholder="18% GST" /></label>
          <label>Discount<input name="discount" value={!form.discount? "": form.discount} onChange={set("discount")} placeholder="Discount 20%" /></label>
          <label>Availability
            <select name="is_available" id="is_available" value={form.is_available? form.is_available: ""} onChange={set("is_available")} required>
              <option>Is it available to serve?</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </label>
        </div>
        <label>Description<textarea name="description" rows="2" value={!form.description?"":form.description} onChange={set("description")}/></label>
        {error && <p className="error">{error}</p>}
        {/* { successMsg && <p className="success-msg">{successMsg}</p>} */}
        <div className="actions">
          <button className="btn primary" disabled={busy}>{editingId ? "Save changes" : "Add product"}</button>
          {editingId && <button type="button" className="btn ghost" onClick={reset}>Cancel edit</button>}
        </div>
      </form>

      {!productList.length && <p className="muted">No products listed yet. Add your first dish above.</p>}
      <div className="products">
        {productList[1].map((p) => (
          <article className="card product" key={p.id}>
            {p.image_url? <img src={p.image_url} alt={p.product_name} /> : <div className="noimg">No image</div>}
            <h3>{p.product_name}</h3>
            <p className="muted">{p.marchant_name}</p>
            {/* <p>{p.is_available}</p> */}
            <div className="row"><strong>Rs {p.price}</strong>
              <span className="actions">
                <button className="btn ghost" onClick={() => edit(p)}>Edit</button>
              </span>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
