const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/books', (req, res) => {
  const { book_id, title, author, genre, year, copies } = req.body;

  if (!book_id || !title || !author || !genre || !year || !copies) {
    return res.status(400).json({ error: 'All book attributes are required' });
  }

  if (data.find(book => book.book_id === book_id)) {
    return res.status(400).json({ error: 'Book with this ID already exists' });
  }

  const newBook = { book_id, title, author, genre, year, copies };
  data.push(newBook);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.status(201).json(newBook);
});

app.get('/books', (req, res) => {
  res.json(data);
});

app.get('/books/:id', (req, res) => {
  const book = data.find(b => b.book_id === req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});

app.put('/books/:id', (req, res) => {
  const book = data.find(b => b.book_id === req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const { title, author, genre, year, copies } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;
  if (genre) book.genre = genre;
  if (year) book.year = year;
  if (copies) book.copies = copies;

  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json(book);
});

app.delete('/books/:id', (req, res) => {
  const bookIndex = data.findIndex(b => b.book_id === req.params.id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  data.splice(bookIndex, 1);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json({ message: 'Book deleted successfully' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
