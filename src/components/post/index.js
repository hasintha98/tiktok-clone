import { View, Text } from 'react-native'
import React from 'react'
import { Video } from 'expo-av'
import styles from './styles'
import { useRef } from 'react';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import { useEffect } from 'react';
import { useUser } from '../../hooks/useUser';
import PostSingleOverlay from './overlay';

export const PostSingle = forwardRef(({ item }, parentRef) => {
    const ref = useRef(null);
    const user = useUser(item.creator).data
    console.log(user)
    useImperativeHandle(parentRef, () => ({
        play,
        unload,
        stop
    }))

    useEffect(() => {
        return () => unload()

    }, [])


    const play = async () => {
        if (ref.current == null) {
            return;
        }

        const status = await ref.current.getStatusAsync()

        if (status?.isPlaying) {
            return;
        }

        try {
            await ref.current.playAsync();
        } catch (e) {
            console.log(e)
        }


    }

    const stop = async () => {
        if (ref.current == null) {
            return;
        }

        const status = await ref.current.getStatusAsync()

        if (!status?.isPlaying) {
            return;
        }

        try {
            await ref.current.stopAsync();
        } catch (e) {
            console.log(e)
        }

    }

    const unload = async () => {
        console.log('unload')
        if (ref.current == null) {
            return;
        }

        try {
            await ref.current.unloadAsync();
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <>
    
            <PostSingleOverlay user={user} post={item}/>
        
            <Video
                ref={ref}
                style={styles.container}
                resizeMode={"cover"}
                shouldPlay={false}
                isLooping={true}
                usePoster
                posterSource={{ uri: item.media[1] }}
                posterStyle={{ resizeMode: 'cover', height: '100%' }}
                source={{ uri: item.media[0] }}
            />
        </>
    )
})

export default PostSingle;