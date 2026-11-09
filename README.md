# Redux Toolkit - Cart

A shopping cart application built with React and Redux Toolkit.

## About The Project

From the original README: this project follows John Smilga's [React course](https://www.udemy.com/course/react-tutorial-and-projects-course/) (Redux Toolkit section), using the [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started) for state management. The tutorial notes that made up the original README are preserved in [ASSIGNMENT.md](ASSIGNMENT.md).

## Built With

- React 17 / Vite 8
- Redux Toolkit / React Redux
- axios

## Getting Started

Use Node.js 26 LTS (`nvm use`), install the locked dependencies with `npm ci`, then run `npm start` and open http://localhost:3000.

- `npm run build`: production assets in `build/`, preserving the previous output directory.
- `npm run preview`: inspect the production build locally (not a production server).
- `npm test`: cart, modal, async-loading and error-path regression tests.
- `npm run test:watch`: interactive tests.

The former Create React App toolchain has been replaced by Vite. React 17 and the existing Redux store API are unchanged. Vite targets modern browsers; the old CRA Browserslist configuration no longer applies. The app still loads demo cart data from `course-api.com`; automated tests use fixtures rather than relying on that service. No deployment is configured by this change.

## License

No license file is present in this repository.

## Contact

Dylan J. Gerrits - [GitHub](https://github.com/Dyrits)
