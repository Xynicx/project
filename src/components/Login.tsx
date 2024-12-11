import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Droplets } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const waterTips = [
  "Turn off the tap while brushing your teeth to save up to 8 gallons per day",
  "Fix leaky faucets - one drop per second wastes 3,000 gallons per year",
  "Take shorter showers - every minute you save can conserve 2.5 gallons",
  "Use a rain barrel to collect water for your garden",
  "Install water-efficient fixtures to reduce consumption by 30%",
  "Water your plants early morning or late evening to reduce evaporation",
  "Use drought-resistant plants in your garden",
  "Run full loads of laundry to maximize water efficiency"
];

export const Login = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % waterTips.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSuccess = (credentialResponse: any) => {
    const decoded: any = jwtDecode(credentialResponse.credential);
    setUser({
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-md z-10">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://asset.cloudinary.com/dlbqdjxcy/6afb6f88fa7263bf6d19ee4ba12aab98"
            alt="Aquaventure Logo"
            className="w-32 h-32 mb-4"
          />
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
            <Droplets className="w-8 h-8" />
            Aquaventure
          </h1>
          <p className="text-blue-100 text-center">
            Join the movement to conserve water
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log('Login Failed')}
          />
        </div>

        <div className="text-center">
          <p className="text-sm text-blue-100 mb-2">Did you know?</p>
          <p className="text-white text-lg transition-all duration-500 ease-in-out">
            {waterTips[currentTip]}
          </p>
        </div>
      </div>
    </div>
  );
};