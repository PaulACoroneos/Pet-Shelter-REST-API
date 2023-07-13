import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pet } from '../types'


function PetList() {
    const [pets, setPets] = useState<Pet[] | null>(null)

    useEffect(() => {
        const getPets = async () => {
            const response = await fetch('http://localhost:3000/pets');
            const data: Pet[] | null = await response.json()
            if (response.status === 200) setPets(data)
        }
        getPets().catch(error => console.error(error)
    }, [])

    return (
        <>
            <h2>Pet List</h2>
            {pets?.map((pet) => {
                return (
                    <div key={pet?.id}>
                        <p>{pet?.name} - {pet?.type} - {pet?.breed}</p>
                        <Link to={`/${pet?.id}`}>
                            <button>Pet detail</button>
                        </Link>
                    </div>
                )
            }) ?? "No pets found"}
        </>
    )
}

export default PetList