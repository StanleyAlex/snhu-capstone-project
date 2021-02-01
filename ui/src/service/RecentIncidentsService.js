const recentIncidentsService = async () => {
    const response = await fetch(`/api/getRecentIncidents`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({}),
        mode: "no-cors"
    });
    return response.json();
}

export default recentIncidentsService;