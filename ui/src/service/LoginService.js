const loginUserService = async ({ userName, password }) => {
    const response = await fetch(`/api/loginUser`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userName, password}),
        mode: "no-cors"
    });
    return response.json();
}

export default loginUserService;