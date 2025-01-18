import { Leaf, Shield, Brain, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export function LandingPage() {
  const navigate = useNavigate();

  const handleGitHubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github'
      });
      if (error) throw error;
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Leaf className="w-8 h-8 text-green-500" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">ExpireWise</h1>
            </div>
            <button
              onClick={handleGitHubLogin}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Login with GitHub
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Never Waste Food</span>
            <span className="block text-green-600">Track Smarter with AI</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            ExpireWise helps you track expiration dates, reduce waste, and save money with AI-powered insights and timely reminders.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <button
              onClick={handleGitHubLogin}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
            >
              Get Started Free
            </button>
          </div>
        </div>

        <div className="mt-24">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
              <Brain className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">AI-Powered Insights</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Get smart recommendations and recipe suggestions based on your items.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
              <Bell className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Smart Reminders</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Receive timely notifications before your items expire.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
              <Shield className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Waste Prevention</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Track your environmental impact and savings over time.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}