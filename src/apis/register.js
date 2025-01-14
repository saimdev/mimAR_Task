export const registerUser = async (username, email, password, navigate) => {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
    }),
  });

  const data = await response.json();
  console.log(data);

  if (data.error || !data) {
    window.alert(data.error);
    window.location.reload();
  } else {
    window.alert(data.message);
    navigate("/login");
  }
};
