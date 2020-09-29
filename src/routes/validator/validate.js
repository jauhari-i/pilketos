const { check } = require('express-validator');
const { User, Admin } = require('../../models/models');

module.exports = validator = {
  registerUser: [
    check('nama').not().isEmpty().withMessage('Nama tidak boleh kosong'),
    check('email').custom((val) => {
      if (!val) {
        return Promise.reject('Email tidak boleh kosong');
      }
      return User.findOne({ email: val }).then((u) => {
        if (u) {
          return Promise.reject('Email telah dipakai');
        }
      });
    }),
    check('password').not().isEmpty().withMessage('Kata sandi tidak boleh kosong'),
  ],
  registerAdmin: [
    check('nama').not().isEmpty().withMessage('Nama tidak boleh kosong'),
    check('email').custom((val) => {
      if (!val) {
        return Promise.reject('Email tidak boleh kosong');
      }
      return Admin.findOne({ email: val }).then((u) => {
        if (u) {
          return Promise.reject('Email telah dipakai');
        }
      });
    }),
    check('password').not().isEmpty().withMessage('Kata sandi tidak boleh kosong'),
  ],
  registerKandidat: [
    check('nama').not().isEmpty().withMessage('Nama tidak boleh kosong'),
    check('kelas').not().isEmpty().withMessage('Kelas tidak boleh kosong'),
    check('visi').not().isEmpty().withMessage('Visi tidak boleh kosong'),
    check('misi').not().isEmpty().withMessage('Misi tidak boleh kosong'),
  ],
  login: [
    check('email').notEmpty().withMessage('Email tidak boleh kosong'),
    check('password').not().isEmpty().withMessage('Kata sandi tidak boleh kosong'),
  ],
};
