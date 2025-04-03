const Loader = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="relative w-20 h-20">
          {/* Pac-Man */}
          <div className="absolute w-12 h-12 bg-yellow-400 rounded-full clip-pacman animate-pacman"></div>
          {/* Dots */}
          <div className="absolute top-1/2 left-12 flex space-x-2 -translate-y-1/2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-dot delay-100"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-dot delay-300"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-dot delay-500"></div>
          </div>
        </div>
      </div>
    );
  };

  export default Loader