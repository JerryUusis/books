import { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import { DateField } from '@mui/x-date-pickers/DateField';
import useAxios from '../services/useAxios';
import { bookGenres } from '../genres';
import { Stack, Typography } from '@mui/material';

// Custom hook for adding a new book object
function AddBook() {
  const { alert, post } = useAxios('http://localhost:3000');
  const [rateValue, setRateValue] = useState(3);
  const [book, setBook] = useState({
    author: '',
    name: '',
    genres: [],
    completed: false,
    start: null,
    end: null,
    stars: null,
  });

  // Sets selected genres and separates them with a comma
  const genreChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      genres: typeof value === 'string' ? value.split(',') : value,
    });
  };

  // Sets the rating of a new book object 
  const rateChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      stars: value,
    });
  };

  // Sets the boolean value for the new book if it's read or not
  const addBookHandler = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === 'checkbox' && name === 'completed') {
      setBook({ ...book, [name]: checked });
    } else {
      setBook({ ...book, [name]: value });
    }
  };

  // Use post method from custom useAxios hook to submit form data / add new book
  function postHandler(e) {
    e.preventDefault();
    post('books', book);
  }

  // create 2 functions for deleting and updating

  return (
    <form onChange={addBookHandler} onSubmit={postHandler}>
      <Stack
        spacing={1}
        alignItems="stretch"
        sx={{ my: 2, mx: 'auto', width: '25%' }}
      >
        {alert.show && <Alert severity={alert.type}>{alert.message}</Alert>}
        <Typography variant="h4" component="h2" sx={{ my: 10 }}>
          Add a book
        </Typography>
        <TextField
          name="name"
          id="outlined-basic"
          label="Title"
          variant="outlined"
        />
        <TextField
          name="author"
          id="outlined-basic"
          label="Author"
          variant="outlined"
        />
        <TextField
          name="img"
          id="outlined-basic"
          label="Image (url)"
          variant="outlined"
        />
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={book.genres}
          name="genres"
          onChange={genreChangeHandler}
          input={<OutlinedInput label="Genre" />}
        >
          {bookGenres.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>

        <FormControlLabel
          name="completed"
          control={<Checkbox checked={book.completed} />}
          label="Completed"
        />

        <DateField name="start" label="Started" />
        <DateField name="end" label="Finished" disabled={!book.completed} />
        <Stack spacing={1}>
          <Rating
            name="stars"
            value={rateValue}
            onClick={rateChangeHandler}
            size="large"
            onChange={(event, newValue) => {
              setRateValue(newValue);
            }}
          />
        </Stack>
        <Button variant="contained" type="submit">
          Add new
        </Button>
      </Stack>
    </form>
  );
}

export default AddBook;
