// components/rushhour/GameCompleteModal.tsx

"use client";
import React from "react";
import styles from "./gameModal.module.css";
import { Quicksand } from "next/font/google";
import { useRouter } from "next/navigation";

interface GameCompleteModalProps {
  message: string;
}

const quicksand = Quicksand({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const GameCompleteModal: React.FC<GameCompleteModalProps> = ({ message }) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.neonBox} ${quicksand.className}`}>
        <p>{message}</p>
        <button className={styles.modalButton} onClick={handleRedirect}>
          HOME
        </button>
      </div>
    </div>
  );
};

export default GameCompleteModal;
