import { useState } from "react";


// export default function Home({age}) {
//     if(age>18) return <h2>Welcome</h2>;
//     else return <h2>Not Allowed</h2>;
//   }

// export default function Home({age}) {
//     return age>18 ? <h2>Welcome</h2> : <h2>Not Allowed</h2>;
//   }

// export default function Home({age}) {
//     return age>18 && <h2>Welcome</h2>;
//   }

// export default function Home() {
//     const handleClick = () => {
//         alert("Hello!");
//     }
//     const handleSubmit = (name) => {
//         alert(`Hello ${name}!`);
//     }
//     return (
//     <>
//     <h2>Hello World</h2>
//     <button onClick={handleClick}>Click</button>
//     <button onClick={() => handleSubmit("Bhargavi")}>Submit</button>
//     </>
//     )
//   }


// export default function Home() {
//     const [score, setScore] = useState(0);
//     const increment = () => {
//         setScore(score+1);
//     }
//     const decrement = () => {
//         setScore(score-1);
//     }
//     return (
//     <>
//     <p>{score}</p>
//     <button onClick={increment}>Increment Score</button>
//     <button onClick={decrement}>Decrement Score</button>
//     </>
//     )
//   }

export default function Home() {
  const [run, setRun] = useState(0);
  const [wicket, setWicket] = useState(0);
  const [text, setText] = useState("");

  const incRun = () => {
    setRun(run + 1);
    setText("Well Done");
  };

  const incWick = () => {
    setWicket(wicket + 1);
    setText("Better Luck Next Time");
  };

  return (
    <>
      <button onClick={incRun}>Runs</button>
      <p>{run}</p>
      <button onClick={incWick}>Wickets</button>
      <p>{wicket}</p>
      <div>
        <p>{text}</p>
      </div>
    </>
  );
}


// register form, component folder, last name first name, email, password

// export default function Register() {
    
// }