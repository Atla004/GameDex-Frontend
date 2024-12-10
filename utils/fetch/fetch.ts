const backendUrl = process.env.EXPO_PUBLIC_API_URL as string;

export const getToken = async (email: string) => {
  try {
    const response = await fetch(`${backendUrl}/api/user/send-reset-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }) 
    });
    return await response.json();
  } catch (error) {
    // setToast("Error getting profile data", true, 3000);
  }
};

export const getProfileData = async (_id: string, token: string, setMockData: any, setToast: any) => {
  try {
  const response = await fetch(`${backendUrl}/api/user/${_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log({ data });
  setMockData(data.data);
} catch (error) {
  console.error(error);
  setToast("Error getting profile data", true, 3000);
}
}