export const registerUserToBackend=async (userId:string, userName:string)=> {
    const response = await fetch("http://localhost:8000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID: userId,
        UserName: userName,
      }),
    });
  
    if (response.ok) {
      console.log("User registered successfully");
    } else {
      console.error("Failed to register user", response.status);
    }
  }
  