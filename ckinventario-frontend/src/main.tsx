import React from "react";
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import Index from "./app";
import "./styles/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const container = document.getElementById("root");

const root = createRoot(container!);


root.render(<BrowserRouter>
<Toaster></Toaster>
     <Index />
   </BrowserRouter>)
   

