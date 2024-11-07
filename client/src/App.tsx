import YijingDivination from './components/YijingDivination';
import { logo } from './assets/images';
import UserModal from './components/UserModal';
import { useState } from 'react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800">
        <img src={logo} alt="Yi-Ren Logo" className="h-10" />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Login / Register
        </button>
      </header>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="App">
        <YijingDivination />
      </div>
    </>
  );
}

export default App;