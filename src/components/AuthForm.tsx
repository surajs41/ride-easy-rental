
import React from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';

type AuthFormProps = {
  mode: 'login' | 'signup';
  isAdmin?: boolean;
};

type FormData = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
};

const AuthForm = ({ mode, isAdmin = false }: AuthFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      if (mode === 'signup') {
        // Admin signup is not allowed through the UI
        if (isAdmin) {
          toast.error("Admin accounts cannot be created through signup");
          return;
        }
        
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              first_name: data.firstName,
              last_name: data.lastName,
              phone: data.phone,
              role: 'user'
            },
          },
        });
        if (error) throw error;
        toast.success("Successfully signed up! Please check your email for verification.");
      } else {
        // For admin login
        if (isAdmin) {
          // First, check if credentials match our admin values
          const { data: adminData, error: adminError } = await supabase
            .from('admins')
            .select('*')
            .eq('email', data.email)
            .eq('password', data.password)
            .single();

          if (adminError || !adminData) {
            toast.error("Invalid admin credentials");
            return;
          }
        }
        
        // Regular login via Supabase for both admin and users
        const { error, data: authData } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        
        if (error) throw error;
        
        // Check if the user should be redirected to admin dashboard
        if (isAdmin && data.email === 'admin@bike.com') {
          toast.success("Admin logged in successfully!");
          navigate('/admin');
        } else {
          toast.success("Successfully logged in!");
          navigate('/');
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
      {mode === 'signup' && !isAdmin && (
        <>
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              {...register("firstName", { 
                required: "First name is required",
                minLength: { value: 2, message: "First name must be at least 2 characters" }
              })} 
              id="firstName" 
            />
            {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              {...register("lastName", { 
                required: "Last name is required",
                minLength: { value: 2, message: "Last name must be at least 2 characters" }
              })} 
              id="lastName" 
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input 
              {...register("phone", { 
                required: "Phone number is required",
                pattern: { 
                  value: /^[0-9]{10}$/, 
                  message: "Please enter a valid 10-digit phone number" 
                }
              })} 
              id="phone" 
              type="tel"
            />
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
          </div>
        </>
      )}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input 
          {...register("email", { 
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })} 
          id="email" 
          type="email" 
          defaultValue={isAdmin ? 'admin@bike.com' : ''}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input 
          {...register("password", { 
            required: true,
            minLength: { value: 8, message: "Password must be at least 8 characters" },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message: "Password must contain at least one letter, one number, and one special character"
            }
          })} 
          id="password" 
          type="password" 
          defaultValue={isAdmin ? 'Admin@123' : ''}
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      <Button type="submit" className="w-full bg-brand-teal hover:bg-brand-teal/90">
        {mode === 'login' ? (isAdmin ? 'Admin Login' : 'Log In') : 'Sign Up'}
      </Button>
    </form>
  );
};

export default AuthForm;

