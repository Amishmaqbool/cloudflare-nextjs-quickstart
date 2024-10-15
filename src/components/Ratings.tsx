/* eslint-disable no-unused-vars */
interface RatingsProps {
  totalRatings: number;
  oneStarRatings?: number;
  twoStarRatings?: number;
  threeStarRatings?: number;
  fourStarRatings?: number;
  fiveStarRatings?: number;
  showTotalOnly?: boolean;
  getStarComponents: (rating: number) => JSX.Element[]; // Allow the function to take a rating argument
}

const Ratings: React.FC<RatingsProps> = ({
  totalRatings,
  oneStarRatings = 0,
  twoStarRatings = 0,
  threeStarRatings = 0,
  fourStarRatings = 0,
  fiveStarRatings = 0,
  showTotalOnly,
  getStarComponents,
}) => {
  const totalRatingsFromStars = totalRatings;

  return (
    <div className={`${showTotalOnly ? "mt-0" : "mt-8"} max-w-full`}>
      {!showTotalOnly && (
        <div className="flex flex-col justify-center">
          <h2 className="text-xl text-center font-semibold">Ratings</h2>
          <div
            className={`${showTotalOnly
                ? "text-sm text-black text-center"
                : "text-center text-[65px] text-black"
              } font-normal`}
          >
            {totalRatingsFromStars === 0
              ? "0.0"
              : totalRatingsFromStars.toFixed(1)}
          </div>
          <div className="flex gap-1 justify-center">
            {getStarComponents(totalRatingsFromStars).map((star, index) => (
              <span className="" key={index}>
                {star}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="my-4 flex gap-4 items-center max-md:flex-col max-md:items-start">
        {!showTotalOnly && (
          <div className="flex-grow max-md:w-full">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3 my-0">
                <span className="font-medium text-[#666666] text-lg">
                  {star}
                </span>
                <div className="w-full bg-gray-200 rounded-none h-3">
                  <div
                    className="bg-[#069669] h-3 rounded-none"
                    style={{
                      width: `${star === 5
                          ? fiveStarRatings
                          : star === 4
                            ? fourStarRatings
                            : star === 3
                              ? threeStarRatings
                              : star === 2
                                ? twoStarRatings
                                : oneStarRatings
                        }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Ratings;
