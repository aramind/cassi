const baseUrl = process.env.REACT_APP_API_URL;

const urls = {
  ROOT: `${baseUrl}/v1`,
  HOUSE: `${baseUrl}/v1/house`,
  HOUSEOCCUPANT: `${baseUrl}/v1/house-occupant`,
};

export default urls;
