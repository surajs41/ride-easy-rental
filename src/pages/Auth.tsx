
import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">
            {mode === 'login' ? 'Welcome Back!' : 'Create an Account'}
          </h1>
          <p className="text-gray-600">
            {mode === 'login' ? (
              <>
                New to RideEasy?{' '}
                <Link to="/auth?mode=signup" className="text-brand-teal hover:underline">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link to="/auth?mode=login" className="text-brand-teal hover:underline">
                  Log in
                </Link>
              </>
            )}
          </p>
        </div>
        <AuthForm mode={mode} />
      </div>
    </div>
  );
};

export default Auth;
