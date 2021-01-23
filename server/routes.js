//router.get
//router.put
//router.delete

const router = require ('express').Router();
const controller = require('./controller.js');

router.get('/songdata/:id', controller.songs);
router.put('/songdata/:id', controller.update);
router.post('/songdata/new', controller.insert);
router.delete('/songdata/:id', controller.deleter);
router.get('/banddata/:band_id', controller.band);

module.exports = router;