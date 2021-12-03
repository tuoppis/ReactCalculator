function Numerator({type, context}) {
    return <button className="number" onClick={() => context.putNumber(type)}>{type}</button>
}

export default Numerator;