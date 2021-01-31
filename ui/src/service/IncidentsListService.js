const incidentsListService = async ({ locations, currentPage, type, pages }) => {
    const response = await fetch(`/api/getIncidents`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ locations, currentPage, type, pages }),
        mode: "no-cors"
    });
    return response.json();
}

export default incidentsListService;