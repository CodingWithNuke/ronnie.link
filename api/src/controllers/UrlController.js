const { Url } = require('../models');
const { nanoid } = require('nanoid');

exports.findAll = async (req, res) => {
  const urls = await Url.find({});

  res.send(urls);
}

exports.create = async (req, res) => {
  let { slug, url, code } = req.body;

  if (code === process.env.CODE) {
    if (!slug) {
      slug = nanoid(8);
    }

    slug = slug.toLowerCase();

    const newUrl = await Url.create({
      slug,
      url
    });

    return res.send(newUrl)
  } else {
    res.status(401);
    return res.json({
      message: 'Unauthorized.'
    })
  }
}

exports.deleteOne = async (req, res) => {
  const { id: _id } = req.params;
  const { code } = req.body;

  console.log(req.body);

  if (code === process.env.CODE) {
    const url = await Url.findOneAndDelete({ _id });

    return res.send(url);
  } else {
    res.status(401);
    return res.json({
      message: 'Unauthorized.'
    })
  }
}