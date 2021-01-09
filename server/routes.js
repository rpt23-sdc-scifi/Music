//router.get
//router.put
//router.delete

const router = require ('express').Router();
const controller = require('./controller.js');

router.get('/song/:id', controller.songs);
router.put('/song/:id', controller.update);
router.post('/song/new', controller.insert);
router.delete('/song/:id', controller.deleter);
router.get('/band/:band_id', controller.band);

module.exports = router;