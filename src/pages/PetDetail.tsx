import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Pet } from '../types'

function PetDetail({ setPetToEdit }) {

  const [pet, setPet] = useState<Pet | null>(null)

  const { petId } = useParams()

  useEffect(() => {
    const executeFetch = async () => {
      const response = await fetch(`http://localhost:3000/pets/${petId}`)
      const data = await response.json();
      if (response.status === 200) {
        setPet(data)
        setPetToEdit(data)
      }
    }
    executeFetch().catch(error => console.error(error))
  }, [])

  const deletePet = async () => {
    try {
      const response = await fetch(`http://localhost:3000/pets/${petId}`, {
        method: 'DELETE'
      })

      if (response.status === 200) window.location.href = '/'
      else console.error(`Could not delete pet ${petId ?? 'undefined petId'}.`);
      
    } catch (error) {
      console.error('error', error)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2>Pet Detail</h2>
      {pet ? (
        <>
          <p>Pet name: {pet.name}</p>
          <p>Pet type: {pet.type}</p>
          <p>Pet age: {pet.age}</p>
          <p>Pet breed: {pet.breed}</p>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Link to={`/${pet?.id}/edit`}>
              <button style={{ marginRight: 10 }}>Edit pet</button>
            </Link>

            <button
              style={{ marginLeft: 10 }}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={deletePet}
            >
              Delete pet
            </button>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default PetDetail