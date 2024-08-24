import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import i18next from '../locale/i18n';

const Header = (props) => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

    return (
    <div className="container mx-auto flex flex-row justify-between my-2 items-center">
        <div className="flex-1 flex justify-start">
            <img alt="Flag Bangladesh" loading="lazy" width="40" height="40" src="/images/flags/Bangladesh.svg" />
          </div>
          <div className="flex-1">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"></path>
                </svg>
              </div>
              <input
                id="default-search"
                className="block w-full p-2 pl-10 text-sm border border-slate-300 focus:border rounded focus:border-red-700 focus:ring-red-400 focus:outline-none"
                placeholder={t('Search')}
                required
                type="text"
                value={props.searchValue}
                onChange={props.onSearchChange}
              />
            </div>
          </div>
          <div className="flex-1 flex justify-end items-center gap-3">
            <select onChange={(e) => handleLanguageChange(e.target.value)}>
                <option value="en">English 🇬🇧</option>
                <option value="bn">Bengali 🇧🇩</option>
            </select>
            <button className="bg-red-700 hover:bg-red-800 px-3 py-[6px] text-white rounded text-sm uppercase" onClick={() => props.onSuggestionClick(true)}>{t('Suggestion')}</button>
          </div>
        </div>


      );
};

export default Header;
