import SettingsClient from './SettingsClient';

export const metadata = {
  title: 'Settings - E-Book Library',
  description: 'Manage your reading preferences and account settings',
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Customize your experience by selecting your favorite genres and adjusting your reading preferences. 
          This helps us recommend books you'll actually enjoy.
        </p>
        <SettingsClient />
      </main>
    </div>
  );
}
