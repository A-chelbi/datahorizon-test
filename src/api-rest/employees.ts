import axios from 'axios';

export const getEmployeesRequest = async () => {
  let data: any = null;
  let error: any = null;
  let status: any = null;

  await axios
    .get(`${process.env.REACT_APP_API_URL}`, {})
    .then((body) => {
      data = body.data;
      status = body.status;
    })
    .catch((err) => (error = err.response.data));

  return { data, error, status };
};
