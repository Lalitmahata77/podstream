import { useGetTopPodcastQuery } from "../redux/api/podcastApiSlice";
import Loader from "./Loader";
import SmallPodcast from "../pages/podcasts/SmallPodcast";
import PodcastCarousel from "../pages/podcasts/PodcastCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopPodcastQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div className="flex justify-around">
        <div className="xl:block lg:hidden md:hidden:sm:hidden">
          <div className="grid grid-cols-2">
            {data.map((podcast) => (
              <div key={podcast._id}>
                <SmallPodcast podcast={podcast} />
              </div>
            ))}
          </div>
        </div>
        <PodcastCarousel />
      </div>
    </>
  );
};

export default Header;