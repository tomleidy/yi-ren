import YijingDivination from './components/divination/YijingDivination';
import AuthModal from './components/AuthModal';
import Navbar from './components/Navbar';
import { UserProvider, useUser } from './context/UserContext';
import { LogoComponent } from './components/LogoComponent';
import { VisibilityProvider } from './context/VisibilityContext';
import { ActiveReadingProvider } from './context/ActiveReadingContext';

function App() {
    return (
        <UserProvider>
            <ActiveReadingProvider>
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
            </ActiveReadingProvider>
        </UserProvider >
    );
}

export default App;