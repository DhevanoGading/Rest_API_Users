module.exports = {
  paginatedResult: async (model, page, limit) => {
    try {
      const offset = (page - 1) * limit;

      const results = {};

      const { rows, count } = await model.findAndCountAll({
        limit: limit,
        offset: offset,
      });

      results.results = rows;

      if (offset > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }

      const totalPages = Math.ceil(count / limit);

      if (page < totalPages) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }

      return results;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
