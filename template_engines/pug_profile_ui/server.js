const express = require('express');
const app = express();
const port = 3100;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

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
  console.log(`Server is running at http://localhost:${port}`);
});
