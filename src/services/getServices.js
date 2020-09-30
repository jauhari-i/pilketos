const { User, Kandidat, Admin } = require('../models/models');

module.exports = getServices = {
  getUser: async () => {
    try {
      const users = await User.find();
      if (!users) {
        throw {
          message: 'Failed to fetch users',
          code: 500,
        };
      }
      return {
        message: 'Get user data success',
        data: {
          users: users.map((u) => ({
            uuid: u.uuid,
            nama: u.nama,
            email: u.email,
            voted: u.voted,
          })),
        },
        code: 200,
      };
    } catch (error) {
      return error;
    }
  },
  getKandidat: async () => {
    try {
      const kandidats = await Kandidat.find();
      if (!kandidats) {
        throw {
          message: 'Failed to fetch kandidat',
          code: 500,
        };
      }
      return {
        message: 'Get kandidat data success',
        data: {
          kandidat: kandidats.map((k) => ({
            uuid: k.uuid,
            nama: k.nama,
            visi: k.visi,
            misi: k.misi,
            kelas: k.kelas,
          })),
        },
        code: 200,
      };
    } catch (error) {
      return error;
    }
  },
};
