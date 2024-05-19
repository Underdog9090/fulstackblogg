import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./user";

export default function Header() {
  const { setuserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Token not available, handle accordingly (e.g., redirect to login)
      // window.location.href = "/login";
      return;
    }

    fetch("http://localhost:4000/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      response.json().then((userInfo) => {
        setuserInfo(setuserInfo(userInfo));
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    localStorage.removeItem("token");
    setuserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            {/* <Link to="/">Home</Link> */}
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}


// //latest version
// import { useContext, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { UserContext } from "./user";

// export default function Header() {
//   const { setuserInfo, userInfo } = useContext(UserContext);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       // Token not available, handle accordingly (e.g., redirect to login)
//       // window.location.href = "/login";
//       return;
//     }

//     fetch("http://localhost:4000/profile", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((response) => {
//       response.json().then((userInfo) => {
//         setuserInfo(setuserInfo(userInfo));
//       });
//     });
//   }, []);

//   function logout() {
//     fetch("http://localhost:4000/logout", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     localStorage.removeItem("token");
//     setuserInfo(null);
//   }

//   const username = userInfo?.username;

//   return (
//     <header>
//       <Link to="/" className="logo">
//         MyBlog
//       </Link>
//       <nav>
//         {username && (
//           <>
//             <Link to="/create">Create Post</Link>
//             <a onClick={logout}>Logout</a>
//           </>
//         )}
//         {!username && (
//           <>
//             {/* <Link to="/">Home</Link> */}
//             <Link to="/login">Login</Link>
//             <Link to="/register">Register</Link>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// }