import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NotificationProvider } from "@/components/NotificationCenter";
import { NotificationProvider as NotificationContext } from "@/context/NotificationContext";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <NotificationProvider max={3}>
          <NotificationContext>
            <App />
          </NotificationContext>
      </NotificationProvider>
  </React.StrictMode>
);

console.log("当下开发环境: " ,process.env.NODE_ENV);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
