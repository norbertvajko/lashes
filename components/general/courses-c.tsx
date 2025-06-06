"use client";

import React, { FC } from "react";
import standardImage from "../../assets/images/Curs_Modul_Standard.jpg";
import premiumImage from "../../assets/images/Curs_Modul_Exclusiv.jpg.jpg";
import freeImage from "../../assets/images/Curs_Gratis.jpeg";
import Link from "next/link";

export const HeroCard: React.FC<{
  imgSrc: string;
  description: string;
  date: string;
  link: string;
  text: string;
  type: "standard" | "exclusive" | "free";
}> = ({ imgSrc, description, date, link, text }) => {
  return (
    <div className="relative min-h-[520px] max-w-[368px] h-96 rounded-2xl overflow-hidden shadow-lg m-8 group transition-transform transform hover:scale-105">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imgSrc})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 backdrop-filter backdrop-blur-lg bg-white/30 rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex items-center justify-start">
          <div className="text-white text-md font-extrabold flex flex-col">
            <p className="font-semibold">{description}</p>
            <p className="text-sm py-3">{text}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 text-sm">
          <div className="text-white">{date}</div>
          <Link
            href={link}
            className="text-black border bg-white border-white px-1 py-1 md:px-4 md:py-2 rounded-md hover:bg-black hover:text-white hover:border-black transition"
          >
            📚Ce vei învăța la curs
          </Link>
        </div>
      </div>
    </div>
  );
};

export const CoursesComponentDemo: FC<{
  hasTitle?: boolean;
  className?: string;
  allCourses?: boolean;
}> = ({ hasTitle = true, className = "", allCourses = false }) => {
  return (
    <div
      className={`flex justify-center bg-white flex-col items-center py-3 ${className}`}
    >
      {hasTitle && (
        <div className="flex flex-row items-center justify-center gap-2 text-center">
          <h1 className="py-5 font-bold text-3xl text-black">Cursuri</h1>
        </div>
      )}
      <div className="grid gap-3 w-full max-w-[1520px] mx-auto grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center">
        <HeroCard
          imgSrc={standardImage.src}
          description="Modulul STANDARD"
          date="20.02.2024"
          link="/courses/standard"
          text="🧠Acest modul de curs l-am gândit ca fiind ideal pentru bobocii care doresc să învețe tehnicile fundamentale și să intre cu ușurință în această industrie."
          type="standard"
        />
        <HeroCard
          imgSrc={premiumImage.src}
          description="Modulul EXCLUSIVE"
          date="22.02.2024"
          link="/courses/exclusive"
          text="🧠Acest modul este gândit ca un curs de baza + o perfecționare SUPER INTENSIV ca tu să poți imediat dupa curs să ai cliente pe bani. 💰"
          type="exclusive"
        />
        {allCourses && (
          <HeroCard
            imgSrc={freeImage.src}
            description="Modulul GRATUIT"
            date="22.02.2024"
            link="/courses/free"
            text="Daca ai vrea sa te intri in domeniul extensiilor de gene dar inca nu esti sigura ca te vei descurca financiar ,eu am creat pentru tine acest webinar informativ si GRATUIT unde vei afla costurile reale ale acestei meserii frumoase"
            type="free"
          />
        )}
      </div>
    </div>
  );
};
