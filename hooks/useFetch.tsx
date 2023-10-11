import {useState, useEffect} from 'react'
import axios from 'axios'

type furniture = {
    _id:string
    title:string
    supplier:string
    price:number
    imageUrl:string
    description:string
    product_Location:string
}
const useFetch = () => {
    const [data, setData] = useState<furniture[]>([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)

    const fetchData = async()=>{
        setLoading(true)
        try {
            const response = await axios.get('https://furnisale-backend.onrender.com/')
            console.log(response.data)
            setData(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    const refetch = ()=>{
        setLoading(true)
        fetchData();
    }
  return {data,isLoading,error,refetch}
}

export default useFetch