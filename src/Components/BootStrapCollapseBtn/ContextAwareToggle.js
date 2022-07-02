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
        <button
            className="btn p-0 me-3"
            type="button"
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
}
export default ContextAwareToggle;