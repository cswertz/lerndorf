import { saveAs } from 'file-saver';
import * as types from './constants';

export const logsFetchSuccess = (items) => ({
  type: types.LOGS_FETCH_SUCCESS,
  items,
});

const sanitizeFilters = (filters) => {
  const validFilters = {};
  const keys = Object.keys(filters);
  for (let i = 0; i < keys.length; i += 1) {
    if (filters[keys[i]] != null && filters[keys[i]] !== -1) {
      validFilters[keys[i]] = filters[keys[i]];
    }
  }

  return validFilters;
};

export const logsFetch = (filters) => async (dispatch) => {
  try {
    const query = new URLSearchParams(sanitizeFilters(filters));
    const response = await fetch(`/api/logs?${query}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const json = await response.json();
    if (json) {
      if (json.error) {
        // dispatch(userEditFailed(json.error, json.errors));
      } else {
        dispatch(logsFetchSuccess(json));
      }
    }
  } catch (e) {
    console.log('Error while fetching logs:', e);
  }
};

export const logsDownload = (filters) => async () => {
  try {
    const query = new URLSearchParams(sanitizeFilters(filters));
    const response = await fetch(`/api/logs/export?${query}`, {
      method: 'GET',
      headers: {
        Accept: 'text/csv',
        'Content-Type': 'text/csv',
      },
      credentials: 'include',
      responseType: 'blob',
    });
    const blob = await response.blob();
    saveAs(blob, 'export.csv');
  } catch (e) {
    console.log('Error while downloading logs:', e);
  }
};
