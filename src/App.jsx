import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { fetchQuery } from 'components/API';
import { MutatingDots } from 'react-loader-spinner';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/LoadMoreBtn/LoadMoreButton';

export const App = () => {

  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalHit, setTotalHit] = useState(0);

  const handleNewRequest = value => {
    setQuery(`${Date.now()}/${value}`);
    setImages([]);
    setPage(1);
  };

  const handleSabmit = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (page && query) {
        try {
          setLoading(true);
          setError(false);

          const sliceQuery = query.split('/')[1];
          const resultQuery = await fetchQuery(sliceQuery, page);

          setImages(prevImage => [...prevImage, ...resultQuery.hits]);
          setTotalHit(resultQuery.totalHits);

          if (resultQuery.hits.length === 0) {
            toast.error(
              'Sorry, there are no photos for this request. Try it differently.'
            );
          }
        } catch (error) {
          setError(true);
          toast.error(
            'There was an error with your request, try reloading the page.'
          );
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [page, query]);

  const loadingImage = images.length < totalHit;

  return (
    <div>
      <Searchbar onSubmit={handleNewRequest}></Searchbar>
      {isLoading && (
        <div>
          <MutatingDots
            height="100"
            width="100"
            color="#3d54c9"
            secondaryColor="#3d54c9"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      )}
      
      {images.length !== 0 && <ImageGallery hits={images} />}
      {loadingImage && !isLoading && <Button click={handleSabmit} />}
      <Toaster position="top-right" />
    </div>

  );
};
