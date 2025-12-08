"use client";

import ProfileCard from "../../components/ProfileCard";

export default function ProfileClient() {
  const user = {
    name: "Guest User",
    title: "Book Explorer",
    handle: "guest_explorer",
    status: "Online",
    avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=Guest",
    coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1000&q=80",
    description: "Welcome to your profile! Here you can track your reading progress, view your favorite books, and manage your account settings.",
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <ProfileCard
          name={user.name}
          title={user.title}
          handle={user.handle}
          status={user.status}
          avatarUrl={user.avatarUrl}
          coverUrl={user.coverUrl}
          description={user.description}
          contactText="Edit Profile"
          onContactClick={() => alert("Edit Profile Clicked")}
          enableTilt={true}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Reading Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Books Read</span>
              <span className="font-medium text-gray-900">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pages Turned</span>
              <span className="font-medium text-gray-900">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Reviews Written</span>
              <span className="font-medium text-gray-900">0</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Newcomer</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">Bookworm 🔒</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">Critic 🔒</span>
          </div>
        </div>
      </div>
    </div>
  );
}
