
import React from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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
  dob?: string;
  licenseNumber?: string;
  address?: string;
};

const AuthForm = ({ mode, isAdmin = false }: AuthFormProps) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>();
  const navigate = useNavigate();
  const phoneValue = watch('phone');

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
        
        // After successful signup, also update the profile with additional info
        const { data: authData } = await supabase.auth.getSession();
        if (authData.session) {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              first_name: data.firstName,
              last_name: data.lastName,
              phone: data.phone,
              date_of_birth: data.dob,
              license_number: data.licenseNumber,
              address: data.address
            })
            .eq('id', authData.session.user.id);
          
          if (profileError) {
            console.error('Error updating profile:', profileError);
          }
        }
        
        toast.success("Successfully signed up! Please check your email for verification.");
      } else {
        // For admin login
        if (isAdmin) {
          const { data: adminData, error: adminError } = await supabase
            .from('admins')
            .select('*')
            .eq('email', 'admin@bike.com')
            .eq('password', 'Admin@123')
            .single();

          if (adminError || !adminData) {
            toast.error("Invalid admin credentials");
            return;
          }
        }
        
        // Regular login via Supabase for both admin and users
        const { error } = await supabase.auth.signInWithPassword({
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                {...register("firstName", { 
                  required: "First name is required",
                  minLength: { value: 2, message: "First name must be at least 2 characters" }
                })} 
                id="firstName" 
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
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
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <div className="mt-1">
              <PhoneInput
                country={'in'}
                value={phoneValue}
                onChange={(phone) => setValue('phone', phone)}
                containerClass="w-full"
                inputClass="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-teal focus:border-brand-teal"
                buttonClass="border border-gray-300 rounded-l-md bg-white hover:bg-gray-50"
                dropdownClass="bg-white"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input 
              {...register("dob", { 
                required: "Date of birth is required" 
              })}
              id="dob" 
              type="date" 
            />
            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
          </div>

          <div>
            <Label htmlFor="licenseNumber">Driving License Number</Label>
            <Input 
              {...register("licenseNumber", { 
                required: "License number is required"
              })}
              id="licenseNumber" 
            />
            {errors.licenseNumber && <p className="text-red-500 text-xs mt-1">{errors.licenseNumber.message}</p>}
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input 
              {...register("address", { 
                required: "Address is required"
              })}
              id="address" 
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
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
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input 
          {...register("password", { 
            required: true,
            minLength: { value: 8, message: "Password must be at least 8 characters" }
          })} 
          id="password" 
          type="password" 
          defaultValue={isAdmin ? 'Admin@123' : ''}
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>

      <Button type="submit" className="w-full bg-brand-teal hover:bg-brand-teal/90">
        {mode === 'login' ? (isAdmin ? 'Admin Login' : 'Log In') : 'Sign Up'}
      </Button>
    </form>
  );
};

export default AuthForm;
