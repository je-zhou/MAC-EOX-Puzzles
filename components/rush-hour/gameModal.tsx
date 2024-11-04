import React from "react";
import styles from "./gameModal.module.css";
import { Quicksand } from "next/font/google";

interface GameModalProps {
  message: string;
}

const quicksand = Quicksand({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const GameModal: React.FC<GameModalProps> = ({ message }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.neonBox} ${quicksand.className}`}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default GameModal;
