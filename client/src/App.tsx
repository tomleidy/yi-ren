import YijingDivination from './components/divination/YijingDivination';
import AuthModal from './components/AuthModal';
import Navbar from './components/Navbar';
import { UserProvider } from './context/UserContext';
import { LogoComponent } from './components/LogoComponent';
import { VisibilityProvider } from './context/VisibilityContext';
import { ActiveReadingProvider } from './context/ActiveReadingContext';
import UserProfileModal from './components/UserProfileModal';
import YijingUploader from './components/upload/YijingUploader';
import { CoinsProvider } from './context/CoinsContext';

function App() {
    return (
        <UserProvider>
            <ActiveReadingProvider>
                <VisibilityProvider>
                    <CoinsProvider>
                        <header className="flex justify-between items-center p-2 sm:p-4">
                            <LogoComponent />
                            <Navbar />
                        </header>
                        <AuthModal />
                        <UserProfileModal />
                        <YijingUploader />
                        <div className="App">
                            <YijingDivination />
                        </div>
                    </CoinsProvider>
                </VisibilityProvider>
            </ActiveReadingProvider>
        </UserProvider >
    );
}

export default App;