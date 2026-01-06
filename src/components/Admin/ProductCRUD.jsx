import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function ProductCRUD() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();  // Added errors for validation

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      setProducts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Error loading products—check console.');
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), data);
        setEditingId(null);
        alert('Product updated!');
      } else {
        await addDoc(collection(db, 'products'), data);
        alert('Product added!');
      }
      reset();
      fetchProducts();
    } catch (error) {
      console.error('Submit error:', error);
      alert(`Add failed: ${error.message}`);  // Shows exact Firestore error
    }
  };

  const handleEdit = (product) => {
    reset(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      fetchProducts();
      alert('Product deleted!');
    } catch (error) {
      console.error('Delete error:', error);
      alert(`Delete failed: ${error.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl mb-4">Admin: Manage Products</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <div>
          <input 
            {...register('name', { required: 'Name is required' })} 
            placeholder="Product Name" 
            className="w-full p-2 border" 
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <textarea 
            {...register('description', { required: 'Description is required' })} 
            placeholder="Description" 
            className="w-full p-2 border" 
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <div>
          <input 
            {...register('price', { required: 'Price is required', min: { value: 0, message: 'Price must be positive' }})} 
            type="number" 
            placeholder="Price" 
            className="w-full p-2 border" 
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-green-600 font-semibold">${product.price}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}