import { Link, useParams } from "react-router-dom";
import { useGetPodcastQuery } from "./redux/api/podcastApiSlice";
import Loader from "./components/Loader";
import Message from "./components/Message";
import Header from "./components/Header";
import Podcast from "./pages/podcasts/Podcast";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetPodcastQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
              Special Podcast
            </h1>

            {/* <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
            >
              Shop
            </Link> */}
          </div>

          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.podcasts.map((podcast) => (
                <div key={podcast._id}>
                  <Podcast podcast={podcast} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;