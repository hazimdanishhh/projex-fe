import { useParams } from "react-router-dom";

function UserDetails() {
  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(userId);
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <>
      <div>UserDetails</div>
      <h1>User: {user.name}</h1>
      <p>Email: {user.email}</p>
    </>
  );
}

export default UserDetails;
