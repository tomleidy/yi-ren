import YijingDivination from './components/YijingDivination';
import { logo } from './assets/images';
import UserModal from './components/UserModal';
import { useState } from 'react';
import Navbar from './components/Navbar';
import { UserProvider, useUser } from './UserContext';
import { LogoComponent } from './components/LogoComponent';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
        <UserProvider>
      <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800">
                <LogoComponent />
                <Navbar isModalOpen={isModalOpen} toggleModal={() => setIsModalOpen(!isModalOpen)} />
      </header>

      <UserModal
                isModalOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
      />

      <div className="App">
        <YijingDivination />
      </div>
        </UserProvider >
  );
}

export default App;