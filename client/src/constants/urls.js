const baseUrl = process.env.REACT_APP_API_URL;

const urls = {
  ROOT: `${baseUrl}/v1`,
  HOUSE: `${baseUrl}/v1/house`,
  HOUSEOCCUPANT: `${baseUrl}/v1/house-occupant`,
  TRACKERS: `${baseUrl}/v1/trackers`,
  ANNOUNCEMENTS: `${baseUrl}/v1/announcements`,
};

export default urls;
