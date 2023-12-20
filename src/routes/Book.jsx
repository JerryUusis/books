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

function Book({ data, loading }) {
  const params = useParams();
  //   console.log(params.book);
  //   console.log(data);
  const book = data.find((item) => item.name.toLowerCase() === params.book);
  console.log(book);

  return (
    <>
      <Box sx={{ mx: "auto", p: 2 }}>
        <div>
          <Stack
            sx={{ justifyContent: "space-around" }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "15%",
                minWidth: 400,
              }}
              key={book.name}
            >
              <CardMedia
                sx={{ height: 350 }}
                image={
                  book.img
                    ? book.img
                    : "https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                title={book.name}
              />
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
              </Box>
              <CardActions
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
              </CardActions>
            </Card>
          </Stack>
        </div>
      </Box>
    </>
  );
}

export default Book;
