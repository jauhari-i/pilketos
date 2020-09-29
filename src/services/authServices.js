const { User, Kandidat, Admin } = require('../models/models');
const crypt = require('bcryptjs');
const { v4: uuid } = require('uuid');

module.exports = authServices = {
  registerUser: async (data) => {
    try {
      const encPass = await crypt.hash(data.password, 10);
      if (!encPass) {
        throw {
          message: 'Failed to encrypt password',
          code: 500,
        };
      }
      const user = await User.create({
        uuid: uuid(),
        nama: data.nama,
        email: data.email,
        password: encPass,
      });
      if (!user) {
        throw {
          message: 'Failed to register user',
          code: 500,
        };
      }
      return {
        message: 'Register user success',
        data: {
          uuid: user.uuid,
          nama: user.nama,
          email: user.email,
        },
        code: 201,
      };
    } catch (error) {
      return error;
    }
  },
  registerAdmin: async (data) => {
    try {
      const encPass = await crypt.hash(data.password, 10);
      if (!encPass) {
        throw {
          message: 'Failed to encrypt password',
          code: 500,
        };
      }
      const admin = await Admin.create({
        uuid: uuid(),
        nama: data.nama,
        email: data.email,
        password: encPass,
      });
      if (!admin) {
        throw {
          message: 'Failed to register admin',
          code: 500,
        };
      }
      return {
        message: 'Register Admin Success',
        data: {
          uuid: admin.uuid,
          nama: admin.nama,
          email: admin.email,
        },
        code: 201,
      };
    } catch (error) {
      return error;
    }
  },
  registerKandidat: async (data) => {
    console.log(data.foto.filename);
    try {
      const kandidat = await Kandidat.create({
        uuid: uuid(),
        nama: data.nama,
        kelas: data.kelas,
        visi: data.visi,
        misi: data.misi,
        foto: data.foto.filename,
        voter: 0,
      });
      if (!kandidat) {
        throw {
          message: 'Failed to register kandidat',
          code: 500,
        };
      }
      return {
        message: 'Register kandidat success',
        data: {
          uuid: kandidat.uuid,
          nama: kandidat.nama,
          kelas: kandidat.kelas,
          visi: kandidat.visi,
          misi: kandidat.misi,
        },
        code: 201,
      };
    } catch (error) {
      return error;
    }
  },
};
