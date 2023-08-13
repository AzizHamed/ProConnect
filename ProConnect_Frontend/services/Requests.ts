import axios from 'axios';

const baseUrl = 'http:/localhost:8080';


export async function GetData()
{
    // Passing configuration object to axios
    axios({
        method: 'get',
        url: `${baseUrl}/test/hello`,
    }).then((response) =>
    {
        console.log("**************");
        console.log(response.data);
        console.log("**************");
    });
}
