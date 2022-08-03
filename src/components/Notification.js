const Notification = (props) => {
    const styleClass = props.error? 'error':'success';
    if(props.msg === null)
        return null
    else
        return (
            <div className={`${styleClass} notification`}>
             {props.msg}
            </div>
        )   
}

export default Notification