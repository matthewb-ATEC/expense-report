/**
 * @file index.tsx - src/
 * @description This file contains the definition of the root element component,
 *              which is used to display the App.
 * @author Matt Burton (matthewb@advancetecllc.com)
 * @date Created: 09-30-2024 | Last Modified: 10-02-2024
 * @version 1.0.0
 * @license MIT
 * @usage Render a <div id="root"> to display this element
 * @dependencies React
 * @relatedFiles index.html
 */
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  document.getElementById("root")!
);
root.render(<App />);
