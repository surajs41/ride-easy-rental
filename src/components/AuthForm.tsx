
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
          // First check if credentials match our admin values
          if (data.email !== 'admin123@gmail.com' || data.password !== 'Admin@123') {
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
        if (isAdmin && data.email === 'admin123@gmail.com') {
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
            <Input {...register("firstName")} id="firstName" />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input {...register("lastName")} id="lastName" />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input {...register("phone")} id="phone" />
          </div>
        </>
      )}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input 
          {...register("email", { required: true })} 
          id="email" 
          type="email" 
          defaultValue={isAdmin ? 'admin123@gmail.com' : ''}
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input 
          {...register("password", { required: true })} 
          id="password" 
          type="password" 
          defaultValue={isAdmin ? 'Admin@123' : ''}
        />
      </div>
      <Button type="submit" className="w-full bg-brand-teal hover:bg-brand-teal/90">
        {mode === 'login' ? (isAdmin ? 'Admin Login' : 'Log In') : 'Sign Up'}
      </Button>
    </form>
  );
};

export default AuthForm;
