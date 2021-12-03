function Display({upper, lower}) {
    return (
        <div className="state">
            <p className="current-op">{upper}</p>
            <p className="current-num">{lower}</p>
        </div>
    );
}

export default Display;