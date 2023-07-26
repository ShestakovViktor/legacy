import "@src/asset/global.scss";

import {render} from "solid-js/web";
import {Router, Route, Routes} from "@solidjs/router";
import {IndexPage, PlaygroundPage} from "@src/page";

const root = document.getElementById("root");

if (!root) throw new Error("There is no root element");

render(() => (
    <Router>
        <Routes>
            <Route path="/" component={IndexPage} />
            <Route path="/playground" component={PlaygroundPage} />
        </Routes>
    </Router>
), root);