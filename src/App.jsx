import { useState } from "react";
import { useGetContactsQuery, useAddContactMutation, useDeleteContactMutation} from "redux/contactsApi";

const initialState = {
  name: '',
  phone:'',
}

function App() {
  const [state, setState] = useState(initialState)
  const { name, phone } = state;

  const { data = [], isLoading } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  function handleChange(e) {
    const { value, name } = e.target;

    setState(prevState => ({
      ...state,
      [name]:value,
    }))
      
  }
  async function handleSubmit(e) {
    e.preventDefault();
    await addContact({name, phone });
    setState(initialState);
  }
  async function handleDelete(id) {
    console.log(id)
    await deleteContact(id);
  }

  if (isLoading) {
    return <p>Loading...</p>
  }
  const elements = data.map(item => <li key={item.id}><p>Name: {item.name}</p><p>Phone: {item.phone}</p><button type='button' onClick={()=>handleDelete(item.id)}>delete</button></li>)


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input onChange={handleChange} name='name' value={name} type='text' placeholder="type name" required />
        </div>
        <div>
          <label>Phone:</label>
          <input onChange={handleChange} name='phone' value={phone} type='text' placeholder="type phone" required />
        </div>
        <button type='submit'>add contact</button>
      </form>

      <ul>
        {elements}
      </ul>
    </div>
  );
};

export default App;