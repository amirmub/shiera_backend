const express = require('express');
const app = express();
const path = require('path');

const quotes = [
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Every day is a second chance.", author: "Oprah Winfrey" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "Act as if what you do makes a difference. It does.", author: "William James" },
    
  ];
  

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.render('index', { quote: randomQuote });

});

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
