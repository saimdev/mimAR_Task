export const signout = async (navigate) => {
  const googleUser = JSON.parse(localStorage.getItem("user"));
  const facebookUser = JSON.parse(localStorage.getItem("facebookUser"));
  const githubUser = JSON.parse(localStorage.getItem("githubUser"));
  if(googleUser){
    localStorage.removeItem('user');
  }
  else if (facebookUser){
    localStorage.removeItem('facebookUser');
  }
  else if(githubUser){
    localStorage.removeItem('githubUser');
  }
  else{
    const response = await fetch("/api/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await response.json();
  }
    
    // console.log(data);
  
    
      navigate('/login');
   
  };
  