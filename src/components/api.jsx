export async function postApi(endpoint, payload = {}) {
    const url = `${import.meta.env.VITE_BACKEND_URL}${endpoint}`
    const token = localStorage.getItem("token");

    try {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(payload)
        })
        res = await res.json()
        return res
    } catch (error) {
        console.error("error : ", error)
        return error
    }
}


export async function getAPI(endpoint, param = null) {
    let query = "";
    if (param !== null) {
        // if param is an object (e.g., { id: 2 }), build query string automatically
        if (typeof param === "object") {
            query = "?" + new URLSearchParams(param).toString();
        } else {
            // if param is a single value, assume it's an id
            query = `?id=${param}`;
        }
    }

    const url = `${import.meta.env.VITE_BACKEND_URL}${endpoint}${query}`;
    const token = localStorage.getItem("token");

    try {
        let res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            }
        })
        res = await res.json()
        return res
    } catch (error) {
        console.error("error : ", error)
        return error
    }
}

export async function patchAPI(endpoint, payload) {
    const token = localStorage.getItem("token");
    const url = `${import.meta.env.VITE_BACKEND_URL}${endpoint}`
    try {
        let res = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(payload),
        })
        res = await res.json()
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

