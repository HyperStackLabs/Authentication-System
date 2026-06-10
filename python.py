import requests

messages = []
url = "https://api.longcat.chat/openai/v1/chat/completions"

headers = {
    "Authorization": f"Bearer ak_2pT2LN0cB8048lP3UP2vY3Al7qT32",
    "Content-Type": "application/json"
}

while True:
    ui_input = input("Type in your prompt: ").strip()

    if ui_input.lower() == 'exit':
        break
    if not ui_input:
        continue

    messages.append({"role": "user", "content": ui_input})

    data = {
        "model": "LongCat-Flash-Thinking",
        "messages": messages,
        "max_tokens": 1000,
        "temperature": 0.8
    }

    try:
        response = requests.post(url, headers=headers, json=data, timeout=60)
        response.raise_for_status()

        result = response.json()
        assistant_reply = result["choices"][0]["message"]["content"]

        # Store assistant reply
        messages.append({"role": "assistant", "content": assistant_reply})

        print(assistant_reply)

    except requests.exceptions.RequestException as e:
        print("Request failed:", e)
    except (KeyError, IndexError, ValueError) as e:
        print("Unexpected response format:", e)
        print("Raw response:", response.text)