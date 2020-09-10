import React, { useState } from "react";

const SessionItem = ({ title }) => <li>{title}</li>;

const App = (props) => {
    const [displayOrder, setDisplayOrder] = useState("ASC");
    const { sessionList } = props.store;
    const orderedSessionList = sessionList.map((session, i) => ({
        ...session,
        order: i,
    }));

    const toggleDisplayOrder = () => {
        setDisplayOrder(displayOrder === "ASC" ? "DESC" : "ASC");
    };

    console.log(displayOrder);

    return (
        <div>
            <header>
                <h1>React and TypeScript</h1>
            </header>
            <button onClick={toggleDisplayOrder}>재정렬</button>
            <ul>
                {orderedSessionList.map((session) => (
                    <SessionItem key={session.id} title={session.title} />
                ))}
            </ul>
        </div>
    );
};

export default App;
