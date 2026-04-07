import { onMounted, ref } from "vue"

export function useFetch(url){

    const data =  ref(null)
    const loading = ref(false)
    const error = ref(null)
    
    const fetchData = async() =>{
        try{
            loading.value = true
            const res = await fetch(url)
            console.log("res",res)
            await new Promise (res => setTimeout(res,2000))
            data.value = await res.json()
            console.log(data.value)
        }
        catch(err){
            error.value = err.message
        }
        finally{
            loading.value = false
        }
    }

    onMounted(fetchData)

    return {
        data,
        loading,
        error
    }

}