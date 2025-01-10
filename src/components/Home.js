import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router";

function Home() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [editingId, setEditingId] = useState(null); // Track the contact being edited
  const navigate = useNavigate();

  // Fetch contacts for the current user
  const fetchContacts = async () => {
    const q = query(
      collection(db, "contacts"),
      where("userId", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    setContacts(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  // Add or update a contact
  const handleAddContact = async () => {
    if (editingId) {
      // Update existing contact
      await updateDoc(doc(db, "contacts", editingId), {
        name,
        phone,
      });
      setEditingId(null); // Clear editing state
    } else {
      // Add new contact
      await addDoc(collection(db, "contacts"), {
        userId: auth.currentUser.uid, // Associate contact with the user
        name,
        phone,
      });
    }
    setName("");
    setPhone("");
    fetchContacts();
  };

  // Delete a contact
  const handleDeleteContact = async (id) => {
    await deleteDoc(doc(db, "contacts", id));
    fetchContacts();
  };

  // Handle editing a contact
  const handleEditContact = (contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setEditingId(contact.id);
  };

  // Logout user
  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Welcome, {auth.currentUser.email}</h2>
      <button className="btn btn-secondary mb-4" onClick={handleLogout}>
        Logout
      </button>
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddContact}>
          {editingId ? "Update Contact" : "Add Contact"}
        </button>
      </div>
      <ul className="list-group">
        {contacts.map((contact) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={contact.id}
          >
            <span>
              {contact.name} - {contact.phone}
            </span>
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEditContact(contact)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteContact(contact.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
