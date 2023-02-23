import {
    AnimationViewModel,
    Clock, ClockRange, ClockStep,
    ClockViewModel,
    Color, JulianDate,
} from "cesium";
import {GeoJsonDataSource, Globe} from "resium";
import swissPopulation from '../../../Data/swissPopulation.json'
import {useEffect, useRef, useState} from "react";



const SwissPopulation = () => {
    const dataSource = useRef(null);
    const colorHash = {};
    const entityIds = [];
    const [time, setTime] = useState(0);
    const [deltaTime, setDeltaTime] = useState(0);

    const handleReady = () => {
        const entities = dataSource.current.cesiumElement._entityCollection.values;
        entities.forEach((entity) => {
            const name = entity.name;
            let color = colorHash[name];
            if (!color) {
                color = Color.fromRandom({ alpha: 1.0 });
                colorHash[name] = color;
            }
            entity.polygon.material = color;
            entity.polygon.outline = false;
            // entity.polygon.extrudedHeight =
            //     entity.properties.EINWOHNERZ / 10.0
        })
    };


    return (
        <>
            <GeoJsonDataSource ref={dataSource} data={swissPopulation} onLoad={handleReady} />
        </>
    );
};



export default SwissPopulation;
