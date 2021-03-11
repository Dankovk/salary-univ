import React, {FC, Suspense, useEffect, useRef, useState} from 'react';
import {MapComponent} from "./Map/Map";
import "./App.scss"

export default () => (
    <div>
        React App started!
        <MapComponent />
    </div>
);
