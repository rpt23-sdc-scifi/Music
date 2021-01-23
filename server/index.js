require('newrelic');
const redis = require('redis');
const express = require('express');
const songData = require('../songData');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const expressStaticGzip = require('express-static-gzip');
const port = 3005;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const client = path.join(__dirname, '/../client');
app.use('/', expressStaticGzip(client, {
  enableBrotli: true,
   orderPreference: ['br', 'gz'],
   setHeaders: function (res) {
      res.setHeader("Cache-Control", "public, max-age=31536000");
   }
}))
const router = require('./routes.js');
app.use('/api', router);

app.use(cors());

app.get('/:current', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
})

app.listen(port, () => {
  console.log('Server is listening at http://localhost:' + port)
});



// INCLUDE "try" AND "catch" IN THE ASYNC AWAIT BELOW
// This is for Mongo Client
// app.get('/songdata/:id', async (req, res) => {
//   try {
//     let id = req.params.id;
//     if (id > 100 || id < 0) {
//       res.end('SONG DOES NOT EXIST');
//     } else {
//       const findSongByID = await songData.findSong(id)
//       res.send(findSongByID);
//     }
//   } catch (error) {
//     console.log(error)
//   }
// });

// app.delete('/songdata/:id', async (req, res) => {
//   try {
//     let id = req.params.id;
//     if (id > 100 || id < 0) {
//       res.end('SONG DOES NOT EXIST');
//     } else {
//       const deletedSongByID = await songData.deleteOneSong(id)
//       res.send(deletedSongByID);
//     }
//   } catch (error) {
//     console.log(error)
//   }
// })

// app.delete('/all', async (req, res) => {
//   try {
//     let id = req.params.id;
//     if (id > 100 || id < 0) {
//       res.end('SONG DOES NOT EXIST');
//     } else {
//       const deleted = await songData.deleteSongs()
//       res.send(deleted);
//     }
//   } catch (error) {
//     console.log(error)
//   }
// })

// app.get('/songsByBandID/:id', async (req, res) => {
//   try {
//     let bandID = req.params.id;
//     if (bandID > 30 || bandID < 0) {
//       res.end('BAND ID DOES NOT EXIST');
//     } else {
//       const findSongsByBand = await songData.findSongsByBand(bandID)
//       res.send(findSongsByBand);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// })

// // all data must be in json string format
// app.post('/songdata/new', async (req, res) => {
//   try {
//     let dataToBeSaved = req.body;
//     console.log(req.body)
//     const saved = await songData.saveSong(dataToBeSaved)
//     res.send(saved);
//   } catch (error) {
//     console.log(error)
//   }
// });

// app.put('/songdata/:id', async (req, res) => {
//   try {
//     let id = req.params.id;
//     let name = req.body.songName
//     let length = req.body.songLength
//     let url = req.body.songURL
//     let image = req.body.songImage
//     let band = req.body.bandID
//     if (id > 100 || id < 0) {
//       res.end('SONG DOES NOT EXIST');
//     } else {
//       const changeSong= await songData.changeSong(id, name, length, url, image, band)
//       res.send(changeSong);
//     }
//   } catch (error) {
//     console.log(error)
//   }
// });
