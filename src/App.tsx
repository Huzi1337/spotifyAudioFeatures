import { useRef, useState } from "react";
import "./App.css";

function App() {
  const ref = useRef<HTMLInputElement>(null);
  const uploadHandler = async () => {
    console.log(ref.current?.files);
    try {
      const formData = new FormData();
      if (ref.current && ref.current.files) {
        formData.append("file", ref.current?.files[0]);
        fetch("http://localhost:3000/upload", {
          method: "POST",
          body: formData,
        });
      } else throw new Error("No file selected");
    } catch (err) {
      console.log(err);
    }
  };
  const fileHandler = (event: React.ChangeEvent) => {
    console.log(event);
  };

  return (
    <>
      <input ref={ref} type="file" onChange={fileHandler} />
      <button onClick={uploadHandler}>Upload</button>
    </>
  );
}

export default App;
