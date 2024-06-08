import { uploadImage } from "database";
import { useState } from "react";

interface FileUploadResponse {
  photoUrl: string;
  error: string;
}

type Prefix = "user" | "wine";

export function useFileInput() {
  const [imgPreview, setImgPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          const fileBlob = new Blob([e.target.result as ArrayBuffer], { type: selectedFile.type });
          const url = URL.createObjectURL(fileBlob);
          setBlob(fileBlob);
          setImgPreview(url);
        }
      };

      reader.readAsArrayBuffer(selectedFile);
    }
  };

  async function handleFileUpload(imageBlob: Blob, prefix: Prefix, id: string): Promise<FileUploadResponse> {
    try {
      const fileType = imageBlob.type.split("/")[1];
      const { photoUrl, error } = await uploadImage(imageBlob, prefix, id, fileType);
      return {
        photoUrl,
        error,
      };
    } catch (err: any) {
      console.error(err);
      return {
        photoUrl: "",
        error: `unable to upload file: ${err.message}`,
      };
    }
  }

  return {
    file,
    blob,
    imgPreview,
    setFile,
    setBlob,
    setImgPreview,
    handleFileChange,
    handleFileUpload,
  };
}
