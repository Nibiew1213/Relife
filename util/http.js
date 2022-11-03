import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../store/auth-context'

const BACKEND_URL = 'https://relife-test-64ea0-default-rtdb.asia-southeast1.firebasedatabase.app//'

export async function storeGoal(goalData) {
    const response = await axios.post(BACKEND_URL + '/goals.json', goalData)
    const id = response.data.name // firebase's auto generated id is termed as name
    return id
}

export async function fetchGoals() {
    const response = await axios.get(BACKEND_URL + '/goals.json')
    
    const goals = []
    // console.log(response.data)
    
    for (const key in response.data) {
        const goalObj = {
            id: key,
            title: response.data[key].title, // [key] is to dynamically access a property in which name is store in that key constant 
            description: response.data[key].description, 
            date: new Date(response.data[key].date), // new Date() constructor to transform date string to date object
        }
        goals.push(goalObj)
    }

    return goals
}

export function updateGoal(id, goalData) {
    return axios.put(BACKEND_URL + `/goals/${id}.json`, goalData)
}

export function deleteGoal(id) {
    return axios.delete(BACKEND_URL + `/goals/${id}.json`)
}