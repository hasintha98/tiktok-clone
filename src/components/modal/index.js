import { View, Text } from 'react-native'
import React from 'react'
import BottomSheet from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRef } from 'react';
import { clearModal } from '../../redux/actions/modal';
import CommentModal from './comment';

const Modal = () => {

    const modalState = useSelector(state => state.modal)
    const bottomSheetRef = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if(modalState.open && bottomSheetRef.current) {
            bottomSheetRef.current.expand()

        }
     
    }, [modalState])
    
    const renderContent = () => {
        switch (modalState.modalType) {
            case 0:
                return (<CommentModal post={modalState.data} />)
            default:
                return (<></>)
        }
    }

    const onClose = () => {
        dispatch(clearModal())
    }
    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={["50%"]}
            index={-1}
            onClose={onClose}
            handleHeight={40}
            enablePanDownToClose


        >
            {renderContent()}

        </BottomSheet>
    )
}

export default Modal