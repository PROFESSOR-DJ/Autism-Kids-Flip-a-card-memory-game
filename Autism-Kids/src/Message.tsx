function Message(){
    //PascalCasing
    //JSX: JavaScript XML
    //JSX is a syntax extension for JavaScript that looks similar to XML or HTML.
    const name="";
    if (name) {
        return <h1>Hello {name}</h1>;
    }
    return <h1>Hello World</h1>;
}

export default Message;
