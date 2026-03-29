import { useState, useCallback, useEffect } from "react";

const useGeolocation = () => {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 1. Persistence: Restore on Mount
    useEffect(() => {
        const savedAddress = localStorage.getItem("user_address");
        const savedCoords = localStorage.getItem("user_coords");
        if (savedAddress) {
            setAddress(savedAddress);
            if (savedCoords) setLocation(JSON.parse(savedCoords));
        }
    }, []);

    const reverseGeocode = useCallback(async (lat, lng) => {
        setLoading(true);
        try {
            // Using OpenStreetMap (Nominatim) - No API Key Required
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
            );
            const data = await response.json();

            if (data && data.display_name) {
                const addr = data.address;
                const shortAddress = addr.city || addr.town || addr.suburb || addr.village || data.display_name.split(',')[0];
                
                // 2. Persistence: Save on Success
                setAddress(shortAddress);
                localStorage.setItem("user_address", shortAddress);
                localStorage.setItem("user_coords", JSON.stringify({ lat, lng }));
                
                setError(null);
            } else {
                setError("Location name not found");
            }
        } catch (err) {
            setError("Network error: Could not fetch location name");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const detectLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        setLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ lat: latitude, lng: longitude });
                reverseGeocode(latitude, longitude);
            },
            (err) => {
                let msg = "Geolocation failed";
                if (err.code === 1) msg = "Permission Denied by user";
                else if (err.code === 2) msg = "Location unavailable";
                else if (err.code === 3) msg = "Timeout reaching GPS";
                
                setError(msg);
                setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    }, [reverseGeocode]);

    return { location, address, detectLocation, loading, error };
};

export default useGeolocation;
