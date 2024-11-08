import YijingDivination from './components/YijingDivination';
import { logo } from './assets/images';
import UserModal from './components/UserModal';
import { useState } from 'react';
import { LogoComponent } from './components/LogoComponent';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800">
                <LogoComponent />
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