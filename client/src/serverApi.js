class ServerApi {
    static getData = async (page) => {
        const response = await fetch('/api/page', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({page: page})
        });

        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    }
}

export default ServerApi;