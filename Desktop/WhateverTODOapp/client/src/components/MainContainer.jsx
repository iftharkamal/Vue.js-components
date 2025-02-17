import React, { useEffect, useState } from "react";
import API from "../services/api";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import SearchBar from "./SearchBar";

const MainContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedColor, setDraggedColor] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  // const [noteText, setNoteText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [otherNotes, setOtherNotes] = useState([]);

  const colors = ["red", "blue", "yellow", "green", "violet"];

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await API.get("/api/notes/get");
        console.log("fetched data :", res.data);
        if (Array.isArray(res.data)) {
          // If the response is an array, split it by pinned status.
          setPinnedNotes(res.data.filter((note) => note.pinned).reverse());
          setOtherNotes(res.data.filter((note) => !note.pinned).reverse());
        } else if (res.data && typeof res.data === "object") {
          // If the response is an object, assume it has pinnedNotes and otherNotes properties.
          setPinnedNotes(res.data.pinnedNotes || []);
          setOtherNotes(res.data.otherNotes || []);
        }
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        setPinnedNotes([]);
        setOtherNotes([]);
      }
    };
    fetchNotes();
  }, []);

  const handleDragStart = (color) => {
    setDraggedColor(color); // Save the dragged sphere's color
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    setEditingId(null);
    setNoteTitle("");
    setNoteDescription("");
    setIsModalOpen(true); // Open modal
  };

  // Save & update note and close modal
  const saveNote = async () => {
    if (noteTitle.trim() && noteDescription.trim()) {
      try {
        if (editingId) {
          // update existing note
          const updatedNote = await API.put(`/api/notes/edit/${editingId}`, {
            title: noteTitle,
            description: noteDescription,
          });
          // setNotes((prevNotes) => prevNotes.map((note,i)=> (i === editingIndex? updatedNote.data : note)))
          setPinnedNotes((prev) =>
            prev.map((note) =>
              note._id === editingId ? updatedNote.data : note
            )
          );
          setOtherNotes((prev) =>
            prev.map((note) =>
              note._id === editingId ? updatedNote.data : note
            )
          );
        } else {
          // create a new note
          const newNote = await API.post("/api/notes/add", {
            title: noteTitle,
            description: noteDescription,
            color: draggedColor,
          });
          // setNotes((prev) => [...prev,newNote.data])
          setOtherNotes((prev) => [...prev, newNote.data]);
        }

        setNoteTitle("");
        setNoteDescription("");
        setEditingId(null);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to save note:", error);
      }
    }
  };

  // Open modal for editing an existing note
  const handleNoteClick = (id, title, description) => {
    setEditingId(id); // Set the index of the note being edited
    // setNoteText(isPinned?  pinnedNotes[index].text : otherNotes[index].text); // Pre-fill the modal with the note text
    setNoteTitle(title);
    setNoteDescription(description);
    setIsModalOpen(true); // Open modal
  };

  const togglePin = async (id) => {
    try {
      const updatedNote = await API.put(`/api/notes/toggle-pin/${id}`);
      setPinnedNotes((prev) =>
        updatedNote.data.pinned
          ? [updatedNote.data, ...prev]
          : prev.filter((note) => note._id !== id)
      );
      setOtherNotes((prev) =>
        updatedNote.data.pinned
          ? prev.filter((note) => note._id !== id)
          : [updatedNote.data, ...prev]
      );
    } catch (error) {
      console.error("Failed to toggle pin:", error);
    }
  };

  // delete notes
  const deleteNotes = async (id) => {
    try {
      await API.delete(`/api/notes/delete/${id}`);
      setPinnedNotes((prev) => prev.filter((note) => note._id !== id));
      setOtherNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Failed to delete notes:", error);
    }
  };

  return (
    <div className=" w-[100vw] h-[100vh]">
      <div className="flex gap-10 w-full h-full">
        {/* Draggable Color Spheres */}
        <div className="flex flex-col gap-4 px-10  h-full w-[3%] items-center justify-center border-r border-r-gray-300">
          {colors.map((color) => (
            <div
              key={color}
              draggable
              onDragStart={() => handleDragStart(color)}
              className="w-8 h-8 rounded-full  cursor-grab shadow-sm"
              style={{
                backgroundColor: color,
              }}
            ></div>
          ))}
        </div>

        {/* Drop Area */}
        <div className="w-[98%] flex flex-col items-center justify-center">
          {/* SearchBar */}
          <div className="mt-6 mb-10 w-full flex justify-center items-center">
            <SearchBar />
          </div>

          {/* Notes Display */}
          <div
            className="flex flex-wrap gap-3 w-full h-full py-7"
            onDragOver={(e) => e.preventDefault()} // Allow drop
            onDrop={handleDrop}
          >
            {/* pinned section */}
            {pinnedNotes.length > 0 && (
              <div className="w-full">
                <h2 className="text-lg font-bold text-black/30 flex items-start">
                  PINNED
                </h2>
                <div className="flex flex-wrap gap-3 ">
                  {pinnedNotes.map((notes) => (
                    <div
                      key={notes._id || notes.createdAt}
                      onClick={() =>
                        handleNoteClick(
                          notes._id,
                          notes.title,
                          notes.description
                        )
                      }
                      style={{ backgroundColor: notes.color }}
                      className="text-white p-4 rounded-md  shadow-sm w-[250px] h-[200px] relative group"
                    >
                      {/* unpinned button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePin(notes._id);
                        }}
                        className="hidden group-hover:block absolute bg-black/45 px-2 py-1 cursor-pointer rounded-md text-white right-1 bottom-1.5"
                      >
                        <TbPinnedFilled />
                      </button>
                      {/* delete button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotes(notes._id);
                        }}
                        className="hidden group-hover:block absolute bg-black/45 px-2 py-1 cursor-pointer rounded-md text-white right-11 bottom-1.5"
                      >
                        <MdDelete />
                      </button>
                      <h3 className="font-semibold text-lg text-white/70">
                        {notes.title}
                      </h3>
                      <hr className="text-white/70 mb-3" />
                      <p className="text-sm">{notes.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* others section */}
            <div className="w-full">
              <h2 className="text-lg font-bold text-black/30 flex items-start">
                OTHERS
              </h2>
              <div className=" flex flex-wrap gap-3 ">
                {otherNotes.map((notes) => (
                  <div
                    key={notes._id || notes.createdAt}
                    onClick={() =>
                      handleNoteClick(notes._id, notes.title, notes.description)
                    }
                    style={{ backgroundColor: notes.color }}
                    className="text-white p-4 rounded-md  shadow-sm w-[250px] h-[200px] relative group"
                  >
                    {/* pinned button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePin(notes._id);
                      }}
                      className="hidden group-hover:block absolute bg-black/45 px-2 py-1 cursor-pointer rounded-md text-white right-1 bottom-1.5"
                    >
                      <TbPinned />
                    </button>
                    {/* delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotes(notes._id);
                      }}
                      className="hidden group-hover:block absolute bg-black/45 px-2 py-1 cursor-pointer rounded-md text-white right-11 bottom-1.5"
                    >
                      <MdDelete />
                    </button>
                    <h3 className="font-semibold text-lg text-white/70">
                      {notes.title}
                    </h3>
                    <hr className="text-white/70 mb-3" />
                    <p className="text-sm">{notes.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg w-[600px] text-center shadow-md">
            <h2>{editingId ? "Edit Note" : "Create a Note"}</h2>
            <input
              placeholder="Title..."
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="w-full rounded-md mt-2 outline-none border border-[#ccc] p-4"
            ></input>
            <textarea
              placeholder="Description..."
              rows="7"
              value={noteDescription}
              onChange={(e) => setNoteDescription(e.target.value)}
              className="w-full rounded-md mt-2 outline-none border border-[#ccc] p-4"
            ></textarea>
            <div className="mt-2">
              <button
                onClick={saveNote}
                className="mr-2 px-5 py-3 bg-[#007BFF] text-white border-none rounded-md cursor-pointer"
              >
                {editingId ? "Update" : "Save"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className=" px-5 py-3 bg-[#ccc] text-[#333] border-none rounded-md cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContainer;
