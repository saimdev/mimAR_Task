export const signout = async (navigate) => {
    const response = await fetch("/api/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await response.json();
    // console.log(data);
  
    
      navigate('/login');
   
  };
  