import React, { useEffect } from 'react';
import {GeoJsonDataSource, IonResource} from "cesium";

const useDataSource = (viewer,id) => {
    console.log(viewer)
    useEffect(() => {
        const loadData = async () => {
            try {
                const resource = await IonResource.fromAssetId(id);
                const dataSource = await GeoJsonDataSource.load(resource);
                await viewer.dataSources.add(dataSource);
                await viewer.zoomTo(dataSource);
            } catch (error) {
                console.error(error);
            }
        };
        loadData();
    }, [viewer]);
};

export default useDataSource;
