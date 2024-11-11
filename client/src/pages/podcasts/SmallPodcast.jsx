import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";


const SmallPodcast = ({ podcast }) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3">
      <div className="relative">
        <img
          src={podcast.image}
          alt={podcast.name}
          className="h-auto rounded"
        />
        <HeartIcon podcast={podcast} />
      </div>

      <div className="p-4">
        <Link to={`/product/${podcast._id}`}>
          <h2 className="flex justify-between items-center">
            <div>{podcast.name}</div>
           
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallPodcast