import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import HeaderRight from '../components/HeaderRight';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Color from '../components/Color';
import { LinearGradient } from 'expo-linear-gradient';


export default function Cinema({ navigation }) {
    const [cinemas, setCinemas] = React.useState([]);
    const [loc, setLoc] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    async function valid() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        return status === 'granted';
    }

    useEffect(function () {
        async function getCinemas() {
            
            const response = await fetch('https://www.cineplex.com/api/v1/theatres?language=en-us&range=500&skip=0&take=1000');
            const json = await response.json();
            const puredt = json.data.map(c => {
                return { name: c.name, address: c.address1, city: c.city, latitude: c.latitude, longitude: c.longitude };
            });
            setCinemas(puredt);
            
        }
        getCinemas();
    }, []);

    useEffect(function () {
        async function getLoc() {
            setLoading(true);
            const pm = await valid();
            if (pm) {
                const location = await Location.getCurrentPositionAsync({});
                setLoc(location.coords);
                setLoading(false);
            }
            
        }
        getLoc();
    }, [Location]);

    return (
        <LinearGradient 
            colors={[Color.gradientStart, Color.gradientEnd, Color.gradientFinal]}
            style={styles.container}>
            <HeaderRight title="Cinemas" navigation={navigation} />

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>loading</Text>
                </View>
            ) : (
                <>
                    {loc && (
                        <MapView style={styles.map}
                            initialRegion={{
                                latitude: loc.latitude,
                                longitude: loc.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421
                            }}>
                            <Marker coordinate={{ latitude: loc.latitude, longitude: loc.longitude }} title="You are here">
                                <Image source={require('../images/star.png')} style={styles.markerImage} />
                                <Text>You</Text>
                            </Marker>
                            {cinemas.map(c => (
                                <Marker key={c.name}
                                    coordinate={{ latitude: c.latitude, longitude: c.longitude }}
                                    title={c.name}
                                    description={c.address}
                                />
                            ))}
                        </MapView>
                    )}
                    <Text style={styles.listTitle}>List of Cinemas</Text>
                    <FlatList data={cinemas} renderItem={({ item }) => <CinemaItem i={item} />} />
                </>
            )}
        </LinearGradient>
    );
}

const CinemaItem = ({ i }) => (
    <View style={styles.commentText}>
        <Text>{i.name} in {i.city}</Text>
        <Text>{i.address}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    map: {
        width: '100%',
        height: 300,
    },
    markerImage: {
        width: 25,
        height: 25,
    },
    listTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
        color: '#333',
    },
    commentText: {
        fontSize: 16,
        color: '#444',
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 5,
    },
    poster: {
        width: '100%',
        height: 300,
    },
    details: {
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    overview: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
    comments: {
        padding: 20,
        backgroundColor: '#fff',
    },
    commentsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
});
