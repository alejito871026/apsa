export default function ({ $axios,app}) {  
    $axios.onError(error => {
      const code = parseInt(error.response && error.response.status)
      console.log(code)
    })
  }