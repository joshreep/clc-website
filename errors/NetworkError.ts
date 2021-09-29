import { AxiosResponse } from 'axios'

export default class NetworkError extends Error {
    constructor(response: Response | AxiosResponse, message = 'There was a problem performing the network request') {
        super(message)
        this.response = response
    }
    response: Response | AxiosResponse
}
