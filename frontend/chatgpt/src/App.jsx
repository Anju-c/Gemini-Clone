import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [model, setModel] = useState("Gemini 2.5 Flash");
  const[socket,setsocket]=useState(null)
  useEffect(()=>{
    const ws=new WebSocket("ws://localhost:3008")
    setsocket(ws)
  },[])
  

  const sendmsg = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    axios
      .post("http://localhost:3008/chat", { chat: input, model })
      .then((res) => {
        const botMsg = { sender: "bot", text: res.data.ans || "No response." };
        setMessages((prev) => [...prev, botMsg]);
        setLoading(false);
      })
      .catch((err) => {
        const errorMsg = { sender: "bot", text: "Error: " + err.message };
        setMessages((prev) => [...prev, errorMsg]);
        setLoading(false);
      });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") sendmsg();
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">AI Chat Assistant</div>

      {/* Model Selection */}
      <div className="model-select">
        <label>Model:</label>
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="Gemini 2.5 Pro">Gemini 2.5 Pro</option>
          <option value="Gemini 2.5 Flash">Gemini 2.5 Flash</option>
          <option value="gemini-2.5-flash-lite-preview-06-17">
            Gemini 2.5 Flash Lite
          </option>
        </select>
      </div>

      {/* Messages */}
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-bubble ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="chat-bubble bot">Typing<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></div>
        )}
      </div>

      {/* Input */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnter}
        />
        <button onClick={sendmsg}>Send</button>
      </div>
    </div>
  );
}

export default App;
