type errorType = {
  message:string,
  status?: number
}

const createError = (status: number, message: string) => {
  const err:errorType = new Error();
  err.message = message;
  err.status =status;
  return err;
};
module.exports = createError;
