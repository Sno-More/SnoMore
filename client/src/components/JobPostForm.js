export default function JobPostForm ({ handleCarSubmit, handleCarAddress, handleCarHeight, handleCarRate, carAddress, carHeight, carRate }) {

    return(
        <>
        <h3>CAR SHOVEL</h3>
        <form onSubmit={handleCarSubmit}>
            <input
            type="text"
            value={carAddress}
            onChange={handleCarAddress}
            placeholder='Address' />
            <input
            type="text"
            value={carHeight}
            onChange={handleCarHeight}
            placeholder='Approximate height of snow' />
            <input
            type="text"
            value={carRate}
            onChange={handleCarRate}
            placeholder='Rate'/>
            <input
            type="submit"
            value="Submit" />
        </form>
        </>
    )
}