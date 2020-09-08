/* @jsx createElement */

function renderElement(node) {
    if (typeof node === "string") {
        return document.createTextNode(node);
    }

    const el = document.createElement(node.type);

    const { className } = node.props;
    className && el.setAttribute("class", className);

    node.children.map(renderElement).forEach((element) => {
        el.appendChild(element);
    });

    return el;
}

function render(vdom, container) {
    container.appendChild(renderElement(vdom));
}

function createElement(type, props = {}, ...children) {
    if (typeof type === "function") {
        return type.apply(null, [props, ...children]);
    }

    return { type, props, children };
}

function Row(props) {
    return <li>{props.label}</li>;
}

function StudyList(props) {
    return (
        <ul>
            <Row label="test" />
            <li className="item">React</li>
            <li className="item">Redux</li>
            <li className="item">MobX</li>
            <li className="item">Typescript</li>
        </ul>
    );
}

function App() {
    return (
        <div>
            <h1>Hello?</h1>
            <StudyList item="abcd" id="hoho" />
        </div>
    );
}

console.log(<App />);
render(<App />, document.getElementById("root"));
