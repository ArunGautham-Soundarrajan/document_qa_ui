import { Button, Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Output from "../components/Output";
import Sources from "../components/Sources";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

interface VectorSearchResult {
  generated_answer: string;
  sources: string[];
}

function Search() {
  const { fileRef } = useParams();
  const [searchValue, setSearchValue] = useState<string>("");

  const [generatedText, setGeneratedText] = useState<string>("");
  const [sources, setSources] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  async function handleSearch() {
    try {
      const res = await axios.post(
        "http://localhost:8000/search/",
        {
          doc_id: [fileRef],
          question: searchValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = res.data as VectorSearchResult;
      setGeneratedText(responseData.generated_answer);
      setSources(responseData.sources);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Box>
        <Typography
          sx={{ p: 10 }}
          variant="h2"
          textAlign={"center"}
          fontWeight={"fontWeightBold"}
          fontFamily={"Josefin Sans"}
        >
          Document Search Engine 🔍
        </Typography>
      </Box>
      <Box
        sx={{
          maxWidth: "80%",
          margin: "0 auto",
        }}
      >
        <Box sx={{ marginBottom: 10 }}>
          <TextField
            sx={{ width: "100%" }}
            label="Ask your Question"
            id="fullWidth"
            value={searchValue}
            onChange={handleChange}
          />
          <Button
            sx={{
              width: "150px",
              textAlign: "left",
              marginTop: 2,
            }}
            type="submit"
            variant="contained"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
        {generatedText.length > 0 ? (
          <>
            <Typography
              sx={{ marginTop: 3 }}
              variant="h6"
              fontWeight={"fontWeightBold"}
            >
              Results
            </Typography>
            <Output text={[generatedText]} />
          </>
        ) : null}
        {sources.length > 0 &&
        generatedText != "Couldn't find the answer in the document" ? (
          <>
            <Typography
              sx={{ marginTop: 3 }}
              variant="h6"
              fontWeight={"fontWeightBold"}
            >
              Sources
            </Typography>
            <Sources text={sources} />
          </>
        ) : null}
      </Box>
    </Container>
  );
}

export default Search;
