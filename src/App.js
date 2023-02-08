import {useEffect, useState} from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'

import RouteLayout from "./layouts/RouteLayout";

//Pages
import Home from "./containers/Home/Home";
import About from "./containers/About";
import NotFound from "./containers/NotFound";

import Loading from "./components/Loading";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RouteLayout/>}>
            <Route index element={<Home />}/>
            <Route path="about" element={<About/>} />
            <Route path="*" element={<NotFound/>} />
        </Route>
            )
        );

function App() {
    const [connected, setConnected] = useState(false)

    useEffect(()=>{
        window.onload= ()=>{
            setConnected(true)
        }
    },[])

    if (!connected) {
        return <Loading isLoading={true}/>
    }
    return (
    <RouterProvider router={router}/>
  );
}

export default App;
