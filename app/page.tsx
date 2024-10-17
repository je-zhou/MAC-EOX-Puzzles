import Image from 'next/image';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-between w-full max-w-sm mx-auto">
      {/* Header */}
      <header className="w-full py-4 bg-black bg-opacity-50 text-white text-center text-xl font-bold font-ViceCity">
        Grand Theft Auto: Vice City
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-black text-4xl font-gta mb-4">
          Welcome to Vice City
        </h1>
        <p className="text-black text-base font-gta text-center">
          Experience the 80's like never before.
        </p>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-black bg-opacity-50 text-white text-center text-sm">
        &copy; 2023 Vice City
      </footer>
    </div>
  );
};

export default Home;
