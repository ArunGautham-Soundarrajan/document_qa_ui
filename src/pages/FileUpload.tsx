import React from "react";
import FileUploadForm from "../components/FileUploadForm";
import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import UploadedFileList from "../components/UploadedFileList";

interface Files {
  file_name: string;
  processed: boolean;
  id: string;
}

const FileUpload: React.FC = () => {
  const navigate = useNavigate();
  const [filesList, setFilesList] = useState<Files[]>([]);

  // Get the files from the API when the page loads
  useEffect(() => {
    const fetchFiles = async () => {
      const response = await axios.get("http://localhost:8000/files");
      setFilesList(response.data);
    };
    fetchFiles();
  }, []);

  async function handleUpload(files: File) {
    try {
      const res = await axios.post(
        "http://localhost:8000/files",
        { file: files },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const res_data = res.data as Files;
      navigate(`/search/${res_data.id}`);
      console.log("Upload successful", res_data);
    } catch (error) {
      console.error("Error uploading file", error);
    }
  }

  return (
    <Container>
      <Box>
        <Typography
          sx={{ p: 2, marginTop: 15 }}
          variant="h2"
          textAlign={"center"}
          fontWeight={"fontWeightBold"}
          fontFamily={"Josefin Sans"}
        >
          File Manager
        </Typography>
      </Box>
      <Box>
        <FileUploadForm onUpload={handleUpload} />
      </Box>
      <Box sx={{ maxWidth: "80%", margin: "0 auto" }}>
        <UploadedFileList files={filesList} />
      </Box>
    </Container>
  );
};

export default FileUpload;
