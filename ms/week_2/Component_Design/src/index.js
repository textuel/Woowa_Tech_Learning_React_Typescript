import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const sessionList = [
    { id: 1, title: "1회차: Overview" },
    { id: 2, title: "2회차: Redux 만들기" },
    { id: 3, title: "3회차: React 만들기" },
    { id: 4, title: "4회차: 컴포넌트 디자인 및 비동기" },
];

ReactDOM.render(
    <React.StrictMode>
        <App store={{ sessionList }} />
    </React.StrictMode>,
    document.getElementById("root")
);
