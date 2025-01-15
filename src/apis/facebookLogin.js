export const facebookLogin = async (response, navigate) => {
    if (response?.status === "unknown") {
        console.error("Sorry!", "Something went wrong with facebook Login.");
        window.alert("Sorry!", "Something went wrong with facebook Login.");
        return;
      }
      console.log(response);
      localStorage.setItem('facebookUser', JSON.stringify({
        username: response.name,
        email: response.email
      }));
      navigate("/home");
    // if(accessToken){
    //     const response = await fetch(
    //         `https://graph.facebook.com/me?fields=name,email,picture&access_token=${accessToken}`,
    //       );
    //       const data = await response.json();
    //       console.log(data);
      
    //     if (data.error || !data) {
    //       window.alert(data.error);
    //       window.location.reload();
    //     } else {
    //     //   const username = data.name;
    //     //   const userEmail = data.email;
    //       localStorage.setItem('user', JSON.stringify({
    //         username: data.name,
    //         email: data.email
    //       }));
    //       navigate("/home")
    //     }
    // }
  };
  