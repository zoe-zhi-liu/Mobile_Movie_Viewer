import React, { useEffect, useState } from 'react';
import { Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Item from '../components/Item';
import HeaderRight from '../components/HeaderRight';
import Color from '../components/Color';
import Style from '../components/Style';

import * as Notifications from 'expo-notifications';
import { API_KEY } from '@env';

export default function Home({ navigation }) {
    const [data, setData] = useState([]);
    const genresMap = new Map();

    useEffect(() => {
        async function fetchGenres() {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
                const json = await response.json();
                json.genres.forEach((genre) => genresMap.set(genre.id, genre.name));
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchMovieDetails(movie) {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`);
                const json = await response.json();
                return {
                    id: movie.id,
                    name: movie.original_title,
                    release_date: movie.release_date,
                    genres: movie.genre_ids.map((id) => genresMap.get(id)).join(', '),
                    runtime: json.runtime,
                    poster_path: movie.poster_path,
                    overview: json.overview,
                };
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchAllData() {
            try {
                await fetchGenres();
                const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
                const json = await response.json();
                const detailsPromises = json.results.map(fetchMovieDetails);
                const detailedMovies = await Promise.all(detailsPromises);
                setData(detailedMovies);
            } catch (error) {
                console.error(error);
            }
        }

        fetchAllData();
    }, []);

    const getRandomMovieGenre = () => {
        const genres = ["Animation", "Action", "Adventure", "Comedy", "Romance", "Fantasy", "Family", "Horror"];
        return genres[Math.floor(Math.random() * genres.length)];
    }

    const handleNotification = async () => {
        const { status } = await Notifications.requestPermissionsAsync();

        if (status === 'granted') {
            const randomGenre = getRandomMovieGenre();
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Movie Recommendation',
                    body: `Today is a good day for a ${randomGenre} movie!`,
                },
                trigger: null,
            });
        }
    };

    return (
        <LinearGradient
            colors={[Color.gradientStart, Color.gradientEnd, Color.gradientFinal]}
            style={styles.container}>
            <HeaderRight title="VanMovie" navigation={navigation} />
            <Text style={styles.title}>What's new!</Text>
            <Pressable style={[Style.button, Style.buttonDefaultWidth, styles.buttonMargin]} onPress={handleNotification}>
                <Text style={Style.buttonText}>NTFY: Movie Recommendation</Text>
            </Pressable>
            <FlatList
                data={data}
                renderItem={(item) => <Item info={item.item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
        color: '#333',
    },
    buttonMargin: {
        marginBottom: 10,
    },
});