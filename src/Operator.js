function Operator({type, context}) {
    return <button className="operator" onClick={() => context.putOperator(type)}>{type}</button>
}

export default Operator;