const requestOptions = (method, body) => {
    return {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }
}

export default requestOptions;