const { User, Kandidat, Admin } = require('../models/models');
const crypt = require('bcryptjs');
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');

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
  loginUser: async (data) => {
    try {
      const user = await User.findOne({ email: data.email });
      if (!user) {
        throw {
          message: 'Email not found',
          code: 404,
        };
      }
      const comparePass = await crypt.compare(data.password, user.password);
      if (!comparePass) {
        throw {
          message: 'Wrong password',
          code: 400,
        };
      }
      const token = jwt.sign(
        {
          sub: user.uuid,
          role: 0,
          voted: user.voted,
        },
        'pilketos',
        { expiresIn: '24h' }
      );
      return {
        message: 'Login user success',
        data: {
          accessToken: token,
        },
        code: 200,
      };
    } catch (error) {
      return error;
    }
  },
  loginAdmin: async (data) => {
    try {
      const admin = await Admin.findOne({ email: data.email });
      if (!admin) {
        throw {
          message: 'Email not found',
          code: 404,
        };
      }
      const comparePass = await crypt.compare(data.password, admin.password);
      if (!comparePass) {
        throw {
          message: 'Wrong password',
          code: 400,
        };
      }
      const token = jwt.sign(
        {
          sub: admin.uuid,
          role: 1,
        },
        'pilketos',
        { expiresIn: '24h' }
      );
      return {
        message: 'Login admin success',
        data: {
          accessToken: token,
        },
        code: 200,
      };
    } catch (error) {
      return error;
    }
  },
};
