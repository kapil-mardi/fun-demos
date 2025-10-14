import { useRef, useState } from "react";

function Draggable({ children, initialX, initialY, onPositionChange }) {
    const [position, setPosition] = useState({x : initialX || 10, y: initialY || 10 });
    const [isSelected, setIsSelected] = useState(false);
    const elementRef = useRef(null);
    const offsetRef = useRef({x :0, y: 0});

    const onMouseDown = (event) => {
        setIsSelected(true);
        const parent = elementRef.current.parentElement;
        const parentLeft = parent.getBoundingClientRect().left;
        const parentTop = parent.getBoundingClientRect().top;
        offsetRef.current = {
            x: event.clientX - elementRef.current.getBoundingClientRect().left + parentLeft,
            y: event.clientY - elementRef.current.getBoundingClientRect().top + parentTop,
        }
    }

    const onMouseMove = (event) => {
        if(!isSelected) return;
        setPosition(() => {
            const x =  event.clientX - offsetRef.current.x;
            const y =  event.clientY - offsetRef.current.y;
            return {x, y};
        });
        
        onPositionChange(position.x, position.y);
        
    }

    const onMouseUp = (event) => {
        setIsSelected(false);
    }

    return (
        <div 
            className="drag_container"
            ref={elementRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            style={{
                left: position.x,
                top: position.y
            }}>
                {children}
            </div>
    )
}

export default Draggable;