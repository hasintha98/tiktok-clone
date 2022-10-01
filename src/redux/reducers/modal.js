import { CLEAR_MODAL, CURRENT_USER_POSTS_UPDATE, MODAL_OPEN_COMMENT_SECTION } from "../constants"

const initalState = {
    open: false,
    data: null,
    modalType: -1,
}

export const modal = (state = initalState, action) => {
    switch (action.type) {
        case MODAL_OPEN_COMMENT_SECTION:
            return {
                ...state,
                open: action.open,
                data: action.data,
                modalType: action.modalType,
            }
        case CLEAR_MODAL: 
            return initalState
        default :
            return state
    }
}