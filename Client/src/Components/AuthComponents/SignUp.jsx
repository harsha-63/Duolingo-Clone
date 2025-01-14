import { FaFacebook } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();  
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      age: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      age: Yup.number()
        .min(1, 'Age must be a positive number')
        .required('Age is required'),
    }),
    
    onSubmit: async (values) => {
      try {
        await register(values.username, values.email, values.password, values.age);
        navigate('/learn')
      } catch (error) {
        console.error('Registration error', error);
      }
    },
  });

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white px-4 sm:px-8 md:px-16 mt-24">
      <h1 className="text-2xl font-semibold text-gray-700 font-playpen mb-8">Create your profile</h1>

      <form onSubmit={formik.handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          name="age"
          placeholder="Age"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-4 py-3 rounded-xl border ${
            formik.touched.age && formik.errors.age ? 'border-red-500' : 'border-gray-300'
          } focus:ring-2 focus:ring-blue-500 outline-none`}
        />
        {formik.touched.age && formik.errors.age && (
          <p className="text-red-500 text-sm">{formik.errors.age}</p>
        )}

        <p className="text-base font-semibold text-start text-gray-400 mb-4">
          Providing your age ensures you get the right Duolingo experience. For more details, please visit our{' '}
          <a href="/privacy" className="underline  text-blue-400 hover:text-blue-700">
            Privacy Policy
          </a>
          .
        </p>

        <input
          type="text"
          name="username"
          placeholder="Name(Optional)"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-4 py-3 rounded-xl border ${
            formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-gray-300'
          } focus:ring-2 focus:ring-blue-500 outline-none`}
        />
        {formik.touched.username && formik.errors.username && (
          <p className="text-red-500 text-sm">{formik.errors.username}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-4 py-3 rounded-xl border ${
            formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
          } focus:ring-2 focus:ring-blue-500 outline-none`}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm">{formik.errors.email}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-4 py-3 rounded-xl border ${
            formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
          } focus:ring-2 focus:ring-blue-500 outline-none`}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
        )}
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-400 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all font-playpen "
        >
          Create Account
        </button>
      </form>

      <div className="flex items-center my-4 w-full max-w-sm">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-3 text-gray-700 font-playpen">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <div className="flex w-full max-w-sm space-x-4">
        <button className="flex items-center justify-center w-full py-2 bg-white text-blue-600 border border-gray-300 font-semibold rounded-xl hover:bg-gray-100 transition-all">
          <FaFacebook className="mr-2" />
          Facebook
        </button>
      </div>

      <p className="text-xs text-center text-gray-500 mt-4">
        By signing up to Duolingo, you agree to our{' '}
        <a href="/terms" className="underline hover:text-blue-700">
          Terms
        </a>{' '}
        and{' '}
        <a href="/privacy" className="underline hover:text-blue-700">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default SignUp;

