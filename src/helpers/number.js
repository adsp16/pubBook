export const randomCode = () => {
  const randomCode = (Math.floor(Math.random() * 10000) + 10000)
    .toString()
    .substring(1);

  return randomCode;
};
