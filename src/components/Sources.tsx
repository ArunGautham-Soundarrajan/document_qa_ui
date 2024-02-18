import { List, ListItem, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { motion } from "framer-motion";

interface ListItemProps {
  text: Array<string>;
}

function Sources({ text }: ListItemProps) {
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
            minHeight: 128,
          },
        }}
      >
        <Paper square={false} elevation={0} sx={{ bgcolor: "primary" }}>
          <List>
            {" "}
            {text.map((item, index) => (
              <ListItem key={index} divider={true}>
                <ListItemText>{item}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </motion.div>
  );
}

export default Sources;
