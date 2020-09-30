const router = require('express').Router();
const path = require('path');
const validator = require('./validator/validate');
const authController = require('../controllers/authController');
const basicAuth = require('../middlewares/basicAuth');
const uploadImg = require('../middlewares/uploadImg');
const requireAuth = require('../configs/requireAuth');
const isAdmin = require('../configs/isAdmin');

router.get('/', (req, res) => {
  res.redirect('/api/v1');
});

router.get('/v1', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/', 'index.html'));
});

router.post('/v1/register/user', [basicAuth, validator.registerUser], authController.registerUser);
router.post(
  '/v1/register/admin',
  [basicAuth, validator.registerAdmin],
  authController.registerAdmin
);
router.post(
  '/v1/register/kandidat',
  [requireAuth, isAdmin, uploadImg, validator.registerKandidat],
  authController.registerKandidat
);
router.post('/v1/login/user', [basicAuth, validator.login], authController.loginUser);
router.post('/v1/login/admin', [basicAuth, validator.login], authController.loginAdmin);

module.exports = router;
