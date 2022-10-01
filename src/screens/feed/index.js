import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import styles from './styles'
import PostSingle from '../../components/post'
import { useRef } from 'react'
import { useEffect } from 'react'
import { getFeed, getPostsByUserId } from '../../services/posts'
import { useState } from 'react'
import useMaterialNavBarHeight from '../../hooks/useMaterialNavBarHeight'

export default function FeedScreen({ route }) {
    const { setCurrentUserProfileItemInView, creator, profile } = route.params
    const [posts, setPosts] = useState([])
    const mediaRefs = useRef([])

    useEffect(() => {
        console.log("called")
        if(profile) {
            
            getPostsByUserId(creator).then(setPosts)
        } else {
            getFeed().then(setPosts)
        }
       
    }, [])


    const onViewableItemsChanged = useRef(({ changed }) => {
        changed.forEach(element => {
            const cell = mediaRefs.current[element.key]
            if (cell) {
                //console.log('onViewableItemsChanged', element, element.isViewable)
                if (element.isViewable) {
                    if(!profile) {
                        setCurrentUserProfileItemInView(element.item.creator)
                    }
                    
                    cell.play()
                } else {
                    cell.stop()
                }
            }
        });
    })
    // const RenderItem = ({ item, index }) => {
    //     return (
    //         <View style={[{ flex: 1, height: Dimensions.get('window').height - 88 }, index % 2 == 0 ? { backgroundColor: 'blue' } : { backgroundColor: 'pink' }]}>
    //             <PostSingle item={item} ref={PostSingleRef => (mediaRefs.current[item.id] = PostSingleRef)} />
    //         </View>
    //     )
    // }

    
    const feedItemHeight = Dimensions.get('window').height - useMaterialNavBarHeight(profile)
    const RenderItem = ({ item, index }) => {
        // const backgroundColor = index % 2 ? 'red' : 'blue'
        console.log({feedItemHeight})
        return (
            <View style={[{ flex: 1, height: feedItemHeight }, index % 2 == 0 ? { backgroundColor: 'blue' } : { backgroundColor: 'pink' }]}>
                <PostSingle item={item} ref={PostSingleRef => (mediaRefs.current[item.id] = PostSingleRef)} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                pagingEnabled
                data={posts}
                windowSize={4}
                initialNumToRender={0}
                maxToRenderPerBatch={2}
                removeClippedSubviews
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 100
                }}
                renderItem={RenderItem}
                keyExtractor={item => item.id}
                decelerationRate={'normal'}
                onViewableItemsChanged={onViewableItemsChanged.current}
            />
        </View>
    )
}