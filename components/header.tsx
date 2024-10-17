import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-[#3494E6] to-[#EC6EAD] p-1 flex justify-center items-center" style={{ background: 'linear-gradient(45deg, #3494E6, #EC6EAD)' }}>
      <div className="flex justify-center items-center w-full space-x-3">
        {/* MAC Logo */}
        <Link href="/"> 
          <Image
            src="/mac-logo.png"
            alt="MAC logo"
            layout="intrinsic"
            width={100}
            height={100}
            className="object-contain"
            style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }} // Darker drop shadow
          />
        </Link>

        {/* X */}
        <svg className="w-4 h-4 mx-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>

        {/* CISSA Logo */}
        <Link href="/">
          <Image
            src="/cissa-logo.png"
            alt="CISSA logo"
            layout="intrinsic"
            width={100}
            height={100}
            className="object-contain"
            style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }} // Darker drop shadow
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
