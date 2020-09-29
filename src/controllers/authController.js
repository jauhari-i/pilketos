const authService = require('../services/authServices');
const { validationResult } = require('express-validator');

module.exports = authControllers = {
  registerUser: async (req, res) => {
    const err = validationResult(req);
    if (err.errors.length) {
      let messages = err.errors.map((m) => ({
        msg: m.msg,
      }));
      res.status(400).json(messages);
    } else {
      const { nama, email, password } = req.body;
      const query = await authService.registerUser({ nama, email, password });
      if (query) {
        if (!query.code) {
          return res.status(500).json('Internal server error');
        }
        return res.status(query.code).json(query);
      }
      res.status(500).json('Internal server error');
    }
  },
  registerAdmin: async (req, res) => {
    const err = validationResult(req);
    if (err.errors.length) {
      let messages = err.errors.map((m) => ({
        msg: m.msg,
      }));
      res.status(400).json(messages);
    } else {
      const { nama, email, password } = req.body;
      const query = await authService.registerAdmin({ nama, email, password });
      if (query) {
        if (!query.code) {
          return res.status(500).json('Internal server error');
        }
        return res.status(query.code).json(query);
      }
      res.status(500).json('Internal server error');
    }
  },
  registerKandidat: async (req, res) => {
    const err = validationResult(req);
    if (err.errors.length) {
      let messages = err.errors.map((m) => ({
        msg: m.msg,
      }));
      res.status(400).json(messages);
    } else {
      const { nama, kelas, visi, misi } = req.body;
      const foto = req.file;
      const query = await authService.registerKandidat({ nama, kelas, visi, misi, foto });
      if (query) {
        if (!query.code) {
          return res.status(500).json('Internal server error');
        }
        return res.status(query.code).json(query);
      }
      res.status(500).json('Internal server error');
    }
  },
  loginUser: async (req, res) => {},
  loginAdmin: async (req, res) => {},
};
