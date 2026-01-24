import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

export default function ImageCRUD() {
  const [designs, setDesigns] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching designs from Firestore...');
      const querySnapshot = await getDocs(collection(db, 'images'));
      
      if (!querySnapshot || !querySnapshot.docs) {
        throw new Error('Invalid Firestore response - check rules/config');
      }
      
      const fetchedDesigns = querySnapshot.docs.map((doc) => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      
      console.log('Fetched designs:', fetchedDesigns);
      setDesigns(fetchedDesigns);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to load designs - check console/Firestore rules');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!file && !editingId) {
      alert('Please select an image file.');
      return;
    }
    setUploading(true);
    setError(null);
    try {
      let url = '';
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');
        const response = await fetch(`https://api.cloudinary.com/v1_1/dzln4e8jb/image/upload`, { method: 'POST', body: formData });
        if (!response.ok) throw new Error('Cloudinary upload failed');
        const uploadData = await response.json();
        url = uploadData.secure_url;
      } else if (editingId) {
        const existingDesign = designs.find(d => d.id === editingId);
        url = existingDesign.url;
      }

      // Tags: Split comma-separated string to array
      data.tags = data.tagsInput ? data.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
      data.url = url;
      data.createdAt = serverTimestamp();

      // Standardize price as string with ₹ prefix (for consistency with Gallery/Admin display)
      data.price = `₹${data.price}`;

      // Debug log for serviceType (updated from style)
      console.log('Saving serviceType:', data.serviceType);

      if (editingId) {
        await updateDoc(doc(db, 'images', editingId), data);
        setEditingId(null);
        alert('Design updated!');
      } else {
        await addDoc(collection(db, 'images'), data);
        alert('Design added!');
      }

      // Explicit reset with serviceType (ensures clean state)
      reset({ serviceType: '' });
      setFile(null);
      fetchDesigns();
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.message || 'Failed to save - check console/permissions');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (design) => {
    setEditingId(design.id);
    setValue('title', design.title || '');
    setValue('description', design.description || '');
    setValue('price', design.price ? design.price.replace('₹', '') : ''); // Updated to strip ₹ (not $)
    setValue('tagsInput', design.tags ? design.tags.join(', ') : '');
    setValue('serviceType', design.serviceType || '');  // Updated to serviceType
    setFile(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this design?')) return;
    try {
      await deleteDoc(doc(db, 'images', id));
      fetchDesigns();
      alert('Design deleted!');
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.message || 'Delete failed');
    }
  };

  if (loading) {
    return <div className="text-center py-8"><p className="text-gray-500">Loading designs...</p></div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
        <p className="text-red-600">Error: {error}</p>
        <button onClick={fetchDesigns} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Design' : 'Add New Design'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="p-2 border rounded-md" />
          <input {...register('title', { required: 'Title required' })} placeholder="Title (e.g., Festive Wristband)" className="p-2 border rounded-md" />
          {errors.title && <p className="text-red-500 text-sm md:col-span-2">{errors.title.message}</p>}
          <label htmlFor="service-type-select" className="sr-only">Select Service Type</label> {/* Hidden label for accessibility */}
          <select 
            id="service-type-select" // Added id for label
            {...register('serviceType', { required: 'Service Type required' })} 
            className="p-2 border rounded-md"
          > {/* Updated to serviceType */}
            <option value="">Select Service</option> {/* Updated label */}
            <option value="Bridal Mehendi">Bridal Mehendi</option>
            <option value="Festive Mehendi">Festive Mehendi</option>
            <option value="Arabic Style">Arabic Style</option>
            <option value="Traditional Indian">Traditional Indian</option>
            <option value="Kids Mehendi">Kids Mehendi</option>
            <option value="Custom Designs">Custom Designs</option>
          </select>
          {errors.serviceType && <p className="text-red-500 text-sm md:col-span-2">{errors.serviceType.message}</p>} {/* Updated error key */}
          <textarea {...register('description', { required: 'Description required' })} placeholder="Description" className="p-2 border rounded-md md:col-span-2" rows={3} />
          {errors.description && <p className="text-red-500 text-sm md:col-span-2">{errors.description.message}</p>}
          <input {...register('price', { required: 'Price required', min: { value: 0, message: 'Price must be positive' } })} type="number" placeholder="Price (e.g., 85)" className="p-2 border rounded-md" />
          {errors.price && <p className="text-red-500 text-sm md:col-span-2">{errors.price.message}</p>}
          <input {...register('tagsInput')} placeholder="Tags (comma-separated, e.g., Festival, Traditional)" className="p-2 border rounded-md md:col-span-2" />
          <button 
            type="submit" 
            disabled={uploading} 
            className="md:col-span-2 bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 disabled:opacity-50"
            aria-label={uploading ? 'Saving design' : (editingId ? 'Update design' : 'Add design')} // Added for accessibility
          >
            {uploading ? 'Saving...' : (editingId ? 'Update Design' : 'Add Design')}
          </button>
        </form>
      </div>

      {/* Designs Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Type</th> {/* Updated header */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {designs.length > 0 ? (
                designs.map((design) => (
                  <tr key={design.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={design.url} alt={design.title} className="w-12 h-12 object-cover rounded-md" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{design.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{design.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{design.serviceType || 'N/A'}</td> {/* Updated to serviceType */}
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                      {design.tags?.join(', ') || 'N/A'} {/* Optional chaining for safety */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-orange-600">{design.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button 
                        onClick={() => handleEdit(design)} 
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
                        aria-label="Edit this design" // Added for accessibility
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(design.id)} 
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                        aria-label="Delete this design" // Added for accessibility
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No designs yet. Add one above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}