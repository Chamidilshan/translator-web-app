"use client";
import React, { useState } from "react";
import axios from "axios";


const HomePage = () => {

  const [translatedText, setTranslatedText] = useState("");
  const [inputText, setInputText] = useState("");
  const [language, setLanguage] = useState("en-es");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const fetchTranslation = async () => {
    setLoading(true);
    const response = await axios({
      method: "POST",
      url: "/api/huggingface",
      data: {
        text: inputText,
        lang: language,
      },
      headers: {
        "Content-Type": "application/json",
      }
    });
    console.log(response.data.translated_text); 
    setLoading(false);
    setTranslatedText(response.data.translated_text);
  }

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <div>
            <h1 className="text-2xl text-purple-800 font-semibold">Translator</h1>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div className="flex flex-col">
                <label className="leading-loose">Select Language</label>
                <select
                  onChange={handleLanguageChange}
                  value={language}
                  className="p-4 border border-gray-300 rounded text-gray-700 focus:outline-none focus:border-cyan-500"
                >
                  <option value="en-es">English to Spanish</option>
                  <option value="en-de">English to German</option>
                  <option value="en-fr">English to French</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="leading-loose">Input Text</label>
                <input
                  type="text"
                  onChange={handleInputChange}
                  value={inputText}
                  className="p-4 border mb-6 border-gray-300 rounded text-gray-700 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <button
                onClick={fetchTranslation}
                disabled={loading || inputText === ""}
                className="mt-10 px-10 py-3 bg-gradient-to-r  from-purple-500 to-light-blue-500 text-white rounded shadow-md hover:shadow-lg transition duration-300"
              >
                {loading ? "Translating" : "Translate"}
              </button>
              <div className="flex flex-col">
                <label className="leading-loose">Translated Text</label>
                <input
                  type="text"
                  disabled={true}
                  value={translatedText}
                  className="p-4 border border-gray-300 rounded text-lg text-gray-700 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;