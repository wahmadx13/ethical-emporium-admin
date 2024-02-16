'use client';
import { useEffect, useState } from 'react';
import Lottie, { Options } from 'react-lottie';
import animationData from '../../utils/lottie/lottie-logo-pulsing.json';
import { mediaWidths } from '../../utils/constants';
import { IDimensions } from '../../types/Loader';

export const ScreenLoader: React.FC = () => {
  const [dimensions, setDimensions] = useState<IDimensions>({
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        // position: 'absolute',
        justifyContent: 'center',
        // top: '0px',
        // bottom: '0px',
      }}
    >
      {/* <Lottie
        options={defaultOptions}
        height={dimensions.width > mediaWidths.smWidth ? 100 : 80}
        width={dimensions.width > mediaWidths.smWidth ? 100 : 80}
        speed={2}
      /> */}
      <div>Loading ...</div>
    </div>
  );
};

export default ScreenLoader;
