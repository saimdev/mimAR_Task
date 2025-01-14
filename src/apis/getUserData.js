export const getUserData = async (setEmail, setUsername, navigate, setLoading) => {
    const response = await fetch("/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await response.json();
    console.log(data);
    setEmail(data.email);
    setUsername(data.username);
    
  
    if (data.error || !data) {
      navigate("/login")
    } 
    else{
        setLoading(false);
    }
  };
  