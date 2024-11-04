// pages/victory.js or app/victory/page.js
import React from "react";
import styles from "./victory.module.css"; // Ensure your CSS is correctly linked
import { Quicksand } from "next/font/google";
import Image from "next/image";

const quicksand = Quicksand({
  weight: ["400", "700"], // Specify the font weights
  subsets: ["latin"], // Specify the language subsets
});

const VictoryScreen = () => {
  return (
    <div className={`${styles.victoryScreen} w-full h-full`}>
      <div className={styles.wantedLevel}>
        <span className={styles.star}><Image src="/victory/star.png" alt="Star" width={40} height={40} /></span>
        <span className={styles.star}><Image src="/victory/star.png" alt="Star" width={40} height={40} /></span>
      </div>

      <div className={`${styles.title}`}>MISSION COMPLETE</div>
      <div className={`${styles.subtitle} ${quicksand.className}`}>Show this screen to an agent!</div>

      <div className={styles.retroCar}>
      <Image
        src="/victory/CAR.png" // Path to your image in the public folder
        alt="Retro Car"
        width={500} // Provide a width
        height={300} // Provide a height
        priority // Optional: loads the image with high priority
      />
      </div>
    </div>
  );
};

export default VictoryScreen;
