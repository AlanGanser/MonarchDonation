"use client";

import { GoogleMap, LoadScript, LoadScriptProps, useJsApiLoader } from "@react-google-maps/api";

const center: google.maps.LatLngLiteral = {
    lat: 31.7619,
    lng: -106.485,
};

const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
};

const libraries: LoadScriptProps["libraries"] = ["places"];

const Map = () => {
    const { isLoaded } = useJsApiLoader({
        id: "script-loader",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
        libraries
    });

    const onMapLoad = (map: google.maps.Map) => {
        new google.maps.KmlLayer({
            url: "https://docs.google.com/uc?id=14KAB00JSvWll-9mSWPyfgOwPRjC6YP6s&amp;export=kml",
            preserveViewport: true,
            suppressInfoWindows: true,
            map,
        });
    };

    return (
        <div className="mx-auto relative isolate max-w-7xl sm:px-6 lg:px-8 text-center py-6">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 px-6 lg:px-8">
                We Accept Donations from this Area
            </h2>
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: 400 }}
                    center={center}
                    options={mapOptions}
                    zoom={10}
                    onLoad={onMapLoad}
                ></GoogleMap>
            ) : (
                <div className="animate-pulse">
                    <div className="h-[400px] w-full bg-gray-200 rounded"></div>
                </div>
            )}
        </div>
    );
};

export default Map;
