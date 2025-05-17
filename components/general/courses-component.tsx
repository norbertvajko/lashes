import React, { forwardRef } from 'react'
import { AboutMeSection } from './about-me-section';

const AbutMeComponent = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div ref={ref} className="relative px-0">
            <svg
                className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-deep-purple-accent-400"
                preserveAspectRatio="none"
                viewBox="0 0 1440 320"
            >
                <path
                    fill="black"
                    d="M0,128L48,149.3C96,171,192,213,288,213.3C384,213,480,171,576,138.7C672,107,768,85,864,101.3C960,117,1056,171,1152,170.7C1248,171,1344,117,1392,90.7L1440,64L1440,320L0,320Z"
                />
            </svg>
            <AboutMeSection />
            <svg
                className="bottom-0 w-full h-6 -mb-5 sm:-mb-10 sm:h-16 text-deep-purple-accent-400"
                preserveAspectRatio="none"
                viewBox="0 0 1440 320"
            >
                <path
                    fill="black"
                    d="M0,192L48,170.7C96,149,192,107,288,106.7C384,107,480,149,576,181.3C672,213,768,235,864,218.7C960,203,1056,149,1152,149.3C1248,149,1344,203,1392,229.3L1440,256L1440,0L0,0Z"
                />
            </svg>
        </div>
    );
});

AbutMeComponent.displayName = "AbutMeComponent";

export default AbutMeComponent;