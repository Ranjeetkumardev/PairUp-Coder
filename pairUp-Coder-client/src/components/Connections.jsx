import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/conectionSlice";
import { MessageSquare, MessageSquareTextIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatBox from "./chatBox";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const navigate = useNavigate()
  const handleChatClick = (id) => {
    navigate(`/chatbox/${id}`);
  };
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  

  if (!connections) return;

  if (connections.length === 0) return <h1> No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Your Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div
            key={_id}
            className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div> 
            <div className="ml-auto mr-2"> 
            <p className="p-2 hover:bg-base-100 cursor-pointer rounded-md"    onClick={() => {
          setSelectedConnection(connection); // Select the first connection
          setIsChatOpen(true);
        }}><MessageSquareTextIcon/> </p>
           </div>
         
          </div>
        );
      })}
      {isChatOpen && <ChatBox   selectedConnection={selectedConnection} // Pass the selected user
          onClose={() => {
            setIsChatOpen(false);
            setSelectedConnection(null); // Reset selected connection on close
          }}/> }
      
    </div>
  );
};
export default Connections;
