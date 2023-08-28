"use client";

import { memo } from "react";
import { GoogleMap, KmlLayer, useJsApiLoader } from "@react-google-maps/api";
import styles from "../styles/map.module.css";

const center: google.maps.LatLngLiteral = {
    lat: 31.7619,
    lng: -106.485,
};

const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
};

const Map = ({ height }: { height: number | string }) => {
    const { isLoaded } = useJsApiLoader({
        id: "script-loader",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
    });

    return isLoaded ? (
        <div className="mx-auto relative isolate max-w-7xl sm:px-6 lg:px-8 text-center py-6">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                We Accept Donations from this Area
            </h2>
            <GoogleMap
                mapContainerStyle={{ width: "100%", height: height }}
                center={center}
                options={mapOptions}
                zoom={10}
            >
                <KmlLayer url="https://docs.google.com/uc?id=14KAB00JSvWll-9mSWPyfgOwPRjC6YP6s&amp;export=kml"></KmlLayer>
            </GoogleMap>
            {/* <div
        className="pointer-events-none absolute left-12 top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-3xl lg:bottom-[-12rem] lg:top-auto lg:translate-y-0 lg:transform-gpu"
        aria-hidden="true"
      >
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-25"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div> */}
        </div>
    ) : (
        <></>
    );
};

export default memo(Map);
