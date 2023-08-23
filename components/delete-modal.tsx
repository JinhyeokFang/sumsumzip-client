import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";

interface DeleteModalProps {
    title: string;
    description: string;
    children: JSX.Element;
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
    onDelete: () => void;
    onCancel: () => void;
}

export const DeleteModal = ( props: DeleteModalProps ) => {
    const {
        title,
        description,
        children,
        isOpen,
        onOpen,
        onOpenChange,
        onDelete,
        onCancel,
    } = props;

    const onModalDeleteClick = (onClose: () => void) => {
        onClose();
        onDelete();
    }

    const onModalCancelClick = (onClose: () => void) => {
        onClose();
        onCancel();
    }

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">{ title }</ModalHeader>
                    <ModalBody>
                        <p> 
                            { description }
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => onModalDeleteClick(onClose)}>
                            삭제
                        </Button>
                        <Button color="primary" onPress={() => onModalCancelClick(onClose)}>
                            취소
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
            { children }
        </>
    );
}