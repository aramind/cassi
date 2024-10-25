import { Stack, Typography } from "@mui/material";

function App() {
  return (
    <>
      <Stack>
        {" "}
        <Typography variant="mainHeader">Main Header</Typography>
        <Typography variant="subHeader">Sub Header</Typography>
        <Typography variant="text">this is for the text</Typography>
        <Typography variant="accent">this is for the accent</Typography>
        <Typography variant="smallText">this is for the small text</Typography>
        <Typography variant="narrowText">
          this is for the narrow text
        </Typography>
      </Stack>
    </>
  );
}

export default App;
