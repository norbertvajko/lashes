"use client";

const HomePage = () => {
    // Using window.location.replace for navigation
    const redirectToHome = () => {
        window.location.replace("/");
    };

    // Call redirectToHome when component mounts
    redirectToHome();

    return null;
};

export default HomePage;
