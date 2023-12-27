import Cookies from "js-cookie";

export const useToken = () => {
  const token = Cookies.get('token');

  return { token };
};
