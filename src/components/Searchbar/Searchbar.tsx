import React from 'react';
import { Formik } from 'formik';

import {
  SearchbarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
  SearchIcon,
} from './Searchbar.styled';

const initialValues = { searchField: '' };

interface IProps {
  onSubmit: (query: string) => void;
}

export const Searchbar: React.FunctionComponent<IProps> = function ({
  onSubmit,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        onSubmit(values.searchField);
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {({ isSubmitting }) => {
        return (
          <SearchbarContainer>
            <SearchForm>
              <SearchFormButton type="submit" disabled={isSubmitting}>
                <SearchIcon />
                <SearchFormButtonLabel>Search</SearchFormButtonLabel>
              </SearchFormButton>
              <SearchFormInput
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                name="searchField"
              ></SearchFormInput>
            </SearchForm>
          </SearchbarContainer>
        );
      }}
    </Formik>
  );
};
