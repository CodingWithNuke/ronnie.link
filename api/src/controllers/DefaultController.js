const { Url } = require('../models');
const path = require('path');

exports.findOne = async (req, res) => {
  const { slug } = req.params;

  try {
    const url = await Url.findOne({ slug });

    if (url) {
      res.redirect(url.url);
    } else {
      res.status(404).sendFile(path.join(__dirname, '..', 'views/404.html'))
    }
  } catch (error) {
    res.status(404).sendFile(path.join(__dirname, '..', 'views/404.html'))
  }
}