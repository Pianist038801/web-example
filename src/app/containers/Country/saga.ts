import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from './actions';

export function* fetchCountry(action) {
  const requestURL = `https://api.carerev.com/api/v1/countries/${action.payload.id}`;

  try {
    const country = yield call(request, requestURL);
    if (country) yield put(actions.fetchCountrySuccess(country));
  } catch (err) {
    yield put(actions.fetchCountryError(err.toString()));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* saga() {
  yield takeLatest(actions.fetchCountry.type, fetchCountry);
}
