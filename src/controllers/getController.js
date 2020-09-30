const getServices = require('../services/getServices');

module.exports = getController = {
  getUser: async (req, res) => {
    const query = await getServices.getUser();
    if (query) {
      if (!query.code) {
        return res.status(500).json('Internal server error');
      }
      return res.status(query.code).json(query);
    }
    res.status(500).json('Internal server error');
  },
  getKandidat: async (req, res) => {
    const query = await getServices.getKandidat();
    if (query) {
      if (!query.code) {
        return res.status(500).json('Internal server error');
      }
      return res.status(query.code).json(query);
    }
    res.status(500).json('Internal server error');
  },
};
