import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header
      className="bg-transparent p-1 flex justify-center items-center backdrop-blur-3xl"
      style={{
        background: "rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Link href="/">
        <div className="flex justify-center items-center w-full space-x-3">
          {/* MAC Logo */}
          <Image
            src="/mac-logo-white.png"
            alt="MAC logo"
            layout="intrinsic"
            width={100}
            height={100}
            className="object-contain"
            style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))" }} // Darker drop shadow
          />

          {/* X */}
          <svg
            className="w-4 h-4 mx-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="lightgrey"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>

          {/* CISSA Logo */}
          <Image
            src="/cissa-logo.png"
            alt="CISSA logo"
            layout="intrinsic"
            width={100}
            height={100}
            className="object-contain"
            style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))" }} // Darker drop shadow
          />
        </div>
      </Link>
    </header>
  );
};

export default Header;
