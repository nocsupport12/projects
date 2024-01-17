import MunicipalityGubat from "../../../assets/provinces-img/sorsogon-img/bayan-ng-gubat/bayan-ng-gubat.png";
import AboutAriman from "../../../assets/barangay-about/barangayariman-img.jpg";
import MunicipalityMayor from "../../../assets/provinces-img/sorsogon-img/bayan-ng-gubat/MunicipalityMayor.jpg";
import AboutTabi from "../../../assets/barangay-about/abouttabi.jpg";

export const BayanNgGubat = {
  id: 1,
  name: "barangaygubat",
  title: "Bayan ng Gubat",
  image: MunicipalityGubat,
  alt: "Bayan ng Gubat",
  url: "bayannggubat",
  mayorImg: MunicipalityMayor,
  mayorDescription: (
    <div className=" text-[.8rem] sm:text-[1rem]">
      <h2 className="text-2xl sm:text-3xl  pb-5 font-semibold">
        Mayor Ronnel "Nono" Lim
      </h2>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta
        totam cumque minus eius corrupti dolor tenetur placeat. Neque earum
        temporibus est, vel quod repellat quasi enim a cupiditate voluptatem?
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta
        totam cumque minus eius corrupti dolor tenetur placeat. Neque earum
        temporibus est, vel quod repellat quasi enim a cupiditate voluptatem?
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta
        totam cumque minus eius corrupti dolor tenetur placeat. Neque earum
        temporibus est, vel quod repellat quasi enim a cupiditate voluptatem?
      </p>
    </div>
  ),
  description: (
    <div className="text-[.8rem] sm:text-[1rem]">
      <p>
        Gubat was originally a big barrio of Bulusan, inhabited by a few
        Tagalogs, Visayans and Albayanons who travelled on foot to hunt wild
        animals. These people built their homes close to the shore and called
        their location Buri, which today is the barrio of Buenavista. In 1764,
        Gubat finally became a town with Don Pedro Manook, the first Teniente
        del Barrio, also becoming the first gobernadorcillo. The town proper is
        named after Don Pedro Manook.
      </p>
      <br />
      <p>
        The word "gúbat" means forest in Tagalog. However, the name applied to
        the town is derived from the verb "guinobat", a term used by the natives
        which means "raided". In the early days when Christians and Muslims were
        constantly at odds, Muslim pirates, the Moros, would come in from the
        southern seas to raid the town. Due to the frequent raids, the town was
        referred to as "guinobat" which eventually became "Gubat". Legend has it
        that during one of those raids, the pastor along with the townspeople
        held up a statue of St. Anthony to ward off the attack, praying for a
        miracle. In one account, it was said that the child Jesus in St.
        Anthony's arms drove back the pirates. Hence, St. Anthony of Padua
        became the town's patron saint, and his feast day is lavishly celebrated
        as an official parish and town holiday every 13 June. The town settlers
        had to move a number of times before finally deciding to settle at a
        place they considered safe and peaceful. Eventually, they began to
        expand, laying out permanent streets, the first of which are what we now
        know as Luna and Calderon Streets.
      </p>
      <br />
      <p>
        The main parish church itself has an interesting history. In 1768, the
        people decided to build a church. The locals, being poor, urged the town
        captain, Don Juan Bonifacio, to require all men to contribute one cubic
        meter of "talaksan" (coral stone) apiece. It took ten years of
        preparation, and it was not until 1778 that construction finally
        started.
      </p>
      <br />
      <p>
        Although it has since undergone several renovations, the church
        foundation is still the original one built in 1778. The rectory is the
        oldest and one of the only two remaining rectories dating back that far
        in the entire Bicol region.
      </p>
      <br />
      <p>
        In November 2006, Gubat became the site of a scientific expedition by
        astronomers Dr. Armando Lee, Bamm Gabriana, and Rochelle Derilo to
        observe the rare Mercury transit. Gubat was the best town in Luzon to
        observe the event.
      </p>
    </div>
  ),
  barangayList: [
    {
      id: 1,
      title: "Ariman",

      alt: "Ariman",
      complete:"true",
      url: "ariman",
      municipality: "Bayan ng Gubat",
      img: AboutAriman,
      description: (
        <div className="text-[.8rem] sm:text-[1rem]">
          <p>
            "Ariman" takes its name from a river that originates from Sitio
            Ariman (Odoc) within Barangay Bentuco in this municipality. This
            river flows into the Pacific Ocean, near Barangay Ariman's location.
            Ariman holds historical significance as it is believed to have been
            the settlement area for early inhabitants of the town. One
            interpretation of the name "Ariman" stems from a historical event
            involving Spanish explorers who, while searching for an inland
            route, inquired with the villagers about which river would lead to
            the mountains.{" "}
          </p>{" "}
          <br />
          <p>
            The villagers responded with "Arin man," signifying that regardless
            of the path taken, all routes would ultimately lead to the
            mountains.Originally a sitio within Barangay Buenavista, Ariman was
            officially designated as a barangay in 1906 in honor of Nuestra
            Señora del Carmen and San Francisco de Asis. Custodio Estrellado
            served as the first Teniente del Barrio. It's also worth noting that
            a breeding station was established in this barangay, and today, the
            visible remains of its foundation can still be seen from the road.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "Bagacay",
      img: "",
      alt: "Bagacay",
      url: "bagacay",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 3,
      title: "Balud Del Norte",
      img: "",
      alt: "Balud Del Norte",
      url: "baluddelnorte",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 4,
      title: "Balud Del Sur",
      img: "",
      alt: "Balud Del Sur",
      url: "baluddelsur",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 5,
      title: "Benguet",
      img: "",
      alt: "Benguet",
      url: "benguet",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 6,
      title: "Bentuco",
      img: "",
      alt: "Bentuco",
      url: "bentuco",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 7,
      title: "Beriran",
      img: "",
      alt: "Beriran",
      url: "beriran",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 8,
      title: "Buenavista",
      img: "",
      alt: "Buenavista",
      url: "buenavista",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 9,
      title: "Bulacao",
      img: "",
      alt: "Bulacao",
      url: "bulacao",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 10,
      title: "Cabigaan",
      img: "",
      alt: "Cabigaan",
      url: "cabigaan",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 11,
      title: "Cabiguhan",
      img: "",
      alt: "Cabiguhan",
      url: "cabiguhan",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 12,
      title: "Carriedo",
      img: "",
      alt: "Carriedo",
      url: "carriedo",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 13,
      title: "Casili",
      img: "",
      alt: "Casili",
      url: "Casili",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 14,
      title: "Cogon",
      img: "",
      alt: "Cogon",
      url: "cogon",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 15,
      title: "Cota Na Daco",
      img: "",
      alt: "Cota Na Daco",
      url: "cotanadaco",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 16,
      title: "Dita",
      img: "",
      alt: "Dita",
      url: "dita",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 17,
      title: "Jupi",
      img: "",
      alt: "Jupi",
      url: "jupi",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 18,
      title: "Lapinig",
      img: "",
      alt: "Lapinig",
      url: "lapinig",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 19,
      title: "Luna-Candol",
      img: "",
      alt: "Luna-Candol",
      url: "lunacandol",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 20,
      title: "Manapao",
      img: "",
      alt: "Manapao",
      url: "manapao",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 21,
      title: "Manook",
      img: "",
      alt: "Manook",
      url: "manook",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 22,
      title: "Naagtan",
      img: "",
      alt: "Naagtan",
      url: "naagtan",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 23,
      title: "Nato",
      img: "",
      alt: "Nato",
      url: "nato",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 24,
      title: "Nazareno",
      img: "",
      alt: "Nazareno",
      url: "nazareno",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 25,
      title: "Ogao",
      img: "",
      alt: "Ogao",
      url: "ogao",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 26,
      title: "Paco",
      img: "",
      alt: "Paco",
      url: "paco",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 27,
      title: "Panganiban",
      img: "",
      alt: "Panganiban",
      url: "panganiban",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 28,
      title: "Paradijon",
      img: "",
      alt: "Paradijon",
      url: "paradijon",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 29,
      title: "Patag",
      img: "",
      alt: "Patag",
      url: "patag",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 30,
      title: "Payawin",
      img: "",
      alt: "Payawin",
      url: "payawin",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 31,
      title: "Pinontingan",
      img: "",
      alt: "Pinontingan",
      url: "pinontingan",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 32,
      title: "Rizal",
      img: "",
      alt: "Rizal",
      url: "rizal",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 33,
      title: "San Ignacio",
      img: "",
      alt: "San Ignacio",
      url: "sanignacio",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 34,
      title: "Sangat",
      img: "",
      alt: "Sangat",
      url: "sangat",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 35,
      title: "Santa Ana",
      img: "",
      alt: "Santa Ana",
      url: "santaana",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 36,
      title: "Tabi",
      img: AboutTabi,
      alt: "Tabi",
      url: "tabi",
      municipality: "Bayan ng Gubat",
      description: (
        <div className="text-[.8rem] sm:text-[1rem]">
          <p>
            Tabi is a barangay in the municipality of Gubat, in the province of
            Sorsogon. Its population as determined by the 2020 Census was 1,846.
            This represented 3.06% of the total population of Gubat.
          </p>{" "}
          <br />
          <p>
            Tabi is situated at approximately 12.8930, 124.1075, in the island
            of Luzon. Elevation at these coordinates is estimated at 15.2 meters
            or 49.9 feet above mean sea level.
          </p>
        </div>
      ),
    },
    {
      id: 37,
      title: "Tagaytay",
      img: "",
      alt: "Tagaytay",
      url: "tagaytay",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 38,
      title: "Tigkiw",
      img: "",
      alt: "Tigkiw",
      url: "tigkiw",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 39,
      title: "Tiris",
      img: "",
      alt: "Tiris",
      url: "tiris",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 40,
      title: "Togawe",
      img: "",
      alt: "Togawe",
      url: "togawe",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 41,
      title: "Union",
      img: "",
      alt: "Union",
      url: "union",
      municipality: "Bayan ng Gubat",
      description: "",
    },
    {
      id: 42,
      title: "Villareal",
      img: "",
      alt: "Villareal",
      url: "villareal",
      municipality: "Bayan ng Gubat",
      description: "",
    },
  ],
};
