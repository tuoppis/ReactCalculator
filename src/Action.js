function Action(props) {
    const {type, context} = props;
    const disabled = typeof props.display["disable"+type] !== "undefined";
    const getClass = (type) => {
        switch (type) {
            case "AC" : return "span-2" 
            case "=" : 
            default : return "";
        }
    }

    return <button onClick={() => context.action(type)} className={`action ${getClass(type)}`} disabled={disabled}>{type}</button>
}

export default Action;