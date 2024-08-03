

const catchAsync = (fn) => {
  return async (...args) => {
    try {
      const response = await fn(...args);
      return response;
    } catch (error) {
      if ((error ).response.data.redirectTo) {
        const redirect = (error ).response.data.redirectTo;
        window.location.href = `${redirect}`;
      }
      console.error("An error occurred:", error);
    }
  };
};

export default catchAsync;
