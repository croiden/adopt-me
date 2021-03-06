import * as React from "react";

import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
    const elRef = React.useRef(null);

    if (!elRef.current) {
        const div = document.createElement("div");
        elRef.current = div;
    }

    React.useEffect(() => {
        modalRoot.appendChild(elRef.current);
        return () => {
            modalRoot.removeChild(elRef.current);
        };
    }, []);

    return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
