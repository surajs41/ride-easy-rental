
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
};

type FormData = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
};

const AuthForm = ({ mode }: AuthFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              first_name: data.firstName,
              last_name: data.lastName,
              phone: data.phone,
            },
          },
        });
        if (error) throw error;
        toast.success("Successfully signed up! Please check your email for verification.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
        toast.success("Successfully logged in!");
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
      {mode === 'signup' && (
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
        <Input {...register("email", { required: true })} id="email" type="email" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input {...register("password", { required: true })} id="password" type="password" />
      </div>
      <Button type="submit" className="w-full bg-brand-teal hover:bg-brand-teal/90">
        {mode === 'login' ? 'Log In' : 'Sign Up'}
      </Button>
    </form>
  );
};

export default AuthForm;
