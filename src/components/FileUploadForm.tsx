import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, Box } from "@mui/material";

import { styled } from "@mui/material/styles";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface FileUploadFormProps {
  onUpload: (files: File) => void;
}

const FileUploadForm: React.FC<FileUploadFormProps> = ({ onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files);
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles([...selectedFiles, ...newFiles]);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    console.log("File uploaded");
    event.preventDefault();
    onUpload(selectedFiles[selectedFiles.length - 1]);
    setSelectedFiles([]);
  };

  return (
    <Box sx={{ p: 10, margin: "0", textAlign: "center" }}>
      {selectedFiles.length > 0 ? (
        <p>{selectedFiles[selectedFiles.length - 1].name}</p>
      ) : (
        <p>Please upload your pdf 📁</p>
      )}
      <form onSubmit={handleSubmit}>
        <Button
          sx={{ width: "155px", m: 5 }}
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Open file
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
        <Button sx={{ width: "155px", m: 5 }} type="submit" variant="contained">
          Upload
        </Button>
      </form>
    </Box>
  );
};

export default FileUploadForm;
