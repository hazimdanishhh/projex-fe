import { useEffect, useState } from "react";
import MessageUI from "../../../components/messageUI/MessageUI";
import { fetchAllUsers } from "../../../api/admin.api";

function AdminUsers() {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [users, setUsers] = useState([]);

  //   Get All Users on page load
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setMessage({ text: "Successfully fetched all users", type: "success" });
        setUsers(data);
      } catch (err) {
        console.error(err);
        setMessage({ text: "Failed to fetch users.", type: "error" });
      }
    };

    getUsers();
  }, []);

  return (
    <>
      <MessageUI message={message} setMessage={setMessage} />
      <section>
        <h1>Admin - All Users</h1>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table border="1" cellPadding="8" style={{ marginTop: "1rem" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}

export default AdminUsers;
