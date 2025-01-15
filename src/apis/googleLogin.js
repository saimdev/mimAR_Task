export const googleLogin = async (googleUser, navigate) => {
    if(googleUser){
        const response = await fetch(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${googleUser.access_token}`,
                Accept: "application/json",
              },
            }
          );
          const data = await response.json();
          console.log(data);
      
        if (data.error || !data) {
          window.alert(data.error);
          window.location.reload();
        } else {
        //   const username = data.name;
        //   const userEmail = data.email;
          localStorage.setItem('user', JSON.stringify({
            username: data.name,
            email: data.email
          }));
          navigate("/home")
        }
    }
  };
  