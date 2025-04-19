const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public')); // for CSS if needed

const user = {
  name: "Fatima Noor",
  age: 23,
  profession: "Software Developer",
  skills: ["Node.js", "Express", "MongoDB", "EJS"]
};

app.get('/', (req, res) => {
  res.render('profile', { user });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
