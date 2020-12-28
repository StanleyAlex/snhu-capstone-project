const loginUser = async ({ userName, password }) => {
    const response = await fetch(`/api/loginUser`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userName: "salex", password: "p@ssw0rd"}),
        mode: "no-cors"
    });
    return response.json();
}

export default loginUser;