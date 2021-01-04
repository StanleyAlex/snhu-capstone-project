const registerUserService = async ({ registrationDetails }) => {
    const response = await fetch(`/api/registerUser`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({registrationDetails}),
        mode: "no-cors"
    });
    return response.json();
}

export default registerUserService;