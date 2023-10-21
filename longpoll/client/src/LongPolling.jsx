import { useEffect, useState } from "react";
import axios from "axios";

const LongPolling = () => {
	const [messages, setMessages] = useState([]);
	const [value, setValue] = useState("");

	useEffect(() => {
		subscribe();
	}, []);

	const subscribe = async () => {
		try {
			const { data } = await axios.get("http://localhost:5000/get-messages");
			setMessages((prev) => [data, ...prev]);
			await subscribe();
		} catch (e) {
			setTimeout(() => {
				subscribe();
			}, 500);
		}
	};

	const sendMessage = async () => {
		await axios.post("http://localhost:5000/new-messages", {
			message: value,
			id: Date.now(),
		});
		setValue("");
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

export default LongPolling;
