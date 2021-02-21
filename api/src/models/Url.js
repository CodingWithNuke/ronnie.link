const { model, Schema } = require('mongoose');

const UrlSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
})

module.exports = model("Url", UrlSchema);
