
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface ProfilePhotoUploadProps {
  userId: string;
  firstName: string;
  lastName: string;
  existingAvatarUrl?: string;
  onPhotoUploaded: (url: string) => void;
}

const ProfilePhotoUpload = ({ 
  userId, 
  firstName, 
  lastName, 
  existingAvatarUrl, 
  onPhotoUploaded 
}: ProfilePhotoUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(existingAvatarUrl || '');
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }

      setIsUploading(true);
      
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
      
      const { data, error } = await supabase.storage
        .from('profiles')
        .upload(filePath, file);
        
      if (error) {
        throw error;
      }

      // Get public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);
        
      setAvatarUrl(publicUrl);
      onPhotoUploaded(publicUrl);
      toast.success("Profile photo updated successfully!");
      
    } catch (error: any) {
      toast.error(error.message || "Error uploading profile photo");
      console.error("Error uploading profile photo:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative group">
        <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
          <AvatarImage src={avatarUrl} alt="Profile" />
          <AvatarFallback className="text-2xl">{firstName?.[0]}{lastName?.[0]}</AvatarFallback>
        </Avatar>
        
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
            <Upload className="w-8 h-8 text-white" />
            <span className="text-xs text-white mt-1">Upload</span>
          </label>
          <input 
            id="photo-upload" 
            type="file" 
            className="hidden"
            accept="image/*"
            onChange={handleFileChange} 
            disabled={isUploading}
          />
        </div>
        
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
            <div className="w-8 h-8 border-4 border-t-brand-teal border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="mt-2"
        onClick={() => document.getElementById('photo-upload')?.click()}
        disabled={isUploading}
      >
        {avatarUrl ? 'Change Photo' : 'Upload Photo'}
      </Button>
    </div>
  );
};

export default ProfilePhotoUpload;
