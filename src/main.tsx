import "@src/asset/global.scss";

import {render} from "solid-js/web";
import {Router, Route, Routes} from "@solidjs/router";
import {IndexPage, SectionPage, PlaygroundPage, ExercisePage} from "@src/page";
import {context} from "./context";

const root = document.getElementById("root");

if (!root) throw new Error("There is no root element");

render(() => (
    <context.Provider value={context.defaultValue}>
        <Router>
            <Routes>
                <Route path="/" component={IndexPage} />
                <Route path="/section/:id" component={SectionPage} />
                <Route path="/exercise/:id" component={ExercisePage} />
                <Route path="/playground" component={PlaygroundPage} />
            </Routes>
        </Router>
    </context.Provider>
), root);