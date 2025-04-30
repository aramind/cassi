const APP_STATE_KEY = "myAppState";

export const getAppState = () => {
  const raw = localStorage.getItem(APP_STATE_KEY);
  return raw ? JSON.parse(raw) : {};
};

export const getAppStateValue = (path) => {
  const state = getAppState();
  const segments = path?.split(".");
  let curr = state;

  for (let segment of segments) {
    if (!curr || typeof curr !== "object") return undefined;
    curr = curr[segment];
  }

  return curr;
};

export const updateAppState = (path, value) => {
  const state = getAppState();
  const segments = path.split(".");
  let curr = state;

  for (let i = 0; i < segments.length - 1; i++) {
    const segment = segments[i];
    curr[segment] = curr[segment] || {};
    curr = curr[segment];
  }

  curr[segments.at(-1)] = value;
  localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
};

export const deleteAppStateValue = (path) => {
  const state = getAppState();

  const segments = path.split(".");
  let curr = state;

  for (let i = 0; i < segments.length - 1; i++) {
    const segment = segments[i];
    if (!(segment in curr)) return;
    curr = curr[segment];
  }

  delete curr[segments.at(-1)];
  localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
};
