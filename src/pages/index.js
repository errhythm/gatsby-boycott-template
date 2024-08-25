import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Info } from "lucide-react";
import { graphql } from "gatsby";
import ReactCardFlip from "react-card-flip";
import Header from "./../components/header";
import SuggestionModal from "./../components/suggestion";
import "../index.css";
import bangladeshFlag from "../../static/assets/images/flags/Bangladesh.svg";
import { useTranslation } from "react-i18next";
import i18next from "../locale/i18n";

const BoycottPage = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [proofModal, setProofModal] = useState(null);
  const [flippedCard, setFlippedCard] = useState(null);
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (data && data.allFile && data.allFile.nodes) {
      const brandData = data.allFile.nodes.map((node) => ({
        name: node.childMarkdownRemark.frontmatter.title,
        logo: node.childMarkdownRemark.frontmatter.logo,
        category: node.relativeDirectory,
        status: node.childMarkdownRemark.frontmatter.status,
        proofInfo: node.childMarkdownRemark.frontmatter.proofInfo,
        proofSource: node.childMarkdownRemark.frontmatter.proofSource,
        alternativeName: node.childMarkdownRemark.frontmatter.alternativeName,
        alternativeLogo: node.childMarkdownRemark.frontmatter.alternativeLogo,
      }));
      setBrands(brandData);
      setCategories([
        "All",
        ...new Set(brandData.map((brand) => brand.category)),
      ]);
      setIsLoading(false);
    }
  }, [data]);

  const handleProofClick = (brand) => {
    setProofModal(brand);
  };

  const handleAlternativeClick = (brandName) => {
    setFlippedCard((prevFlippedCard) =>
      prevFlippedCard === brandName ? null : brandName
    );
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  function handleOutsideClick() {
    setProofModal(null);
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredBrands = brands.filter(
    (brand) =>
      (selectedCategory === "All" || brand.category === selectedCategory) &&
      brand.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleSuggestionClick = () => {
    setShowSuggestionModal(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img
          src={bangladeshFlag}
          alt="Loading"
          className="w-16 h-16 animate-spin"
        />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col px-2">
      <div className="w-full border-b border-gray-300">
        <Header
          onSearchChange={handleSearchChange}
          searchValue={searchValue}
          onLanguageChange={handleLanguageChange}
          onSuggestionClick={handleSuggestionClick}
        />
      </div>
      <div className="container mx-auto p-4">
        <div className="block">
          <h1 className="font-bold text-2xl mb-2">{t("Categories")}</h1>
          <div className="flex flex-row flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`flex flex-col items-center hover:cursor-pointer justify-center py-2 px-4 border border-slate-200 rounded ${
                  selectedCategory === category ? "bg-red-700 text-white" : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <p className="capitalize">{category}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between mt-5 mb-2">
          <h1 className="font-bold text-2xl">{t("Brands")}</h1>
          <Popover>
            <PopoverTrigger>
              <button
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="popover"
              >
                <div className="bg-red-700 hover:bg-red-800 rounded p-1">
                  <Info className="text-white" size={24} />
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align="center"
              className="w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none bg-white z-50 text-sm"
            >
              PLEASE NOTE! It is up to you to choose to consider this a valid
              argument/evidence or not.
            </PopoverContent>
          </Popover>
        </div>

        <div className="infinite-scroll-component__outerdiv">
          <div className="infinite-scroll-component">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredBrands.map((brand) => (
                <ReactCardFlip
                  isFlipped={flippedCard === brand.name}
                  flipDirection="horizontal"
                  containerStyle={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <div
                    key={brand.name}
                    className="react-card-front border border-slate-200 flex flex-col items-center p-2 rounded flex-1 h-full uppercase"
                  >
                    <div className="min-h-[60px] min-w-[60px] max-h-[60px] max-w-[60px] flex items-center justify-center">
                      <img
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        width="60"
                        height="60"
                        loading="lazy"
                      />
                    </div>
                    <h1 className="mb-3 mt-1 text-ellipsis overflow-hidden whitespace-nowrap w-full text-center uppercase font-semibold">
                      {brand.name}
                    </h1>
                    <div className="flex flex-row gap-1 w-full">
                    {brand.proofInfo && (
  <button
    onClick={() => handleProofClick(brand)}
    className="flex-1 border border-red-700 p-1 rounded overflow-hidden text-ellipsis bg-red-700 hover:bg-red-800 text-white"
  >
    {t("Proof")}
  </button>
)}
{brand.alternativeName && (
  <button
    onClick={() => handleAlternativeClick(brand.name)}
    className="flex-1 border border-red-700 p-1 rounded overflow-hidden text-ellipsis"
  >
    {t("Alternative")}
  </button>
)}
                    </div>
                  </div>
                  {brand.alternativeName && (
                    <div className="react-card-back border border-slate-200 flex flex-col items-center p-2 rounded flex-1 h-full">
                      {brand.alternativeLogo ? (
                        <div className="min-h-[60px] min-w-[60px] max-h-[60px] max-w-[60px] flex items-center justify-center">
                          <img
                            src={brand.alternativeLogo}
                            alt={`${brand.alternativeName} logo`}
                            width="60"
                            height="60"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="min-h-[60px] min-w-[60px] max-h-[60px] max-w-[60px] flex items-center justify-center">
                          <span className="text-gray-400">No logo</span>
                        </div>
                      )}
                      <h1 className="mb-3 mt-1 text-ellipsis overflow-hidden whitespace-nowrap w-full text-center uppercase font-semibold">
                        {brand.alternativeName}
                      </h1>
                      <div className="flex flex-row gap-2 w-full ">
                        <button
                          onClick={() => handleAlternativeClick(brand.name)}
                          className="border hover:bg-red-700 hover:text-white bg-none border-red-700 flex-1 px-2 py-1 rounded"
                        >
                          {t("Go Back")}
                        </button>
                      </div>
                    </div>
                  )}
                </ReactCardFlip>
              ))}
            </div>
          </div>
        </div>
        {proofModal && (
          <div
            className="justify-center md:mx-0 mx-5 items-center flex fixed inset-0 z-50"
            onClick={handleOutsideClick}
          >
            <div
              className="border-0 rounded-lg overflow-auto md:min-w-[48rem] max-h-[90%] mx-auto max-w-3xl shadow-lg relative flex flex-col w-full bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 border-b border-solid rounded-t">
                <h3 className="text-2xl font-bold">{proofModal.name}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none outline-none focus:outline-none"
                  onClick={() => setProofModal(null)}
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="relative px-6 flex-auto">
                <div className="markdown">
                  <p>{proofModal.proofInfo}</p>
                </div>
                <div className="min-h-[60px] min-w-[60px] flex items-center justify-center">
                  <img
                    src={proofModal.logo}
                    alt={`${proofModal.name} logo`}
                    width="60"
                    height="60"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  onClick={() => setProofModal(null)}
                >
                  Close
                </button>
                <a
                  target="_blank"
                  className="bg-red-700 flex items-center justify-center text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  href={proofModal.proofSource}
                >
                  View Source
                </a>
              </div>
            </div>
          </div>
        )}

        <SuggestionModal
          showSuggestionModal={showSuggestionModal}
          setShowSuggestionModal={setShowSuggestionModal}
        />

        <footer className="mt-8 text-center">
        <p className="font-bold mb-2">{`${brands.length} BRANDS TO BOYCOTT`}</p>
        <p className="text-xs text-gray-500">Built & Designed with 🍵 by <a href="https://errhythm.me" className="underline hover:text-gray-700">Rhythm</a></p>
        </footer>
      </div>
    </main>
  );
};

export const query = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "brands" }, extension: { eq: "md" } }) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            title
            logo
            status
            proofInfo
            proofSource
            alternativeName
            alternativeLogo
          }
        }
        relativeDirectory
      }
    }
  }
`;

export default BoycottPage;
