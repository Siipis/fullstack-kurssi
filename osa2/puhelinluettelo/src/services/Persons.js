import axios from 'axios'

const getAll = () => {
  return axios
    .get('http://localhost:3001/persons')
    .then(result => result.data)
}

const create = (person) => {
  return axios
    .post('http://localhost:3001/persons', person)
}

const update = (person) => {
  return axios
    .put(`http://localhost:3001/persons/${person.id}`, person)
}

const remove = (person) => {
  return axios
    .delete(`http://localhost:3001/persons/${person.id}`)
}

export default { getAll, create, update, remove }
