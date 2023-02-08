import {NavLink, Outlet} from "react-router-dom";

const RouteLayout = (props) => (
    <div className="rootLayout">
       <header>
           <nav className="nav-bar">
               <h1>City Twin</h1>
               <div className="navigation-right">
                   <NavLink to="/">Home</NavLink>
                   <NavLink to="about">About</NavLink>
               </div>
           </nav>
       </header>
        <main>
            <Outlet/>
        </main>
        <footer>
HELLO
        </footer>
    </div>
);

export default RouteLayout;
