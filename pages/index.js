import React, { useEffect, useState } from 'react';

export default  function Home() {
    const [ipAddress, setIpAddress] = useState('');

    useEffect(() => {
        const fetchIpAddress = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                setIpAddress(data.ip);
            } catch (error) {
                console.log(error);
            }
        };

        fetchIpAddress();
    }, []);

    return (
        <div>
            <h1>Your IP Address: {ipAddress}</h1>
        </div>
    );
};

