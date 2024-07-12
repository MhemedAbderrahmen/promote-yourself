"use client";

import { UploadDropzone } from "~/utils/uploadthing";

export default function Uploader() {
  return (
    <UploadDropzone
      className="border-gray-600"
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
