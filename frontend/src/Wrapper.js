import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Wrapper() {
    return(
        <main>
            <Header />
            <Outlet />
        </main>
    );
};