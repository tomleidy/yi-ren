import { logo } from '../assets/images';


export const LogoComponent: React.FC = () => {
    return (
        <div className="flex items-center">
            <img src={logo} alt="Yi-Ren Logo" className="h-10" />
        </div>
    );
};
