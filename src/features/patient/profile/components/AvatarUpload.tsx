"use client";

import * as React from "react";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { ProfileAvatar } from "./ProfileAvatar";

interface AvatarUploadProps {
  uid: string;
  url: string | undefined;
  name: string;
  onUploadComplete: (path: string) => void;
  size?: "sm" | "md" | "lg" | "xl";
}

export function AvatarUpload({ uid, url, name, onUploadComplete, size = "xl" }: AvatarUploadProps) {
  const [uploading, setUploading] = React.useState(false);
  const supabase = createClient();

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      // Keep it simple and overwrite the same path to save space
      const filePath = `${uid}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      // Automatically update the profile table's avatar_url field with the path
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: filePath })
        .eq("id", uid);

      if (updateError) {
        throw updateError;
      }

      onUploadComplete(filePath);
      toast.success("Profile picture updated!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error uploading avatar!");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative group inline-block">
      <ProfileAvatar url={url} name={name} size={size} />
      
      <label 
        className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer"
        htmlFor="avatar-upload"
      >
        {uploading ? (
          <Loader2 className="w-8 h-8 animate-spin" />
        ) : (
          <>
            <Camera className="w-8 h-8 mb-1" />
            <span className="text-xs font-medium">Upload</span>
          </>
        )}
      </label>
      <input
        type="file"
        id="avatar-upload"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
        className="hidden"
      />
    </div>
  );
}
