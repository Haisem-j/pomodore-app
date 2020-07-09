import React from 'react';


const NoMatch = (props)=>{

    setInterval(()=>{
        props.history.push('/')
    }, 3000)
    
    return(
        <h1>Link Does Not Exist</h1>
    )
}

export default NoMatch