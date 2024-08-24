import React from 'react';
import { X } from 'lucide-react';

const SuggestionModal = ({ showSuggestionModal, setShowSuggestionModal }) => {
  if (!showSuggestionModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl">Something Missing?</h3>
                <X
                  className="cursor-pointer"
                  onClick={() => setShowSuggestionModal(false)}
                />
              </div>
              <form>
                <div className="mb-4">
                  <label className="block mb-2">Type</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="boycott"
                        defaultChecked
                      />
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
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1"
                    placeholder="Coca Cola"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Proof URL</label>
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1"
                    placeholder="https://www.link-to-proof.com/..."
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Alternatives (optional)</label>
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1"
                    placeholder="Tap water :D"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Reason</label>
                  <textarea
                    className="w-full border rounded px-2 py-1"
                    rows="3"
                    placeholder="This brand supports zionism because..."
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded"
                    onClick={() => setShowSuggestionModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
  );
};

export default SuggestionModal;
