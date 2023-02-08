import React, {useEffect, useRef} from 'react';
import {
    Camera,
    CameraLookAt, Cesium3DTileset,
    Entity,
    PointGraphics,
    Scene,
    ScreenSpaceCameraController, ScreenSpaceEvent,
    ScreenSpaceEventHandler,
    Viewer
} from "resium";
import * as Cesium from 'cesium';
import {Cartesian3, IonResource} from "cesium";


const position = Cartesian3.fromDegrees(6.83637, 	46.95448, 1000);
const offsetCamera = new Cartesian3(90,30,50)
Cesium.Ion.defaultAccessToken = process.env.REACT_APP_ION_ACCESS


export default ()=>{
    const viewerRef = useRef();

    useEffect(() => {
        const loadData = async () => {
            // const geoJSONURL = await IonResource.fromAssetId(1534580);
            // const geoJSON = await Cesium.GeoJsonDataSource.load(geoJSONURL, { clampToGround: true });
            // const dataSource = await viewerRef.current.cesiumElement.dataSources.add(geoJSON);
            // for (const entity of geoJSON.entities.values) {
            //     entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
            // }
            viewerRef.current.cesiumElement.scene.primitives.add(Cesium.createOsmBuildings());
            //viewerRef.flyTo(dataSource)
        };

        loadData();
    }, []);


    return(
            <Viewer
                ref= {viewerRef}
                style={{
                width:"100%",
                height:"100%"
            }}
                    homeButton = {false}
                    scene3DOnly={false}
                    navigationHelpButton={false}
                    timeline={false}
                    geocoder={true}
                    sceneModePicker={false}
                    projectionPicker={false}
                    baseLayerPicker={false}
                    animation={false}
                    terrainProvider={Cesium.createWorldTerrain()}
            >
                <Entity
                    name="Home, Boudry"
                    position={position}
                />

                <ScreenSpaceCameraController minimumZoomDistance={10} maximumZoomDistance={60000} />
                <CameraLookAt   target={position} offset={offsetCamera}/>
            </Viewer>
    )
}
