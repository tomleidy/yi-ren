import YijingDivination from './components/YijingDivination';
import AuthModal from './components/AuthModal';
import Navbar from './components/Navbar';
import { UserProvider, useUser } from './context/UserContext';
import { LogoComponent } from './components/LogoComponent';
import { VisibilityProvider } from './context/VisibilityContext';

function App() {
    return (
        <UserProvider>
            <VisibilityProvider>
                <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800">
                    <LogoComponent />
                    <Navbar />
                </header>
                <AuthModal />
                <div className="App">
                    <YijingDivination />
                </div>
            </VisibilityProvider>
        </UserProvider >
    );
}

export default App;