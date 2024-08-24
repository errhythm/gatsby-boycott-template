import React, { useState } from 'react';
import { Search, Info, X } from 'lucide-react';
import ReactCardFlip from 'react-card-flip';
import '../index.css';

const categories = ['All', 'Bodycare', 'Cleaning', 'Cosmetics', 'Drinks', 'Entertainment', 'Fashion', 'Finance', 'Food', 'Haircare', 'Snacks', 'Supermarket', 'Technology', 'Pharmaceuticals', 'Famous People', 'Others'];

const brands = [
  { name: 'AMAZON', logo: 'https://d35qs7oh01bd1h.cloudfront.net/adidas.webp', status: 'Proof', proofInfo: 'Amazon and Google are working together on Project Nimbus. Project Nimbus is a $1.2bn contract to provide cloud services for the test military and government. This technology allows for further surveillance of and unlawful data collection on Palestinians, and facilitates expansion of illegal settlements on Palestinian land.', proofSource: 'https://www.middleeastmonitor.com/20210729-amazon-google-working-together-on-1-2bn-contract-to-provide-cloud-services-for-us-military/' },
  { name: 'BOOKING.COM', logo: 'booking-logo.png', status: ['Alternative', 'Proof'], alternativeName: 'HALALBOOKING', alternativeLogo: 'halalbooking-logo.png' },
  { name: 'DELL', logo: 'dell-logo.png', status: 'Proof' },
  { name: 'GOOGLE', logo: 'google-logo.png', status: ['Alternative', 'Proof'] },
  { name: 'GOOGLE CHROME', logo: 'chrome-logo.png', status: ['Alternative', 'Proof'] },
  { name: 'HP (HEWLETT PACKARD)', logo: 'hp-logo.png', status: 'Proof' },
  { name: ' (HEWLETT PACKARD)', logo: 'hp-logo.png', status: 'Proof' },
  // Add more brands here...
];

const BoycottPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [proofModal, setProofModal] = useState(null);
  const [flippedCard, setFlippedCard] = useState(null);
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);

  const handleProofClick = (brand) => {
    setProofModal(brand);
  };

  const handleAlternativeClick = (brandName) => {
    setFlippedCard(flippedCard === brandName ? null : brandName);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  function handleOutsideClick() {
    setProofModal(null);
  };


  return (
    <div className="container mx-auto p-4">
      {/* Header and Categories sections remain the same */}
      <main>
      <div className="block">
        <h1 className="font-bold text-2xl mb-2">Categories</h1>
        <div className="flex flex-row flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`flex flex-col items-center hover:cursor-pointer justify-center py-2 px-4 border border-slate-200 rounded ${selectedCategory === category ? 'bg-red-700 text-white' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              <p className="capitalize">{category}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between mt-5 mb-2">
      <h1 className="font-bold text-2xl">Brands & Products</h1>
      <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r0:" data-state="closed">
        <div className="bg-red-700 hover:bg-red-800 rounded p-1">
          <Info className="text-white" size={24} onClick={() => setShowSuggestionModal(true)} />
        </div>
      </button>
    </div>

    <div className="infinite-scroll-component__outerdiv">
      <div className="infinite-scroll-component" style={{height: 'auto', overflow: 'auto'}}>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {brands.map((brand) => (
  <ReactCardFlip isFlipped={flippedCard === brand.name} flipDirection="horizontal">
    <div key={brand.name} className="react-card-front border border-slate-200 flex flex-col items-center p-2 rounded flex-1 h-full">
      <div className="min-h-[60px] min-w-[60px] max-h-[60px] max-w-[60px] flex items-center justify-center">
        <img src={brand.logo} alt={`${brand.name} logo`} width="60" height="60" loading="lazy" />
      </div>
      <h1 className="mb-3 mt-1 text-ellipsis overflow-hidden whitespace-nowrap w-full text-center uppercase font-semibold">{brand.name}</h1>
      <div className="flex flex-row gap-1 w-full">
        {Array.isArray(brand.status) ? (
          brand.status.map((status) => (
            <button
              key={status}
              onClick={() => status === 'Proof' ? handleProofClick(brand) : handleAlternativeClick(brand.name)}
              className={`flex-1 border border-red-700 p-1 rounded overflow-hidden text-ellipsis ${
                status === 'Proof'
                  ? 'bg-red-700 hover:bg-red-800 text-white'
                  : ''
              }`}
            >
              {status}
            </button>
          ))
        ) : (
          <button
            onClick={() => handleProofClick(brand)}
            className="flex-1 border border-red-700 p-1 rounded overflow-hidden text-ellipsis"
          >
            {brand.status}
          </button>
        )}
      </div>
    </div>

    {brand.alternativeName && (
      <div className="react-card-back border border-slate-200 flex flex-col items-center p-2 rounded flex-1 h-full">
        <div className="min-h-[60px] min-w-[60px] max-h-[60px] max-w-[60px] flex items-center justify-center">
          <img src={brand.alternativeLogo} alt={`${brand.alternativeName} logo`} width="60" height="60" loading="lazy" />
        </div>
        <h1 className="mb-3 mt-1 text-ellipsis overflow-hidden whitespace-nowrap w-full text-center uppercase font-semibold">{brand.alternativeName}</h1>
        <div className="flex flex-row gap-2 w-full ">
          <button
            onClick={() => handleAlternativeClick(brand.name)}
            className="border hover:bg-red-700 hover:text-white bg-none border-red-700 flex-1 px-2 py-1 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    )}
  </ReactCardFlip>
))}
        </div>
        </div>
        </div>
      </main>

      {/* Proof Modal */}
      {proofModal && (
        <div className="justify-center md:mx-0 mx-5 items-center flex fixed inset-0 z-50" onClick={handleOutsideClick}>
        <div className="border-0 rounded-lg overflow-auto md:min-w-[48rem] max-h-[90%] mx-auto max-w-3xl shadow-lg relative flex flex-col w-full bg-white" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between p-5 border-b border-solid rounded-t">
            <h3 className="text-2xl font-bold">{proofModal.name}</h3>
            <button className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none outline-none focus:outline-none" onClick={() => setProofModal(null)}>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path></svg>

            </button>
          </div>
          <div className="relative px-6 flex-auto">
            <div className="markdown">
              <p>{proofModal.proofInfo}</p>
            </div>
            <div className="min-h-[60px] min-w-[60px] flex items-center justify-center">
              <img src={proofModal.logo} alt={`${proofModal.name} logo`} width="60" height="60" />
            </div>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={() => setProofModal(null)}>
              Close
            </button>
            <a target="_blank" className="bg-red-700 flex items-center justify-center text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" href={proofModal.proofSource}>
              View Source
            </a>
          </div>
        </div>
      </div>
      )}

      {/* Suggestion Modal */}
      {showSuggestionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl">Something Missing?</h3>
              <X className="cursor-pointer" onClick={() => setShowSuggestionModal(false)} />
            </div>
            <form>
              <div className="mb-4">
                <label className="block mb-2">Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input type="radio" name="type" value="boycott" defaultChecked />
                    <span className="ml-2">Boycott</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="type" value="alternative" />
                    <span className="ml-2">Alternative</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="type" value="complaint" />
                    <span className="ml-2">Complaint</span>
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Brand Name</label>
                <input type="text" className="w-full border rounded px-2 py-1" placeholder="Coca Cola" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Proof URL</label>
                <input type="text" className="w-full border rounded px-2 py-1" placeholder="https://www.link-to-proof.com/..." />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Alternatives (optional)</label>
                <input type="text" className="w-full border rounded px-2 py-1" placeholder="Tap water :D" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Reason</label>
                <textarea className="w-full border rounded px-2 py-1" rows="3" placeholder="This brand supports zionism because..."></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded"
                  onClick={() => setShowSuggestionModal(false)}
                >
                  Close
                </button>
                <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="mt-8 text-center">
        <p className="font-bold">40 BRANDS TO BOYCOTT</p>
      </footer>
    </div>
  );
};

export default BoycottPage;
