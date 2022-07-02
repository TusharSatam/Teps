import { useContext } from "react";
import { AccordionContext, useAccordionButton } from "react-bootstrap";

function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <div className="me-3">
            <button
                style={{ border: "none", background: "transparent" }}
                className=" p-0 m-0"
                type="button"
                onClick={decoratedOnClick}
            >
                {children}
            </button>
        </div>
    );
}
export default ContextAwareToggle;