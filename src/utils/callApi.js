const callAPi = ({url, method, data})=> {
    fetch(url,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method,
        body: JSON.stringify(data)
    }).then(response =>
        response.json().then(data => ({
                data: data,
                status: response.status
            })
        ).then(res => {
            console.log(res.status, res.data);
            return res;
        })).catch(e => console.log('Oops! something went wrong',e));

}

module.exports ={
    callAPi
};

