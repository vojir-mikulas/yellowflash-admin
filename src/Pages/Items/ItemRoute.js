import React from 'react';
import {Outlet} from "react-router-dom"
const ItemRoute = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default ItemRoute;