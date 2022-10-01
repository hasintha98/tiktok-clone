import { CURRENT_USER_POSTS_UPDATE } from "../constants"

const initalState = {
    currentUserPosts: null,
}

export const posts = (state = initalState, action) => {
    switch (action.type) {
        case CURRENT_USER_POSTS_UPDATE:
            return {
                ...state,
                currentUserPosts: action.currentUserPosts,
            }
        default :
            return state
    }
}