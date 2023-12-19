import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Root from "./routes/Root";
import Books from "./routes/Books";
import Book from "./routes/Book";
import AddBook from "./routes/AddBook";
import { useState, useEffect } from "react";
import useAxios from "./services/useAxios";

// Set primary and secondary colors for the palette/theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#004d40",
    },
    secondary: {
      main: "#ffab40",
    },
  },
});

// Main app
function App() {
  const [search, setSearch] = useState("");
  const { get, data, loading } = useAxios("http://localhost:3000");

  // Fetches the books using getBooks if useState's initial state is empty after loading the page first
  useEffect(() => {
    if (data.length === 0) {
      getBooks();
    }
  }, []);

  // TODO: Replace axios with useAxios hook
  function getBooks() {
    get("books");
  }

  const handleInput = (event) => {
    setSearch(event.target.value);
  };
  // Create paths navigating on the page
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root handleInput={handleInput} />,
      children: [
        {
          path: "/",
          element: <Books search={search} data={data} loading={loading} />,
        },
        {
          path: "/:book/",
          element: <Book data={data} loading={loading} />,
        },
        { path: "/addnew", element: <AddBook /> },
      ],
    },
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
