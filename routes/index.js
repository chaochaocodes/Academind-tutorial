var express = require('express');
var router = express.Router();

// import MONGOOSE module, setup default connection  -------------------------------------
const mongoose = require('mongoose')
mongoose.connect('localhost:8000/test');
 
// create SCHEMA -------------------------------------------------------------------------
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const userDataSchema = new Schema({
  title: String,
  content: String,
  author: String,
}, {collection: 'user-data'});

var UserData = mongoose.model('UserData', userDataSchema);

// const entrySchema = new Schema({
//   photo: ObjectId,
//   imageURL: {
//     type: String, // store directly? https://stackoverflow.com/questions/29780733/store-an-image-in-mongodb-using-node-js-express-and-mongoose/29780816
//     min: [1],
//     max: [5],
//     required: [true, 'why no photo?']
//   },
//   body: {type: String, required: true}, 
//   prompt: String,
//   location: String,
//   date: {type: Date, default: Date.now()},
// }, {collection: 'entry-data'}); 
// // collection ^ will override below 'EntryData' in plural form 
// // compile model from schema
// var EntryData = mongoose.model('EntryData', entrySchema)

// // create a record (CRUD operations are async--supply a callback to call when operation completes)
// // MDN: The API uses error-first argument convention, so the first argument for the callback will always be an error value (or null). If the API returns some result, this will be provided as the second argument.

// // create and save new model instance
// EntryData.create({prompt: 'hello'}, function(err, new_instance ) {
//   if(err) return handleError(err);
//   // saved! 
// });





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-data', function(req, res, next) {
  UserData.find()
    .then(function(doc) {   // retrieve data 'doc'
      res.render('index', {items: doc});  // render the 'doc'
    });
});

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  var data = new UserData(item);
  data.save();  
  res.redirect('/');
})

router.post('/update', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.body.id

  UserData.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    doc.title = req.body.title;
    doc.content = req.body.content;
    doc.author = req.body.author;
    doc.save(); 
  })
  res.redirect('/');
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  UserData.findByIdAndRemove(id).exec() // not fetching any call backs here!
  res.redirect('/');
})

module.exports = router;
