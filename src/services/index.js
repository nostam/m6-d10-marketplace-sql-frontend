export default {
  getProducts: async (callback) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/products?limit=12`,
        {
          method: "GET",
          headers: { origin: process.env.ORIGIN },
        }
      );
      if (!res.ok) {
        const { errors } = await res.json();
        throw new Error(errors);
      }
      console.log(res);
      const data = await res.json();
      callback(data);
    } catch (error) {
      console.log(error.message);
      callback(error);
    }
  },
};
