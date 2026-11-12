import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const el = document.getElementById("about-root");
if (el) createRoot(el).render(<App />);
