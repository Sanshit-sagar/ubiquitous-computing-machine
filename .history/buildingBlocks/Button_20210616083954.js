const colors = {
    primary: `bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:ring-offset-blue-100`,
    success: `bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-700 focus:ring-offset-green-100`,
    danger: `bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 focus:ring-offset-red-100`,
    dark: `bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 focus:ring-offset-gray-100`,
    warning: `bg-yellow-500 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-yellow-100`,
    indigo: `bg-indigo-900 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-900 focus:ring-offset-indigo-100`,
}; 

const Spinner = ({ color, className }) => (
    <svg
      fill={color}
      viewBox="0 0 1792 1792"
      className={`${className} flex-no-shrink animate-spin`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1760 896q0 176-68.5 336t-184 275.5-275.5 184-336 68.5-336-68.5-275.5-184-184-275.5-68.5-336q0-213 97-398.5t265-305.5 374-151v228q-221 45-366.5 221t-145.5 406q0 130 51 248.5t136.5 204 204 136.5 248.5 51 248.5-51 204-136.5 136.5-204 51-248.5q0-230-145.5-406t-366.5-221v-228q206 31 374 151t265 305.5 97 398.5z" />
    </svg>
);

const Button = forwardRef(({ color, children, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={`${colors[color]} text-white focus:outline-none shadow rounded px-6 py-2 font-medium transition ease-in duration-200`}
    >
      {children}
    </button>
));

export default {Spinner, Button, colors};