const getApiConfig = (token) => {
    return {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };
};

export default getApiConfig;