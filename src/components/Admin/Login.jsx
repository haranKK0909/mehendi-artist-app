import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/admin/images');
    } catch (error) {
      // Handle error (e.g., show message)
      console.error(error);
    }
  };

  const handleSignup = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate('/admin/images');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('email')} type="email" placeholder="Email" className="w-full p-2 border" />
        <input {...register('password')} type="password" placeholder="Password" className="w-full p-2 border" />
        <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
      </form>
      <button onClick={handleSubmit(handleSignup)} className="mt-4 bg-green-500 text-white p-2">Signup</button>
    </div>
  );
}