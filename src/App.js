import { useState } from "react";
import './index.css'

function App() {
  const [form, setForm] = useState({ name: 'jack' })

  const handleChange = () => {
    setForm({
      name: 'tom' 
    })
  }
  return (
    <div className="App">
      {form.name}
      <div onClick={handleChange}> 1111</div>
    </div>
  );
}

export default App;
