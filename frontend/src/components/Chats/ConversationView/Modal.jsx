import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Notepad from "../../../assets/Notepad.png";
import { useEffect, useRef, useState } from "react";
export const Modal = ({ message, setMorePicture, morePictureIndex }) => {
  const carouselRef = useRef(null);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const myCustomGoToSlide = () => {
      if (carouselRef.current) {
        carouselRef.current.goToSlide(morePictureIndex + 2, true);
      }
    };
    setTimeout(() => {
      myCustomGoToSlide(morePictureIndex);
      setHidden(true);
    }, 1000);
  }, [morePictureIndex]);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1025 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 769 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 768, min: 641 },
      items: 1,
    },
    mobileBelow: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  const CustomDot = ({ index, onClick, active }) => {
    return (
      <li
        style={{
          background: active ? "#0074cc" : "#c4c4c4",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          display: "inline-block",
          margin: "10px 5px",
          cursor: "pointer",
        }}
        onClick={() => onClick()}
      />
    );
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md z-50 ">
      <div className="flex justify-end pr-5 pt-2">
        {/* <div onClick={()=>setMorePicture(false)}>X mekis</div> */}
        <span className="cursor-pointer text-gray-500 hover:text-gray-700 transition duration-300">
          <i
            onClick={() => {
              setMorePicture(false);
              setHidden(false);
            }}
            className="fa-solid fa-x"
          ></i>
        </span>
      </div>
      <div className="flex h-[90vh] justify-center items-center">
        <div
          className={`container mx-auto px-3  sm:px-10 2xl:px-0 ${
            hidden ? "" : "hidden"
          }`}
        >
          <Carousel
            ref={carouselRef}
            responsive={responsive}
            autoPlay={false}
            infinite={true}
            customDot={<CustomDot />}
            autoPlaySpeed={2000}
            draggable={true}
            swipeable={true}
            stopOnHover={true}
            additionalTransfrom={0}
            arrows
            centerMode={false}
            className=""
            containerClass="container"
            dotListClass=""
            focusOnSelect={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots
            sliderClass=""
            slidesToSlide={1}
          >
            {message.map((url, index) => {
              if (url.category === "image") {
                return (
                  <div
                    key={index}
                    className="w-full h-[90vh] lg:h-[95vh] flex justify-center items-center"
                  >
                    <img
                      className="h-[80vh] object-contain w-full rounded-3xl bg-gray-800 py-5"
                      src={url.url}
                      alt={url.url}
                    />
                  </div>
                );
              } else if (url.category === "video") {
                return (
                  <div
                    key={index}
                    className="w-full h-[90vh] lg:h-[95vh] flex justify-center items-center "
                  >
                    <video
                      controls
                      className="h-[70vh] object-contain w-full bg-black rounded-3xl"
                    >
                      <source src={url.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                );
              } else if (url.category === "documents") {
                const isExcelFile = url.url.endsWith(".xlsx");
                const isCsv = url.url.endsWith(".csv");
                const isWordFile = url.url.endsWith(".docx");
                const isPowerPointFile = url.url.endsWith(".pptx");
                const isTextFile = url.url.endsWith(".txt");

                return (
                  <div
                    key={index}
                    className="w-full h-[90vh] flex justify-center items-center bg-gray-800 lg:h-[95vh] "
                  >
                    <div>
                      {isExcelFile ? (
                        <span className="text-[10rem]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="100%"
                            height="100%"
                          >
                            <defs>
                              <linearGradient
                                id="G7C1BuhajJQaEWHVlNUzHa"
                                x1="6"
                                x2="27"
                                y1="24"
                                y2="24"
                                data-name="Безымянный градиент 10"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop offset="0" stopColor="#21ad64" />
                                <stop offset="1" stopColor="#088242" />
                              </linearGradient>
                            </defs>
                            <path
                              fill="#31c447"
                              d="m41,10h-16v28h16c.55,0,1-.45,1-1V11c0-.55-.45-1-1-1Z"
                            />
                            <path
                              fill="#fff"
                              d="m32,15h7v3h-7v-3Zm0,10h7v3h-7v-3Zm0,5h7v3h-7v-3Zm0-10h7v3h-7v-3Zm-7-5h5v3h-5v-3Zm0,10h5v3h-5v-3Zm0,5h5v3h-5v-3Zm0-10h5v3h-5v-3Z"
                            />
                            <path
                              fill="url(#G7C1BuhajJQaEWHVlNUzHa)"
                              d="m27,42l-21-4V10l21-4v36Z"
                            />
                            <path
                              fill="#fff"
                              d="m19.13,31l-2.41-4.56c-.09-.17-.19-.48-.28-.94h-.04c-.05.22-.15.54-.32.98l-2.42,4.52h-3.76l4.46-7-4.08-7h3.84l2,4.2c.16.33.3.73.42,1.18h.04c.08-.27.22-.68.44-1.22l2.23-4.16h3.51l-4.2,6.94,4.32,7.06h-3.74Z"
                            />
                          </svg>
                        </span>
                      ) : isCsv ? 
                      (
                        <span className="text-[10rem]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="100%"
                            height="100%"
                          >
                            <defs>
                              <linearGradient
                                id="G7C1BuhajJQaEWHVlNUzHa"
                                x1="6"
                                x2="27"
                                y1="24"
                                y2="24"
                                data-name="Безымянный градиент 10"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop offset="0" stopColor="#21ad64" />
                                <stop offset="1" stopColor="#088242" />
                              </linearGradient>
                            </defs>
                            <path
                              fill="#31c447"
                              d="m41,10h-16v28h16c.55,0,1-.45,1-1V11c0-.55-.45-1-1-1Z"
                            />
                            <path
                              fill="#fff"
                              d="m32,15h7v3h-7v-3Zm0,10h7v3h-7v-3Zm0,5h7v3h-7v-3Zm0-10h7v3h-7v-3Zm-7-5h5v3h-5v-3Zm0,10h5v3h-5v-3Zm0,5h5v3h-5v-3Zm0-10h5v3h-5v-3Z"
                            />
                            <path
                              fill="url(#G7C1BuhajJQaEWHVlNUzHa)"
                              d="m27,42l-21-4V10l21-4v36Z"
                            />
                            <path
                              fill="#fff"
                              d="m19.13,31l-2.41-4.56c-.09-.17-.19-.48-.28-.94h-.04c-.05.22-.15.54-.32.98l-2.42,4.52h-3.76l4.46-7-4.08-7h3.84l2,4.2c.16.33.3.73.42,1.18h.04c.08-.27.22-.68.44-1.22l2.23-4.16h3.51l-4.2,6.94,4.32,7.06h-3.74Z"
                            />
                          </svg>
                        </span>
                        ) : isWordFile ? (
                        <span className="text-[10rem]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="100%"
                            height="100%"
                          >
                            <defs>
                              <linearGradient
                                id="yURKxjsGzuO2sJnz7bo6Na"
                                x1="25"
                                x2="42"
                                y1="24"
                                y2="24"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop offset="0" stopColor="#33bef0" />
                                <stop offset="1" stopColor="#22a5e2" />
                              </linearGradient>
                              <linearGradient
                                id="yURKxjsGzuO2sJnz7bo6Nb"
                                x1="29.53"
                                x2="4.68"
                                y1="24"
                                y2="24"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop offset=".11" stopColor="#0d62ab" />
                                <stop offset="1" stopColor="#007ad9" />
                              </linearGradient>
                            </defs>
                            <path
                              fill="url(#yURKxjsGzuO2sJnz7bo6Na)"
                              d="m41,10h-16v28h16c.55,0,1-.45,1-1V11c0-.55-.45-1-1-1Z"
                            />
                            <path
                              fill="#fff"
                              d="m25,15h14v2h-14v-2Zm0,4h14v2h-14v-2Zm0,4h14v2h-14v-2Zm0,4h14v2h-14v-2Zm0,4h14v2h-14v-2Z"
                            />
                            <path
                              fill="url(#yURKxjsGzuO2sJnz7bo6Nb)"
                              d="m27,42l-21-4V10l21-4v36Z"
                            />
                            <path
                              fill="#fff"
                              d="m21.17,31.01h-2.72l-1.8-8.99c-.1-.48-.16-1-.17-1.58h-.03c-.04.64-.11,1.16-.2,1.58l-1.85,8.99h-2.83l-2.86-14.01h2.68l1.54,9.33c.06.4.11.94.14,1.61h.04c.02-.5.1-1.05.22-1.65l1.97-9.29h2.62l1.78,9.4c.06.35.12.85.17,1.51h.03c.02-.51.07-1.03.16-1.56l1.5-9.35h2.47l-2.87,14.02Z"
                            />
                          </svg>
                        </span>
                      ) : isTextFile ? (
                        <div className="h-full w-full">
                          <img src={Notepad} alt="" className="h-[200px]" />
                        </div>
                      ) : isPowerPointFile ? (
                        <span className="text-[10rem]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="100%"
                            height="100%"
                          >
                            <path
                              fill="#FF8A65"
                              d="M41,10H25v28h16c0.553,0,1-0.447,1-1V11C42,10.447,41.553,10,41,10z"
                            />
                            <path
                              fill="#FBE9E7"
                              d="M24 29H38V31H24zM24 33H38V35H24zM30 15c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.687 6-6h-6V15z"
                            />
                            <path
                              fill="#FBE9E7"
                              d="M32,13v6h6C38,15.687,35.313,13,32,13z"
                            />
                            <path fill="#E64A19" d="M27 42L6 38 6 10 27 6z" />
                            <path
                              fill="#FFF"
                              d="M16.828,17H12v14h3v-4.823h1.552c1.655,0,2.976-0.436,3.965-1.304c0.988-0.869,1.484-2.007,1.482-3.412C22,18.487,20.275,17,16.828,17z M16.294,23.785H15v-4.364h1.294c1.641,0,2.461,0.72,2.461,2.158C18.755,23.051,17.935,23.785,16.294,23.785z"
                            />
                          </svg>
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <a
                      href={url.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white pt-40"
                    >
                      <span>
                        <i className="fa-solid fa-download"></i>
                      </span>
                    </a>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};
