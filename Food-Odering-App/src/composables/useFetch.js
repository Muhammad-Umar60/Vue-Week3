import { onMounted, ref } from "vue"

export function useFetch(url){

    const data =  ref([])
    const loading = ref(false)
    const error = ref(null)
    
    const fetchData = async() =>{
        try{
            loading.value = true
            const res = await fetch(url)
            console.log("res",res)
            data.value = await res.json()
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