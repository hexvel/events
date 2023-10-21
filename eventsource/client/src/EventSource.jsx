import { useEffect, useState } from "react";
import axios from "axios";

const EventSourcing = () => {
	const [messages, setMessages] = useState([]);
	const [value, setValue] = useState("");

	useEffect(() => {
		subscribe();
	}, []);

	const subscribe = async () => {
		console.log(1);
		const eventSource = new EventSource("http://localhost:5000/connect");
		eventSource.onmessage = function (event) {
			const message = JSON.parse(event.data);
			setMessages((prev) => [message, ...prev]);
		};
	};

	const sendMessage = async () => {
		await axios.post("http://localhost:5000/ne w-messages", {
			message: value,
			id: Date.now(),
		});
	};

	return (
		<div className="center">
			<div>
				<div className="form">
					<input
						type="text"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder="Сообщение"
					/>
					<button onClick={sendMessage}>Отправить</button>
				</div>
				<div className="messages">
					{messages.map((message) => (
						<div className="message" key={message.id}>
							{message.message}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default EventSourcing;
