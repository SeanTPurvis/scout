const express = require('express');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

const router = express.Router();

// Mongo URI
const mongoURI = 'mongodb+srv://sean:'+ process.env.MONGO_ATLAS_PW + '@scout-iszaz.mongodb.net/test?retryWrites=true';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });

// POST /upload
// Uploads files to database
router.post('/upload', upload.single('image'), (req, res) => {
    res.json({file: req.file});
});

// GET /files
// Display all files in JSON
router.get('/', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check for files
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }
        return res.json(files);
    });
}); 

// GET /files/:filename
// Display single object in JSON
router.get('/:filename', (req, res) => {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                message: 'No file exists'
            });
        };
        return res.json(file);
    });
});

// GET /image/:filename
// Display image
router.get('/image/:filename', (req, res) => {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                message: 'No file exists'
            });
        };

        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read stream to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(400).json({
                message: 'Not an image'
            })
        }
    });
});

// DELETE /files/:id
// Delete file
router.delete('/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
    });
  });

module.exports = router;