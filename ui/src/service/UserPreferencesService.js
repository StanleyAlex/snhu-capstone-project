const getUserPreferences = async ({ userId }) => {
    const response = await fetch(`/api/getUserPreferences`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ userId }),
        mode: "no-cors"
    });
    return response.json();
}

const saveUserPreferences = async ({ userId, userPreferences }) => {
    const response = await fetch(`/api/saveUserPreferences`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ userId, userPreferences }),
        mode: "no-cors"
    });
    return response.json();
}

export { getUserPreferences, saveUserPreferences };