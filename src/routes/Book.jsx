import { Link, useParams } from "react-router-dom";
import useAxios from "../services/useAxios";
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,

  Stack,
  Rating,
  Chip,
  Typography,
} from "@mui/material";
import Image from "mui-image";

function Book({ data, loading }) {
  const params = useParams();
  //   console.log(params.book);
  //   console.log(data);
  const book = data.find((item) => item.name.toLowerCase() === params.book);
  console.log(book);

  return (
    <>
      <Stack 
        direction="row"
        >
        <Image
          src={book.img}
          fit="contain"
          width="50%"
          sx={{ maxWidth: "400px" }}
        ></Image>
          <Stack
            sx={{ 
              justifyContent: "center",
              alignItems: "center" }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            <Box sx={{ pt: 2, pl: 2 }}>
              {book.genres.map((genre, i) => (
                <Chip key={i} label={genre} variant="outlined" size="small" />
              ))}
              <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                {book.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {book.author}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Completed {book.completed ? "✅" : "❌"}
              </Typography>
              {book.start && (
                <>
                  <div>
                    <Typography variant="subtitle3" gutterBottom>
                      Starting day {book.start}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle3" gutterBottom>
                      Ending day {book.end}
                    </Typography>
                  </div>
                </>
              )}
              <Box
                sx={{
                  justifyContent: "space-between",
                  mt: "auto",
                  pl: 2,
                }}
              >
                <Rating
                  name="read-only"
                  value={book.stars}
                  readOnly
                  size="small"
                />
              </Box>
            </Box>
          </Stack>
      </Stack>
    </>
  );
}

export default Book;
