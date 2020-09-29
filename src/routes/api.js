const router = require('express').Router();
const validator = require('./validator/validate');
const authController = require('../controllers/authController');
const basicAuth = require('../middlewares/basicAuth');
const uploadImg = require('../middlewares/uploadImg');

router.get('/', (req, res) => {
  res.redirect('/api/v1');
});

router.get('/v1', (req, res) => {
  res.send('Api pilketos v1');
});

router.post('/v1/register/user', [basicAuth, validator.registerUser], authController.registerUser);
router.post(
  '/v1/register/admin',
  [basicAuth, validator.registerAdmin],
  authController.registerAdmin
);
router.post(
  '/v1/register/kandidat',
  [basicAuth, uploadImg, validator.registerKandidat],
  authController.registerKandidat
);

module.exports = router;
