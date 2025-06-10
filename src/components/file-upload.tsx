"use client";

import { useState, useEffect } from "react";
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof OurFileRouter;
}

export const  FileUpload = ({ endpoint, onChange }: FileUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-full">
      <UploadDropzone<OurFileRouter, keyof OurFileRouter>
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          setError(null);
          if (res && res[0]) {
            onChange(res[0].url);
            toast.success("Upload completed!");
          }
        }}
        onUploadError={(error: Error) => {
          setError(error.message);
          toast.error(`Error: ${error.message}`);
        }}
        content={{
          label({ isUploading }) {
            return isUploading
              ? "Uploading..."
              : "Choose file or drag and drop";
          },
          allowedContent({ isUploading }) {
            if (isUploading) return "Uploading file...";
            if (endpoint === "courseImage") return "Image (4MB max)";
            if (endpoint === "courseAttachment")
              return "Text, Image, Video, Audio, PDF";
            if (endpoint === "chapterVideo") return "Video (8GB max)";
            return "Select a file";
          },
        }}
        className="border-2 border-dashed border-gray-300 p-6 rounded-lg ut-button:bg-blue-600 ut-button:text-white ut-button:hover:bg-blue-700 ut-allowed-content:text-gray-600 ut-label:text-gray-800"
      />
      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
    </div>
  );
}

// "use client";

// import toast from "react-hot-toast";
// import { ourFileRouter } from "../app/api/uploadthing/core";
// import { UploadDropzone } from "@/lib/uploadthing";

// interface FileUploadProps {
//   onChange: (url?: string) => void;
//   endpoint: keyof typeof ourFileRouter;
// }

// export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
//   return (
//     <UploadDropzone
//       onClientUploadComplete={(res) => {
//         onChange(res?.[0].url); // Pass URL to parent
//       }}
//       onUploadError={(error: Error) => {
//         toast.error(`Upload failed: ${error.message}`);
//       }}
//       endpoint={endpoint}
//     />
//   );
// };

// "use client";

// import { useState } from "react";
// import { UploadDropzone } from "@uploadthing/react";
// import { OurFileRouter } from "@/app/api/uploadthing/core";
// import { toast } from "react-hot-toast";
// import { Loader2 } from "lucide-react";

// interface FileUploadProps {
//   endpoint: keyof OurFileRouter;
//   onChange: (url?: string) => void;
// }

// export function FileUpload({ endpoint, onChange }: FileUploadProps) {
//   const [isUploading, setIsUploading] = useState(false);

//   return (
//     <div className="w-full">
//       <UploadDropzone<OurFileRouter>
//         endpoint={endpoint}
//         onClientUploadComplete={(res) => {
//           setIsUploading(false);
//           if (res && res[0]) {
//             onChange(res[0].url);
//             toast.success("Upload completed!");
//           }
//         }}
//         onUploadError={(error: Error) => {
//           setIsUploading(false);
//           toast.error(`Error: ${error.message}`);
//         }}
//         onUploadBegin={() => {
//           setIsUploading(true);
//         }}
//         className="border-2 border-dashed border-gray-300 p-6 rounded-lg ut-button:bg-blue-600 ut-button:text-white ut-button:hover:bg-blue-700 ut-allowed-content:text-gray-600"
//       />
//       {isUploading && (
//         <div className="flex items-center justify-center mt-4">
//           <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
//           <span className="ml-2 text-gray-700">Uploading...</span>
//         </div>
//       )}
//     </div>
//   );
// }
