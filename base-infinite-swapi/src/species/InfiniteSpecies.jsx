import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";


const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  console.log(url);
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetching
  } = useInfiniteQuery(
    ["In-species"],
    ({pageParams = initialUrl}) => {return fetchUrl(pageParams);},
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined
    }
  );
    if(isLoading) return <div className="loading">Loading...</div>;
    if(isError) return <div>Error!</div>;

  return (
    <>
      <button onClick={()=>{fetchNextPage()}}>asd</button>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {
          data.pages.map(pageData => 
            pageData.results.map(person=>
                <Species 
                  key={person.name}  
                  name={person.name}
                  language = {person.language}
                  averageLifespan = {person.average_lifespan}
                />
            )  
            
          )
        }
      </InfiniteScroll>
    </>
  );
  
}
