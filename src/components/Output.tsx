import { List, ListItem, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { motion } from "framer-motion";

interface ListItemProps {
  text: Array<string>;
}

function Output({ text }: ListItemProps) {
  return (
    <motion.div
      className="box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            p: 0,
            marginTop: 2,
            width: "100%",
            minHeight: 200,
          },
        }}
      >
        <Paper square={false} elevation={7} sx={{ bgcolor: "#1e1919" }}>
          <List>
            {" "}
            {text.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  sx={{ whiteSpace: "pre-wrap" }}
                  primaryTypographyProps={{ color: "#f4f6fc" }}
                >
                  {item}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </motion.div>
  );
}

export default Output;
