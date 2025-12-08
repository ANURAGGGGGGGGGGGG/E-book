import ProfileClient from './ProfileClient';

export const metadata = {
  title: 'My Profile - E-Book Library',
  description: 'View and manage your profile',
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
        <ProfileClient />
      </main>
    </div>
  );
}
