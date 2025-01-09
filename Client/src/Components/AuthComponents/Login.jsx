import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        await login( values.email, values.password);
        navigate('/learn')
      } catch (error) {
        console.error('login error', error); 
      }
    },
  });

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white relative">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <form onSubmit={formik.handleSubmit} className="w-full max-w-sm space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            {...formik.getFieldProps('email')}
            className={`w-full px-4 py-3 rounded-lg border ${
              formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 outline-none`}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          ) : null}
        </div>
        <div className="relative">
            <input
              type="password"
              placeholder="Password"
              {...formik.getFieldProps('password')}
              className={`w-full px-4 py-3 pr-20 rounded-lg border ${
                formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 outline-none`}
            />
            <a 
              href="/forgot-password" 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 text-sm hover:underline"
            >
              Forget?
            </a>
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            ) : null}
          </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
        >
          Login
        </button>
      </form>
      <div className="flex items-center my-4 w-full max-w-sm">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-3 text-gray-500">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <div className="flex w-full max-w-sm space-x-4">
        <button className="flex items-center justify-center w-1/2 py-2 bg-white text-blue-600 border border-gray-300 font-semibold rounded-lg hover:bg-gray-100 transition-all">
          <FaFacebook className="mr-2" />
          Facebook
        </button>
        <button className="flex items-center justify-center w-1/2 py-2 bg-white text-red-600 border border-gray-300 font-semibold rounded-lg hover:bg-gray-100 transition-all">
          <FaGoogle className="mr-2" />
          Google
        </button>
      </div>
      <p className="text-xs text-center text-gray-500 mt-4">
        By signing in to Duolingo, you agree to our{' '}
        <a href="/terms" className="underline hover:text-blue-700">
          Terms
        </a>{' '}
        and{' '}
        <a href="/privacy" className="underline hover:text-blue-700">
          Privacy Policy
        </a>.
      </p>
      <p className="text-xs text-center text-gray-500 mt-2">
        This site is protected by reCAPTCHA Enterprise and the{' '}
        <a
          href="https://policies.google.com/privacy"
          className="underline hover:text-blue-700"
        >
          Google Privacy Policy
        </a>{' '}
        and{' '}
        <a
          href="https://policies.google.com/terms"
          className="underline hover:text-blue-700"
        >
          Terms of Service
        </a>{' '}
        apply.
      </p>
    </div>
  );
};

export default Login;













