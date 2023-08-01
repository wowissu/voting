import { FC } from 'react';
import Logo from '@/assets/logo.jpg';

const WaitingForStart: FC = () => {
  return (
    <div className="space-y-4 flex flex-col items-center justify-center w-screen h-screen voting-background">
      <div className="w-[min(40vw,40vh)] min-w-[200px] aspect-square rounded-full overflow-hidden">
        <img src={Logo.src} alt="" />
      </div>
    </div>
  );
}

export default WaitingForStart;