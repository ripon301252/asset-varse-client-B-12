// import useTheme from "./useTheme";

// export default function ThemeToggle() {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <div className="flex items-center">
//       {/* Label */}
//       <span className="mr-2 text-gray-700 dark:text-gray-200">
//         {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
//       </span>

//       {/* Toggle Switch */}
//       <input
//         type="checkbox"
//         className="toggle toggle-md toggle-primary"
//         checked={theme === "dark"}
//         onChange={(e) => toggleTheme(e.target.checked)}
//       />
//     </div>
//   );
// }


import useTheme from "./useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 sm:gap-3">
      {/* Label */}
      <span className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-200">
        {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
      </span>

      {/* Toggle Switch */}
      <input
        type="checkbox"
        className="toggle toggle-sm sm:toggle-md md:toggle-lg toggle-primary"
        checked={theme === "dark"}
        onChange={(e) => toggleTheme(e.target.checked)}
      />
    </div>
  );
}





// import useTheme from "./useTheme";

// export default function ThemeToggle() {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <div className="flex items-center gap-3">
      
//       {/* Left Side Icon/Text */}
//       <span className="text-gray-700 dark:text-gray-200">
//         ☀️ Light
//       </span>

//       {/* Toggle Button */}
//       <input
//         type="checkbox"
//         className="toggle toggle-md toggle-primary"
//         checked={theme === "dark"}
//         onChange={(e) => toggleTheme(e.target.checked)}
//       />

//       {/* Right Side Icon/Text */}
//       <span className="text-gray-700 dark:text-gray-200">
//         🌙 Dark
//       </span>
//     </div>
//   );
// }

