import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

// JSON
import { ProvinceData } from "../../components/JSFormat/ProvinceData";

// IMPORT FRAMER MOTION
import { AnimatedPage } from "../../components/FramerMotion/AnimatedPage";

import { Modal } from "../../components/Modal/Modal";

// RADIO IMPORT
import { Radio } from "@material-tailwind/react";

export const News = () => {
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
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("all");
  const [province, setProvince] = useState("all");
  const [municipality, setMunicipality] = useState("");
  const [barangay, setBarangay] = useState("");
  const [filter, setFilter] = useState("all");
  const globalUrl = process.env.REACT_APP_GLOBAL_URL;

  const fetchImageUrls = async () => {
    setIntro(
      <div className="flex justify-center items-center text-center h-[60vh]">
        <ThreeDots
          height={200}
          width={200}
          color="#4fa94d"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
    try {
      const header = {
        "Content-Type": "application/json",
        "x-auth-token": process.env.REACT_APP_X_AUTH_TOKEN,
      };

      const response = await axios.get(`${globalUrl}/blogposts/retrieveAll`, {
        headers: header,
      });

      const filters = () => {
        switch (type) {
          // municipality news
          case "all": {
            switch (filter) {
              case "all": {
                setPosts(response.data.reverse());
                return response.data;
              }
              case "province":
                setPosts(
                  response.data.reverse().filter((el) => {
                    return el.province === province;
                  })
                );
                return response.data.reverse().filter((el) => {
                  return el.province === province;
                });
              case "municipality":
                setPosts(
                  response.data.reverse().filter((el) => {
                    return el.municipality === municipality;
                  })
                );
                return response.data.reverse().filter((el) => {
                  return el.municipality === municipality;
                });
              case "barangay":
                setPosts(
                  response.data.reverse().filter((el) => {
                    return el.barangay === barangay;
                  })
                );
                return response.data.reverse().filter((el) => {
                  return el.barangay === barangay;
                });

              default:
                break;
            }
          }

          case "news": {
            switch (filter) {
              case "all": {
                setPosts(
                  response.data.reverse().filter((el) => {
                    return el.type === "news";
                  })
                );
                return response.data.reverse().filter((el) => {
                  return el.type === "news";
                });
              }
              case "province":
                setPosts(
                  response.data
                    .reverse()
                    .filter((el) => {
                      return el.type === "news";
                    })
                    .filter((el) => {
                      return el.province === province;
                    })
                );
                return response.data
                  .reverse()
                  .filter((el) => {
                    return el.type === "news";
                  })
                  .filter((el) => {
                    return el.province === province;
                  });
              case "municipality":
                setPosts(
                  response.data
                    .reverse()
                    .filter((el) => {
                      return el.type === "news";
                    })
                    .filter((el) => {
                      return el.municipality === municipality;
                    })
                );
                return response.data
                  .reverse()
                  .filter((el) => {
                    return el.type === "news";
                  })
                  .filter((el) => {
                    return el.municipality === municipality;
                  });
              case "barangay":
                setPosts(
                  response.data
                    .reverse()
                    .filter((el) => {
                      return el.type === "news";
                    })
                    .filter((el) => {
                      return el.barangay === barangay;
                    })
                );
                return response.data
                  .reverse()
                  .filter((el) => {
                    return el.type === "news";
                  })
                  .filter((el) => {
                    return el.barangay === barangay;
                  });

              default:
                break;
            }
          }
          case "announcement": {
            switch (filter) {
              case "all": {
                setPosts(
                  response.data.reverse().filter((el) => {
                    return el.type === "announcement";
                  })
                );
                return response.data.reverse().filter((el) => {
                  return el.type === "announcement";
                });
              }
              case "province":
                setPosts(
                  response.data
                    .reverse()
                    .filter((el) => {
                      return el.type === "announcement";
                    })
                    .filter((el) => {
                      return el.province === province;
                    })
                );
                return response.data
                  .reverse()
                  .filter((el) => {
                    return el.type === "announcement";
                  })
                  .filter((el) => {
                    return el.province === province;
                  });
              case "municipality":
                setPosts(
                  response.data
                    .reverse()
                    .filter((el) => {
                      return el.type === "announcement";
                    })
                    .filter((el) => {
                      return el.municipality === municipality;
                    })
                );
                return response.data
                  .reverse()
                  .filter((el) => {
                    return el.type === "announcement";
                  })
                  .filter((el) => {
                    return el.municipality === municipality;
                  });
              case "barangay":
                setPosts(
                  response.data
                    .reverse()
                    .filter((el) => {
                      return el.type === "announcement";
                    })
                    .filter((el) => {
                      return el.barangay === barangay;
                    })
                );
                return response.data
                  .reverse()
                  .filter((el) => {
                    return el.type === "announcement";
                  })
                  .filter((el) => {
                    return el.barangay === barangay;
                  });

              default:
                break;
            }
          }
        }
        setIntro(<></>);
      };
      filters();
      if (filters.length < 1) {
        setTimeout(() => {
          setIntro(
            <div className="py-28 flex justify-center items-center text-center col-span-1 md:col-span-3 lg:col-span-3 h-[60vh]">
              <p className="text-3xl">
                There are no available {type === "all" ? "updates" : type} in
                this area.
              </p>
            </div>
          );
        }, 1000);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  
  useEffect(() => {
    // Ensure that the scroll behavior is reverted when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

 

  useEffect(() => {
    setTimeout(() => {
      fetchImageUrls();
    }, 800);
  }, [filter, type, province, municipality, barangay, loading]);

  const itemsPerPage = 2;

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

 

  const provinceSelect = (selected) => {
    setProvince(selected);
    setMunicipality("");
    setBarangay("");
    if (selected === "all") {
      setFilter("all");
    } else {
      setFilter("province");
    }
    window.scrollTo(0, 0);
  };
  const municipalitySelect = (selected) => {
    setMunicipality(selected);
    setBarangay("");
    if (selected === "") {
      setFilter("province");
    } else {
      setFilter("municipality");
    }
    window.scrollTo(0, 0);
  };
  const barangaySelect = (selected) => {
    setBarangay(selected);
    if (selected === "") {
      setFilter("municipality");
    } else {
      setFilter("barangay");
    }
    window.scrollTo(0, 0);
  };

  
  return (
    <>
      <AnimatedPage>
        {/*  SPONSOR SECTION */}
        <section
          id="sponsors"
          className="font-poppins pt-40 pb-40 px-5 md:px-5 lg:px-0 "
        >
          <div className="container mx-auto">
            <h2 className="text-center text-4xl font-semibold 2xl:text-4xl">
              LATEST UPDATES
            </h2>
            <div className="flex gap-2 md:gap-10 items-center justify-center text-[0.6rem] sm:text-base flex-wrap mt-10 mx-5 md:mx-10 py-1 bg-purewhite dark:bg-darkModeGray dark:border-none dark:text-white border rounded-lg sticky top-20">
              <Radio
                // className="dark:text-white"
                name="type"
                label={<span className="dark:text-white">All</span>}
                defaultChecked
                value="all"
                onChange={(e) => {
                  setType(e.target.value);
                  window.scrollTo(0, 0);
                }}
              />
              <Radio
                name="type"
                label={<span className="dark:text-white">News</span>}
                value="news"
                onChange={(e) => {
                  setType(e.target.value);
                  window.scrollTo(0, 0);
                }}
              />
              <Radio
                // className="dark:text-white"
                name="type"
                label={<span className="dark:text-white">Announcement</span>}
                value="announcement"
                onChange={(e) => {
                  setType(e.target.value);
                  window.scrollTo(0, 0);
                }}
              />
            </div>
            <h3 className="text-center text-lg mt-5 2xl:text-xl">
              {`${province === "all" ? "Bicol Region" : province}${
                municipality === "" ? "" : `, ${municipality}`
              }${barangay === "" ? "" : `, Brgy. ${barangay}`}`}{" "}
              {type === "all"
                ? "Updates"
                : `${
                    type.slice(0, 1).toUpperCase() + type.slice(1, type.length)
                  }`}
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-12 2xl:grid-cols-12 gap-3 px-5 sm:px-10">
              <div
                className="w-full flex-row  flex-wrap items-center 
                    bg-purewhite border rounded-lg py-5 flex justify-center gap-3  col-span-5 top-36 mt-5 h-max dark:bg-darkModeGray  sm:col-span-5 lg:sticky  lg:flex-col lg:col-span-3 px-10 sm:px-32 lg:px-5 2xl:px-10"
              >
                <div className="w-full pt-5 px-5">
                  <p htmlFor="provinces">Province :</p>
                  <select
                    name="provinces"
                    id="provinces"
                    data-te-select-init
                    className=" text-black w-full overflow-x-hidden px-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:cursor-pointer"
                    onChange={(e) => provinceSelect(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="Sorsogon">Sorsogon</option>
                    <option value="Camarines Sur">Camarines Sur</option>
                    <option value="Camarines Norte">Camarines Norte</option>
                    <option value="Albay">Albay</option>
                  </select>
                </div>
                {province !== "all" ? (
                  <div className="w-full pt-5 px-5">
                    <p htmlFor="municipality">Municipality :</p>
                    <select
                      name="municipality"
                      id="municipality"
                      className="text-black w-full overflow-x-hidden px-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:cursor-pointer"
                      onChange={(e) => {
                        municipalitySelect(e.target.value);
                      }}
                      value={municipality}
                    >
                      <option value="">All</option>
                      {ProvinceData.find(
                        (el) => el.title === province
                      ).municipalityList.map((municipalityData) => {
                        return (
                          <option
                            value={municipalityData.title}
                            key={municipalityData.id}
                          >
                            {municipalityData.title}
                          </option>
                        );
                      })}
                    </select>{" "}
                  </div>
                ) : (
                  ""
                )}
                {municipality === "" || municipality === "all" ? (
                  ""
                ) : (
                  <div className="w-full pt-5 px-5">
                    <p htmlFor="barangay">Barangay :</p>
                    <select
                      name="barangay"
                      id="barangay"
                      className="text-black w-full overflow-x-hidden px-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:cursor-pointer"
                      onChange={(e) => {
                        barangaySelect(e.target.value);
                      }}
                      value={barangay}
                    >
                      <option value="">All</option>
                      {ProvinceData.find(
                        (el) => el.title === province
                      ).municipalityList.find((el) => el.title === municipality)
                        .municipalityList[0]
                        ? ProvinceData.find((el) => el.title === province)
                            .municipalityList.find(
                              (el) => el.title === municipality
                            )
                            .municipalityList[0].barangayList.map(
                              (barangayData) => {
                                return (
                                  <option
                                    value={barangayData.title}
                                    key={barangayData.id}
                                  >
                                    {barangayData.title}
                                  </option>
                                );
                              }
                            )
                        : ""}
                    </select>
                  </div>
                )}
              </div>
              <div className="col-span-5 lg:col-start-4 lg:col-end-13">
                {currentPosts.length > 0 ? (
                  <>
                    {currentPosts.map((post, index) => {
                      return (
                        <div
                          key={index}
                          className="dark:bg-darkModeGray grid grid-cols-4 lg:grid-cols-12 py-10 my-5 px-5 border-2 rounded-lg dark:border-none gap-10"
                        >
                          <div className="col-span-4 lg:col-span-4 flex justify-center overflow-hidden items-center h-[250px] sm:h-[350px] md:h-[400px] lg:h-[300px]">
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
                          <div className="col-span-4 flex flex-col justify-around lg:col-span-8 px-5 py-5 overflow-hidden">
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
                            </div>
                            {isModalOpen && selectedPost && (
                              <Modal data={selectedPost} onClose={closeModal} />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : currentPosts.length > 0 ? (
                  <div></div>
                ) : (
                  intro
                )}
              </div>
            </div>

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
      </AnimatedPage>
    </>
  );
};
