import { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
// IMPORT COMPONENTS
import { Modal } from "../../components/Modal/Modal";
import { useParams } from "react-router-dom";

export const Image = (data) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { province, municipality, barangay } = useParams();
  const [intro, setIntro] = useState(
    <div className="flex justify-center items-center text-center h-[60vh]">
      <ThreeDots
        height={200}
        width={200}
        color="#4fa94d"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
  const details = data.data;

  const globalUrl = process.env.REACT_APP_GLOBAL_URL;
  // console.log(details);
  const fetchPosts = async () => {
    try {
      const header = {
        "Content-Type": "application/json",
        "x-auth-token": process.env.REACT_APP_X_AUTH_TOKEN,
      };

      const response = await axios.get(`${globalUrl}/blogposts/retrieveAll`, {
        headers: header,
      });
      switch (data.type) {
        // municipality news
        case "municipalityNews":
          setPosts(
            response.data
              .reverse()
              .filter((el) => {
                return el.municipality === details.title;
              })
              .filter((el) => {
                return el.type === "news";
              })
          );
          break;
        // municipalityannouncements
        case "municipalityAnnouncement":
          setPosts(
            response.data
              .reverse()
              .filter((el) => {
                return el.municipality === details.title;
              })
              .filter((el) => {
                return el.type === "announcement";
              })
              .filter((el) => {
                return el.barangay === "";
              })
          );
          break;
        // barangaynews
        case "barangayNews":
          setPosts(
            response.data
              .reverse()
              .filter((el) => {
                return (
                  el.barangay === details.title ||
                  (el.barangay === "" &&
                    el.municipality === details.municipality)
                );
              })
              .filter((el) => {
                return el.type === "news";
              })
          );
          break;
        // case "barangayAnnouncement":
        //   setPosts(
        //     response.data.reverse().filter((el) => {
        //       return el.barangay === details.title;
        //     })
        //   );
        //   break;

        default:
          break;
      }

      if (response.data.length < 1) {
        setTimeout(() => {
          setIntro(
            <div className="py-28 flex justify-center items-center text-center col-span-1 md:col-span-3 lg:col-span-3 h-[60vh]">
              <p className="text-3xl">
                There are no barangay activities available
              </p>
            </div>
          );
        }, 1000);
      } else {
        setTimeout(() => {
          if (posts.length < 1) {
            setIntro(
              <div className="py-28 flex justify-center items-center text-center col-span-1 md:col-span-3 lg:col-span-3 h-[60vh]">
                <p className="text-3xl">
                  There are no barangay activities available in this area.
                </p>
              </div>
            );
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchPosts();
    }, 800);
  }, []);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };
  useEffect(() => {
    // Ensure that the scroll behavior is reverted when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const itemsPerPage = 5;

  const indexOfLastImage = currentPage * itemsPerPage;
  const indexOfFirstImage = indexOfLastImage - itemsPerPage;

  const currentPosts = posts.slice(indexOfFirstImage, indexOfLastImage);

  const goToNextPage = () => {
    if (posts !== false) {
      if (currentPage < Math.ceil(posts.length / itemsPerPage)) {
        setCurrentPage(currentPage + 1);
        window.scrollTo(0, 0);
      }
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <section>
        <div className="container mx-auto px-3">
          {posts && (
            <section
              id="sponsors"
              className="font-poppins  pb-10 md:px-5 lg:px-0 "
            >
              <div className="container mx-auto">
                {currentPosts.length > 0 ? (
                  currentPosts.map((post, index) => {
                    return (
                      <div
                        key={index}
                        className="dark:bg-darkModeGray overflow-hidden grid grid-cols-4 lg:grid-cols-12 py-10 my-5 px-5 border-2 dark:border-none rounded-3xl gap-10"
                      >
                        <div className="col-span-4 lg:col-span-4 flex justify-center items-center h-[250px] sm:h-[350px] md:h-[400px] lg:h-[300px]">
                          {post.category === "image" ? (
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              className="bg-gray-200 rounded-3xl object-contain h-full"
                            />
                          ) : (
                            <video
                              controls
                              className="bg-black rounded-3xl w-full h-full object-contain"
                            >
                              <source src={post.imageUrl} type="video/mp4" />
                            </video>
                          )}
                        </div>
                        <div className="col-span-4 flex flex-col justify-around md:px-5 md:py-5 overflow-hidden lg:col-span-8 ">
                          <div>
                            <h3 className="text-xl font-bold md:text-3xl">
                              {post.title.length > 40
                                ? post.title.slice(0, 40) + "..."
                                : post.title}
                            </h3>
                            <p className="italic text-[.8rem]">
                              {post.date.slice(0, 10)} -{" "}
                              {post.barangay !== ""
                                ? `Barangay ${post.barangay}`
                                : post.municipality !== ""
                                ? `${post.municipality} Municipality`
                                : post.province !== ""
                                ? `${post.province} Province`
                                : "Bicol 1 Community Admin"}
                            </p>
                          </div>
                          <p>
                            {post.description.length > 100
                              ? post.description.slice(0, 100) + "..."
                              : post.description}
                          </p>
                          <div className="mt-5">
                            <div className="flex justify-end">
                              <span
                                onClick={() => openModal(post)}
                                className="btn text-white hover:cursor-pointer text-sm"
                              >
                                Read More
                              </span>
                            </div>
                            {isModalOpen && selectedPost && (
                              <Modal data={selectedPost} onClose={closeModal} />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : currentPosts.length > 0 ? (
                  <div></div>
                ) : (
                  intro
                )}

                <div className="flex justify-center items-center pt-5">
                  {posts.length > itemsPerPage && (
                    <div className="flex gap-5 pt-20 sm:gap-10">
                      {currentPage !== 1 ? (
                        <button
                          className="text-[.8rem] sm:text-[1rem] bg-primary px-2 py-2 rounded-lg flex justify-center items-center hover:bg-transparent border border-primary w-[6rem]"
                          onClick={goToPrevPage}
                        >
                          Previous
                        </button>
                      ) : (
                        <button className="text-[.8rem] sm:text-[1rem] bg-gray-500 px-2 py-2 rounded-lg flex justify-center items-center w-[6rem] hover:cursor-not-allowed">
                          Previous
                        </button>
                      )}
                      <p className="flex justify-center items-center text-[.8rem] sm:text-[1.3rem]">
                        Page {currentPage}
                      </p>
                      {currentPage < Math.ceil(posts.length / itemsPerPage) ? (
                        <button
                          className="text-[.8rem] sm:text-[1rem] bg-primary px-2 py-2 rounded-lg flex justify-center items-center hover:bg-transparent border border-primary w-[6rem]"
                          onClick={goToNextPage}
                        >
                          Next
                        </button>
                      ) : (
                        <button className="text-[.8rem] sm:text-[1rem] bg-gray-500 px-2 py-2 rounded-lg flex justify-center items-center  w-[6rem] hover:cursor-not-allowed">
                          Next
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </section>
    </>
  );
};
