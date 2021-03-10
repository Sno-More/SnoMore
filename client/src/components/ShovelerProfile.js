import React from 'react'
import Card from './Card';


function ShovelerProfile() {

    const handleSaveCity = (event) => {
        event.preventDefault()
        console.log('find city')


    }

    return (
        <>

            <h1 style={{color:"white"}}>Find Jobs</h1>
            <form onSubmit={handleSaveCity}>
                <input
                    type="text"
                    value="Search your City"
                    placeholder=''
                />
                <input
                    type="submit"
                    value="Search" />

            </form>

            {/* google maps api here */}
            

            <h1 style={{color:"white"}}>Upcoming Jobs</h1>
            {/* lists the shoveler's upcoming jobs  */}
            <Card></Card>
            

        
        </>
    )
}

export default ShovelerProfile
