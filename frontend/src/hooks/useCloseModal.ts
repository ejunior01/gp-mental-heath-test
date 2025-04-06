import { useEffect, useState } from "react";

export function useCloseModal(shouldClose: boolean) {
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (shouldClose) {
            setModalOpen(false);
        }
    }, [modalOpen, shouldClose]);
    return { modalOpen, setModalOpen };
}