import { GoogleMap } from "@react-google-maps/api";

const center: google.maps.LatLngLiteral = {
    lat: 31.7619,
    lng: -106.485,
};

const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
};

const AddressMap = ({ children }: { children?: React.ReactNode }) => {
    const onMapLoad = (map: google.maps.Map) => {
        new google.maps.KmlLayer({
            url: "https://docs.google.com/uc?id=14KAB00JSvWll-9mSWPyfgOwPRjC6YP6s&amp;export=kml",
            preserveViewport: true,
            suppressInfoWindows: true,
            map,
        });
    };
    return (
        <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={center}
            options={mapOptions}
            zoom={10}
            onLoad={onMapLoad}
        >
            {children}
        </GoogleMap>
    );
};

export default AddressMap;
