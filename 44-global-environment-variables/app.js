/**
 * ==========================================================
 * Global Variables vs Environment Variables in Node.js
 * ==========================================================
 *
 * These two concepts are often confused because they both
 * allow data to be accessed throughout your application.
 *
 * However, they serve completely different purposes.
 *
 * ----------------------------------------------------------
 * Global Variable
 * ----------------------------------------------------------
 *
 * - Created INSIDE your Node.js application.
 * - Exists only while the application is running.
 * - Shared between every module in the same Node.js process.
 * - Accessed through:
 *
 *      global
 *      globalThis
 *
 *
 * ----------------------------------------------------------
 * Environment Variable
 * ----------------------------------------------------------
 *
 * - Created OUTSIDE your Node.js application.
 * - Usually provided by:
 *      • Operating System
 *      • Terminal
 *      • Docker
 *      • Railway
 *      • Netlify
 *      • GitHub Actions
 *      • .env file
 *
 * - Accessed through:
 *
 *      process.env
 *
 * - Used for configuration.
 *
 * ==========================================================
 * Think of it like this
 * ==========================================================
 *
 *                 Operating System
 *                        │
 *                        │
 *      Environment Variables
 *        PORT=3000
 *        DB_HOST=localhost
 *        API_KEY=abc123
 *                        │
 *                        ▼
 *               Node.js starts
 *                        │
 *                        ▼
 *              process.env receives them
 *                        │
 *          ┌─────────────┴─────────────┐
 *          │                           │
 *          ▼                           ▼
 *      global                    Your Modules
 *
 *
 * Environment variables exist BEFORE your application starts.
 *
 * Global variables are created AFTER your application starts.
 */

// ==========================================================
// Example 1 - Global Variable
// ==========================================================

// Create a global variable.
global.appName = 'Learning Node.js';

// Accessible anywhere in this Node.js process.
console.log('Global Variable:');
console.log(global.appName);
console.log();

// Equivalent:
console.log(globalThis.appName);
console.log();

// Remove it if you no longer need it.
delete global.appName;

// ==========================================================
// Example 2 - Environment Variable
// ==========================================================

console.log('Environment Variable Examples');
console.log('------------------------------');

// Read an environment variable.
console.log('PORT:', process.env.PORT);

// Read another one.
console.log('HOME:', process.env.HOME);

// Read one that may not exist.
console.log('MY_SECRET:', process.env.MY_SECRET);

console.log();

// ==========================================================
// Example 3 - Setting an Environment Variable
// ==========================================================

process.env.APP_MODE = 'development';

console.log(process.env.APP_MODE);

console.log();

/**
 * IMPORTANT
 *
 * This does NOT modify your operating system.
 *
 * It only changes the value inside THIS running Node.js process.
 */

// ==========================================================
// Example 4 - Setting a Global Variable
// ==========================================================

global.counter = 0;

function increment() {
	global.counter++;
}

increment();
increment();
increment();

console.log('Counter:', global.counter);

console.log();

// ==========================================================
// Example 5 - Lifetime
// ==========================================================

/*

Global Variable

Start Node
    │
    ▼
Create global.counter
    │
    ▼
Application runs
    │
    ▼
Node exits
    │
    ▼
Variable disappears


Environment Variable

Operating System
      │
      ▼
PORT=3000
      │
      ▼
Node starts
      │
      ▼
process.env.PORT
      │
      ▼
Node exits
      │
      ▼
PORT still exists in the OS
(unless it was temporary)

*/

// ==========================================================
// Example 6 - Typical Uses
// ==========================================================

// ❌ Not recommended
global.database = {
	host: 'localhost',
	user: 'root',
};

// Better:
const config = {
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'root',
};

console.log(config);

console.log();

// ==========================================================
// Summary
// ==========================================================

console.log('========== SUMMARY ==========');

console.table([
	{
		Feature: 'Created By',
		'Global Variable': 'Your application',
		'Environment Variable': 'Operating System / Shell',
	},
	{
		Feature: 'Accessed With',
		'Global Variable': 'global.foo',
		'Environment Variable': 'process.env.FOO',
	},
	{
		Feature: 'Purpose',
		'Global Variable': 'Share runtime state',
		'Environment Variable': 'Store configuration',
	},
	{
		Feature: 'Lifetime',
		'Global Variable': 'While Node is running',
		'Environment Variable': 'Outside Node process',
	},
	{
		Feature: 'Good For',
		'Global Variable': 'Shared objects (rare)',
		'Environment Variable': 'Secrets, API Keys, Database URLs',
	},
]);

console.log();

/**
 * ==========================================================
 * Best Practice
 * ==========================================================
 *
 * ✔ Use process.env for:
 *
 *      - API keys
 *      - Database URLs
 *      - Ports
 *      - Feature flags
 *      - Secrets
 *      - Environment-specific configuration
 *
 *
 * ✔ Avoid using global unless absolutely necessary.
 *
 * Instead of:
 *
 *      global.database = ...
 *
 * Prefer:
 *
 *      // config.js
 *      module.exports = config;
 *
 *      // app.js
 *      const config = require("./config");
 *
 * Explicit dependencies are easier to understand,
 * easier to test, and easier to maintain.
 */
