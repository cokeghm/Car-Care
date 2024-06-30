const express = require('express');
const mongoose = require('mongoose');

module.exports = (gfs) => {
  const router = express.Router();

  // Obtener todos los archivos en GridFS
  router.get('/', async (req, res) => {
    try {
      gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({
            err: 'No files exist',
          });
        }
        res.json(files);
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  // Descargar un archivo por ID
  router.get('/:id', async (req, res) => {
    try {
      const file = await gfs.files.findOne({ _id: mongoose.Types.ObjectId(req.params.id) });
      if (!file) {
        return res.status(404).json({ err: 'No file exists' });
      }

      const readstream = gfs.createReadStream(file.filename);
      readstream.on('error', (err) => {
        res.status(500).send(err);
      });
      readstream.pipe(res);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  return router;
};