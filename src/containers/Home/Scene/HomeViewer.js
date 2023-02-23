import React, {useEffect, useRef, useState} from 'react';
import {
    Camera,
    CameraLookAt, Cesium3DTileset, Clock, CzmlDataSource,
    Entity, GeoJsonDataSource, Globe,
    PointGraphics,
    Scene,
    ScreenSpaceCameraController, ScreenSpaceEvent,
    ScreenSpaceEventHandler,
    Viewer
} from "resium";
import * as Cesium from 'cesium';
import {Cartesian3, ClockRange, ClockStep, Color, IonResource, JulianDate} from "cesium";
import SwissPopulation from "./SwissPopulation";
import {useFrameLoop} from "../../../Hooks/UseFrameLoop";




const position = Cartesian3.fromDegrees(6.83637, 	46.95448, 1000);
const offsetCamera = new Cartesian3(90,30,50)
Cesium.Ion.defaultAccessToken = process.env.REACT_APP_ION_ACCESS

const czml = [
    {
        id: "document",
        name: "CZML Custom Properties",
        version: "1.0",
        clock: {
            interval: "1970/2010",
            currentTime: "1970",
            multiplier: 500000000,
        },
    },
    {
        id: "custom_property_object",
        name: "An object with custom properties",
        properties: {
            constant_property: true,
            population_sampled: {
                number: [
                    "1970",
                    2209600,
                    "1980",
                    2889700,
                    "1990",
                    3307600,
                    "2000",
                    4326900,
                    "2010",
                    5049100,
                ],
            },
        },
    },
    {
        id: "colorado",
        name: "Colorado",
        polygon: {
            positions: {
                cartographicDegrees: [
                    -109.03,
                    41,
                    0,
                    -102.03,
                    41,
                    0,
                    -102.03,
                    37,
                    0,
                    -109.03,
                    37,
                    0,
                ],
            },
            material: {
                solidColor: {
                    color: {
                        rgba: [0, 255, 0, 150],
                    },
                },
            },
            height: 0,
            extrudedHeight: 0,
        },
    },
];

export default ()=>{
    const viewerRef = useRef();
    const czmlRef= useRef();
    const scaleProperty=(property, scalingFactor)=>{
        return new Cesium.CallbackProperty(function (time, result) {
            result = property.getValue(time, result);
            result = result * scalingFactor;
            return result;
        }, property.isConstant);
    }

    const onLoad=()=>{
        console.log(czmlRef.current.cesiumElement.entities.getById("custom_property_object"))
        const customPropertyObject = czmlRef.current.cesiumElement.entities.getById("custom_property_object")
        const property = customPropertyObject.properties["population_sampled"];
        const colorado = czmlRef.current.cesiumElement.entities.getById("colorado");
        colorado.polygon.extrudedHeight = scaleProperty(property, 1 / 50.0);
    }

    // useEffect(()=>{
    //     viewerRef.current.cesiumElement.entities.add({
    //             position: Cesium.Cartesian3.fromDegrees(-75.1641667, 39.9522222),
    //             label: {
    //                 text: "Philadelphia",
    //             },
    //         });
    // },[])
    // const loadData = async () => {
        //     try {
        //         const resource = await IonResource.fromAssetId(1536909);
        //         const dataSource = await GeoJsonDataSource.load(resource);
        //         await viewerRef.current.cesiumElement.dataSources.add(dataSource);
        //         await viewerRef.current.cesiumElement.zoomTo(dataSource);
        //     } catch (error) {
        //         console.error(error);
        //     }
    // useEffect(() => {
    //     const loadData = async () => {
    //         viewerRef.current.cesiumElement.scene.primitives.add(Cesium.createOsmBuildings());
    //         console.log(viewerRef.current.cesiumElement.scene.primitives._primitives[0])
    //         viewerRef.current.cesiumElement.scene.primitives._primitives[0].loadProgress.addEventListener(function(numberOfPendingRequests, numberOfTilesProcessing) {
    //             if ((numberOfPendingRequests === 0) && (numberOfTilesProcessing === 0)) {
    //                 console.log('Stopped loading');
    //                 return;
    //             }
    //             console.log(`Loading: requests: ${numberOfPendingRequests}, processing: ${numberOfTilesProcessing}`);
    //         });
    //         // const geoJSONURL = await IonResource.fromAssetId(1534580);
    //         // const geoJSON = await Cesium.GeoJsonDataSource.load(geoJSONURL, { clampToGround: true });
    //         // const dataSource = await viewerRef.current.cesiumElement.dataSources.add(geoJSON);
    //         // for (const entity of geoJSON.entities.values) {
    //         //     entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
    //         // }
    //         //viewerRef.flyTo(dataSource)
    //     };
    //
    //     loadData();
    // }, []);

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
                timeline={true}
                geocoder={true}
                sceneModePicker={false}
                projectionPicker={false}
                baseLayerPicker={true}
                animation={true}
                shouldAnimate={true}
            >
                <CzmlDataSource ref={czmlRef}  data={czml} onLoad={onLoad} />

                {/*<SwissPopulation vieweRef={viewerRef}/>*/}
                {/*<ScreenSpaceCameraController minimumZoomDistance={10}  />*/}
                {/*<CameraLookAt   target={position} offset={offsetCamera}/>*/}
            </Viewer>
    )
}
