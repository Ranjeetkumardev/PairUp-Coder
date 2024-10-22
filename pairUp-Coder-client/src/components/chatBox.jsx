import { useEffect, useState } from "react";
import { ImageOffIcon, Send, X } from "lucide-react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const socket = io("http://localhost:8484", { autoConnect: false }); // Connect to the server

const ChatBoxModal = ({ selectedConnection, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (selectedConnection) {
      if (!socket.connected) {
        socket.connect();
      }

      const userId = user?._id;

      // Emit an event to fetch previous messages for the selected user
      socket.emit('fetchMessages', { userId });

      // Listen for incoming messages
      socket.on('newMessage', (message) => {
        console.log("New message:", message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      // Listen for previous messages
      socket.on('previousMessages', (previousMessages) => {
        console.log("Previous messages:", previousMessages);
        setMessages(previousMessages);
      });

      return () => {
        socket.off('newMessage');
        socket.off('previousMessages');
        socket.disconnect();
      };
    }
  }, [selectedConnection]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") {
      console.error('Cannot send an empty message');
      return;
    }

    if (!selectedConnection || !selectedConnection._id) {
      console.error('No user selected or invalid user ID');
      return;
    }

    if (!user?._id) {
      console.error('User ID is missing');
      return;
    }

    const message = {
      content: newMessage,
      sender: user._id,
      receiverId: selectedConnection._id,
    };

    console.log("Sending message:", message);
    socket.emit('sendMessage', message); // Emit the sendMessage event
    setNewMessage(""); // Clear the input field after sending
  };

  return (
    <div className="fixed right-2 bottom-4 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-96 h-[85vh] bg-gray-800 text-white rounded-lg shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-gray-900 py-2 px-4 rounded-t-lg">
          <div className="p-2   flex items-center">
            <div className="flex items-center">
              <img
                src={selectedConnection.photoUrl}
                alt={`${selectedConnection.firstName} ${selectedConnection.lastName}`}
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <p className="font-semibold">{`${selectedConnection.firstName} ${selectedConnection.lastName}`}</p>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500">
            <X />
          </button>
        </div>

        {/* Chat messages area */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 flex ${message.sender === user._id ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`${
                  message.sender === user._id ? "bg-green-600" : "bg-gray-700"
                } p-2 rounded-lg max-w-xs`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="p-2 bg-gray-900 rounded-b-lg flex items-center">
          <p className="px-2"><ImageOffIcon/> </p>
          <input
            type="text"
            className="flex-1 bg-gray-700 p-2 rounded-lg outline-none"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="ml-2 p-2 bg-green-600 hover:bg-green-700 rounded-lg"
            onClick={handleSendMessage}
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxModal;






 