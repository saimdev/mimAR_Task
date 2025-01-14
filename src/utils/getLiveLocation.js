export const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude, error: null });
          },
          (error) => {
            console.error('Error getting location:', error);
            reject({
              latitude: null,
              longitude: null,
              error: 'Location access denied. Unable to fetch weather information.',
            });
          }
        );
      } else {
        reject({
          latitude: null,
          longitude: null,
          error: 'Geolocation is not supported by this browser.',
        });
      }
    });
  };
  