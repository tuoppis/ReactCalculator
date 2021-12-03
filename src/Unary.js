function Unary({type, context}) {
    return <button className="unary operator" onClick={() => context.putUnary(type)}>{type}</button>
}

export default Unary;