import { View } from 'react-native';
import React, { useEffect } from 'react';
import * as Notifications from "expo-notifications";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const TASK_NAME = 'BACKGROUND_NOTIFICATION_TASK';
const WEDNESDAY = 3;

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true
    })
});

TaskManager.defineTask(TASK_NAME, () => {
    console.log("Background task started");

    try {
        const today = new Date();

        if (today.getDay() === WEDNESDAY) {
            const targetTime = new Date();
            targetTime.setHours(15, 40, 0, 0);

            if (today.getTime() < targetTime.getTime()) {
                Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'New trending movies!',
                        body: 'Click on and check!'
                    },
                    trigger: {
                        year: today.getFullYear(),
                        month: today.getMonth(),
                        day: today.getDate(),
                        hour: 14,
                        minute: 55,
                        second: 0
                    }
                });
            }
        }

        console.log("Background task ended");
        return BackgroundFetch.Result.NewData;
    } catch (err) {
        console.log("Background task encountered an error: ", err);
        return BackgroundFetch.Result.Failed;
    }
});

export default function MovieNotification() {
    async function validPermit() {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
            const { status: newStatus } = await Notifications.requestPermissionsAsync();
            return newStatus === 'granted';
        }
        return true;
    }

    useEffect(() => {
        (async () => {
            if (await validPermit()) {
                const isTaskRegistered = await TaskManager.isTaskRegisteredAsync(TASK_NAME);
                if (!isTaskRegistered) {
                    try {
                        await BackgroundFetch.registerTaskAsync(TASK_NAME, {
                            minimumInterval: 24 * 60 * 60, 
                            stopOnTerminate: false,
                            startOnBoot: true,
                        });
                        console.log(`${TASK_NAME} has been registered!`);
                    } catch (error) {
                        console.error("Failed to register task:", error);
                    }
                } else {
                    console.log(`${TASK_NAME} is already registered!`);
                }
            }
        })();
    }, []);

    return <View />;
}