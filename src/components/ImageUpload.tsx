"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";

interface UploadedFile {
  url: string;
  key: string;
}

interface ImageUploadProps {
  onChange: (file: UploadedFile | "") => void;
  value: string;
  endpoint: "postImage";
}


function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
  if (value) {
    return (
      <div className="relative size-40">
        <img
          src={value}
          alt="Upload"
          className="rounded-md size-40 object-cover"
        />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        const file = res?.[0];
        if (file) {
          onChange({
            url: file.url,
            key: file.key,
          });
        }
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
}
export default ImageUpload;
