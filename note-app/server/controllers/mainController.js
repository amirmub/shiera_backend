/* GET / HOMEPAGE */
exports.homepage = async (req, res) => {
  const locals = {
    title: "NodeJs Notes",
    description: " NodeJS Notes App.",
  }
  res.render('index', {
    locals,
    layout: '../views/notes/create-note'
  });
}


/* GET / About */
exports.about = async (req, res) => {
  const locals = {
    title: "About - NodeJs Notes",
    description: " NodeJS Notes App.",
  }
  res.render('about', locals);
}