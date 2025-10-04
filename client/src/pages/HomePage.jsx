import React from "react";
import { Link } from "react-router-dom";

// It's good practice to keep styles in a separate CSS file,
// but for a single component file, a style tag in the main App component or here is fine.
// For this example, we assume the fonts and background are set in a global stylesheet (e.g., index.css).

const HomePage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center text-gray-200">
      {/* Header */}
      <header className="w-full p-4 fixed top-0 z-50">
        <nav className="container mx-auto max-w-7xl glass-card rounded-2xl p-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl tracking-tight font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Caravan Chronicle
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#live-status"
              className="hover:text-gold transition-colors"
            >
              Live Status
            </a>
            <a
              href="#how-it-works"
              className="hover:text-gold transition-colors"
            >
              How It Works
            </a>
            <Link to="/login" className="hover:text-gold transition-colors">
              Login
            </Link>
          </div>
          <Link
            to="/report"
            className="hidden md:block btn-primary font-semibold py-2 px-5 rounded-lg"
          >
            Report an Issue
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center p-4 mt-24 md:mt-0">
        <div className="container mx-auto max-w-4xl text-center">
          <h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Keeping the Magic in Motion
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            The official portal for maintaining the splendor of the Circus of
            Wonders. Report, track, and witness the resolution of civic issues.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/report"
              className="btn-primary text-white font-bold py-4 px-10 text-lg rounded-xl inline-block w-full sm:w-auto"
            >
              Report a New Issue
            </Link>
            <Link
              to="/track"
              className="btn-secondary font-bold py-4 px-10 text-lg rounded-xl inline-block w-full sm:w-auto"
            >
              Track an Existing Issue
            </Link>
          </div>
        </div>
      </main>

      {/* Live Status Section */}
      <section id="live-status" className="w-full p-4 pb-16">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Live City Status
            </h2>
            <p className="text-gray-400 mt-2">
              A real-time overview of reports from across the circus.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map Column */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-2xl p-6 h-full">
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Issue Heatmap
                </h3>
                <div className="aspect-video bg-gray-900/50 rounded-lg flex items-center justify-center">
                  <img
                    src="https://i.pinimg.com/originals/e7/73/19/e773197593c76a404b905f88f25381a1.jpg"
                    alt="Map of the Circus of Wonders"
                    className="object-cover rounded-lg h-full w-full opacity-70"
                  />
                </div>
              </div>
            </div>
            {/* Feed Column */}
            <div>
              <div className="glass-card rounded-2xl p-6 h-full">
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Live Feed
                </h3>
                <div className="space-y-4">
                  {/* Sample Feed Item 1 */}
                  <div className="border-b border-gray-700 pb-3">
                    <p className="font-semibold text-white">
                      Flickering Lights at Main Stage
                    </p>
                    <p className="text-sm text-gray-400">
                      Status:{" "}
                      <span className="text-orange-400 font-bold">
                        In Progress
                      </span>{" "}
                      - 2 hours ago
                    </p>
                  </div>
                  {/* Sample Feed Item 2 */}
                  <div className="border-b border-gray-700 pb-3">
                    <p className="font-semibold text-white">
                      Overflowing Bin near Midway
                    </p>
                    <p className="text-sm text-gray-400">
                      Status:{" "}
                      <span className="text-red-500 font-bold">Overdue</span> -
                      1 day ago
                    </p>
                  </div>
                  {/* Sample Feed Item 3 */}
                  <div>
                    <p className="font-semibold text-white">
                      Damaged Safety Rail
                    </p>
                    <p className="text-sm text-gray-400">
                      Status:{" "}
                      <span className="text-cyan-400 font-bold">Resolved</span>{" "}
                      - 3 days ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
