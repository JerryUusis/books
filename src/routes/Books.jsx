import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
} from "@mui/material";

function Books({ search, data, loading }) {
  // TODO: Implement search functionality
  return (
    <Box sx={{ mx: "auto", p: 2 }}>
      {loading && <CircularProgress />}
      {!loading && (
        <div>
          <Stack
            sx={{ justifyContent: "space-around" }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {data
              .filter((item) => {
                return (
                  item.name.toLowerCase().includes(search) ||
                  item.author.toLowerCase().includes(search)
                );
              })
              .map((book) => (
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "15%",
                    minWidth: 200,
                  }}
                  key={book.name}
                >
                  <CardMedia
                    sx={{ height: 250 }}
                    image={
                      book.img
                        ? book.img
                        : "https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    title={book.name}
                  />
                  <Box sx={{ pt: 2, pl: 2 }}>
                    {book.genres.map((genre, i) => (
                      <Chip
                        key={i}
                        label={genre}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                    <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                      {book.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {book.author}
                    </Typography>
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
                    <Link to={book.name.toLowerCase()}>
                      <Button size="small">Learn More</Button>
                    </Link>
                  </CardActions>
                </Card>
              ))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;
