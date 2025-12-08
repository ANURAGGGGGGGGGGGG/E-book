"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Check } from "lucide-react";

const GENRES = [
  "Fiction", "Science Fiction", "Mystery", "Biography", 
  "History", "Romance", "Fantasy", "Business", 
  "Self-Help", "Thriller", "Cooking", "Art"
];

const READING_LEVELS = ["Casual", "Intermediate", "Advanced", "Academic"];

export default function SettingsClient() {
  const router = useRouter();
  const [preferences, setPreferences] = useState({
    genres: ["Fiction", "Science Fiction"],
    readingLevel: "Intermediate",
    notifications: true,
    personalizedAds: false,
  });

  const [saved, setSaved] = useState(false);

  const toggleGenre = (genre) => {
    setPreferences(prev => {
      if (prev.genres.includes(genre)) {
        return { ...prev, genres: prev.genres.filter(g => g !== genre) };
      } else {
        return { ...prev, genres: [...prev.genres, genre] };
      }
    });
    setSaved(false);
  };

  const handleSave = () => {
    // Simulate API call
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.push('/');
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      
      {/* Recommendation Preferences */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recommendation Preferences</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Favorite Genres
          </label>
          <div className="flex flex-wrap gap-2">
            {GENRES.map(genre => (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  preferences.genres.includes(genre)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Select the topics you're most interested in. We'll prioritize these in your feed.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Reading Level
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {READING_LEVELS.map(level => (
              <button
                key={level}
                onClick={() => {
                  setPreferences(p => ({ ...p, readingLevel: level }));
                  setSaved(false);
                }}
                className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                  preferences.readingLevel === level
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">General Settings</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">New Release Notifications</h3>
              <p className="text-xs text-gray-500">Get notified when books in your favorite genres are released.</p>
            </div>
            <button
              onClick={() => {
                setPreferences(p => ({ ...p, notifications: !p.notifications }));
                setSaved(false);
              }}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                preferences.notifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  preferences.notifications ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4 pb-20">
        <button
          onClick={handleSave}
          disabled={saved}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all ${
            saved 
              ? "bg-green-600 cursor-default" 
              : "bg-black hover:bg-gray-800"
          }`}
        >
          {saved ? <Check size={18} /> : <Save size={18} />}
          {saved ? "Saved Changes" : "Save Preferences"}
        </button>
      </div>
    </div>
  );
}
