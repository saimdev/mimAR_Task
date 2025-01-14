export const signin = async (email, password, navigate, setLoading) => {
  const response = await fetch("https://mim-ar-task-server.vercel.app/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const data = await response.json();
  console.log(data);

  if (data.error || !data) {
    window.alert(data.error);
    window.location.reload();
  } else {
    setLoading(false);
    window.alert(data.message);
    navigate('/home');
  }
};
