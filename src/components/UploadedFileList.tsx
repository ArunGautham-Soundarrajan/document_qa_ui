import { Box, Paper, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface Files {
  file_name: string;
  processed: boolean;
  id: string;
}

interface UploadedFileListProps {
  files: Files[];
}

const UploadedFileList: React.FC<UploadedFileListProps> = ({ files }) => {
  const navigate = useNavigate();

  const navigateToSearch = (id: String) => {
    navigate(`/search/${id}`);
  };
  return (
    <motion.div
      className="box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Box>
        {files.length === 0 ? null : (
          <>
            <Typography
              sx={{ marginTop: 3, marginBottom: 3 }}
              variant="h5"
              fontWeight={"fontWeightBold"}
              fontFamily={"Josefin Sans"}
            >
              Uploaded Files
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="File Manager">
                <TableHead>
                  <TableRow>
                    <TableCell variant="head">File Name</TableCell>
                    <TableCell align="right">Processed</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files.map((file) => (
                    <TableRow
                      hover={true}
                      onClick={() => {
                        navigateToSearch(file.id);
                      }}
                      key={file.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {file.file_name}
                      </TableCell>
                      <TableCell align="right">
                        {file.processed.toString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </motion.div>
  );
};

export default UploadedFileList;
