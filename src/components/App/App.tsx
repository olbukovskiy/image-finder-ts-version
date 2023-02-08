import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FindImages } from '../../services/API';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { LoadMoreBtn } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Finish } from '../Finish/Finish';

import { AppContainer } from './App.styled';

const KEY = '30885515-e5cd8644896c6a7d3960ad51e';

interface IResponse {
  [props: string]: any;
}

export const App: React.FunctionComponent = () => {
  const [searchError, setsearchError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const [images, setImages] = useState<
    {
      id: string;
      tags: string;
      webformatURL: string;
      largeImageURL: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    (async function fetchData() {
      try {
        setIsLoading(true);
        const newUrl = `?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
        const responseWithTotal: IResponse = await FindImages(newUrl);
        const totalResults: number = responseWithTotal.totalHits;

        const response: {
          id: string;
          tags: string;
          webformatURL: string;
          largeImageURL: string;
        }[] = responseWithTotal.hits;

        if (response.length === 0) {
          toast.error('Nothing found for your request', { autoClose: 3000 });
        }

        const imagesData = response.map(
          ({ id, tags, webformatURL, largeImageURL }) => {
            return {
              id,
              tags,
              webformatURL,
              largeImageURL,
            };
          }
        );

        setImages(prevState => [...prevState, ...imagesData]);
        setTotalResults(totalResults);
        setsearchError(false);
      } catch (error) {
        setsearchError(true);
        console.log(searchError);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page, searchQuery, searchError]);

  const addSearchQuery = (query: string) => {
    if (query.trim().length === 0) {
      toast.warn('Sorry, search field if empty :(', { autoClose: 3000 });
      setImages([]);
      setPage(1);
      setSearchQuery('');
      return;
    }

    if (query.trim().length > 0) {
      setImages([]);
      setPage(1);
      setSearchQuery(query);
    }
  };

  const pageIncrement = () => {
    setPage(prevState => prevState + 1);
  };

  const countTotalPages = (totalResults: number | null) => {
    if (typeof totalResults === 'number') {
      const totalPages = Math.ceil(totalResults / 12);
      return totalPages;
    }
  };

  const positiveResponse = () => {
    toast.success(`Hooray! We found ${totalResults} images.`, {
      autoClose: 3000,
    });
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={addSearchQuery} />
      <ImageGallery images={images} />
      <> {page === 1 && images.length > 0 && positiveResponse()}</>
      {images.length > 0 && countTotalPages(totalResults) !== page && (
        <LoadMoreBtn onClick={pageIncrement} />
      )}
      {isLoading && <Loader />}
      <ToastContainer />
      {page === countTotalPages(totalResults) && <Finish />}
    </AppContainer>
  );
};
