import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
    // const {buttonText, children} = props;
    const [visible, setIsVisable] = useState(false);

    const toggleVisibility = () => {
        setIsVisable(!visible);
    }
    const displayWhenVisible = {display: visible? '' : 'none'}
    const displayWhenHidden = {display: visible? 'none' : ''}

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })
    return (
        <div>
            <button
                style={displayWhenHidden}
                onClick={() => toggleVisibility()}
            >
                {props.buttonText}
            </button>
            <div
                style={displayWhenVisible}
            >
                {props.children}
                <button
                    onClick={() => toggleVisibility()}
                >
                    cancel
                </button>
            </div>
        </div>
    )
})

export default Togglable