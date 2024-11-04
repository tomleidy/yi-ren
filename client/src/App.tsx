import YijingDivination from './components/YijingDivination';
import { logo } from './assets/images';

function App() {
  return (
    <>
      <header>
        <img src={logo} alt="Yi-Ren Logo" />
      </header>

      <div className="App">
        <YijingDivination />
      </div>
    </>
  );
}
export default App
