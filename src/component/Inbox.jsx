import React, { useState } from 'react';

const Inbox = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Important work', timestamp: '06-01-2025 06:21 PM', file: null },
    { id: 2, text: 'Any internal massages', timestamp: '25-11-2024 11:49 AM', file: null },
    { id: 3, text: 'hi', timestamp: '26-04-2025 11:41 PM', file: null },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMessage = () => {
    if (newMessage.trim() || selectedFile) {
      const now = new Date();
      const timestamp = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
      setMessages([...messages, { id: messages.length + 1, text: newMessage || 'No message', timestamp, file: selectedFile }]);
      setNewMessage('');
      setSelectedFile(null);
      setIsModalOpen(false);
    }
  };

  const handleRemoveMessage = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileOpen = (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      const fileType = file.type.split('/')[0];
      if (fileType === 'image' || fileType === 'application') {
        window.open(url, '_blank');
      } else {
        alert('Unsupported file type. Only images and PDFs are supported.');
      }
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  };

  return (
    <div className="p-6 w-full h-[73vh] relative overflow-y-scroll scroller bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-2xl transform transition-all duration-300 hover:shadow-xl border border-gray-100">
      <div className="mb-4 flex items-center justify-between sticky top-0 left-0 bg-gray-200/20 backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-black">
          Inbox
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 px-3 bg-[#397BD0] text-2xl text-white rounded-full hover:bg-[#2a5ca0] transition-all duration-200"
        >
          <i className="ri-add-line"></i>
        </button>
      </div>
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="flex justify-between items-center p-4 bg-[#397BD0] bg-opacity-10 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100"
          >
            <div>
              <p className="text-lg font-semibold text-white">{message.text}</p>
              {message.file && (
                <p
                  className="text-sm text-white/70 italic cursor-pointer underline"
                  onClick={() => handleFileOpen(message.file)}
                >
                  Attached: {message.file.name}
                </p>
              )}
              <p className="text-sm text-white/70 italic">{message.timestamp}</p>
            </div>
            <button
              onClick={() => handleRemoveMessage(message.id)}
              className="p-2 px-3 bg-red-500 text-white rounded-full hover:bg-gray-800 transition-all duration-200"
            >
              <i className="ri-delete-bin-line"></i>
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-96">
            <h3 className="text-xl font-bold text-[#397BD0] mb-4">New Message</h3>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-3 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#397BD0] text-gray-700"
              rows="3"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Attach File</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#397BD0]"
              />
              {selectedFile && <p className="text-sm text-gray-500 mt-1">Selected: {selectedFile.name}</p>}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 px-4 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-all duration-200"
              >
                Close
              </button>
              <button
                onClick={handleAddMessage}
                className="p-2 px-4 bg-gradient-to-r from-[#397BD0] to-black text-white rounded-lg hover:from-[#2a5ca0] hover:to-gray-800 transition-all duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inbox;