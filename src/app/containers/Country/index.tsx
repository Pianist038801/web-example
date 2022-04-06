import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { saga } from './saga';
import { key, countryReducer } from './reducer';
import { actions } from './actions';
import { selectCountry, selectLoading, selectError } from './selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { PageWrapper } from 'app/components/PageWrapper';

export function Country() {
  useInjectReducer({ key: key, reducer: countryReducer });
  useInjectSaga({ key: key, saga });

  const { id }: { id: string } = useParams();
  const country = useSelector(selectCountry);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchCountry(id));
  }, [dispatch, id]);

  return (
    <PageWrapper>
      {isLoading && <LoadingIndicator small />}
      {country ? (
        <List>
          <div>name: {country.name}</div>
          <div>currency code: {country.currency_code}</div>
        </List>
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : null}
    </PageWrapper>
  );
}

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const List = styled.div``;
