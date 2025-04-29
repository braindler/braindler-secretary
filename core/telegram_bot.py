"""
This module provides a basic implementation for a Telegram bot
that establishes a connection to the Telegram Bot API and waits for incoming messages.
"""
import json

from message_handler import MessageHandler


def load_config(config_path="config.json"):
    """Loads configuration from a JSON file."""
    try:
        with open(config_path, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: Configuration file '{config_path}' not found.")
        return None
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in '{config_path}'.")
        return None


class MockTeleBot:
    def __init__(self, token):
        print(f"MockTeleBot initialized with token: {token}")

    def reply_to(self, message, text):
        print(f"Mock reply_to: Message: {message}, Text: {text}")

    def infinity_polling(self):
        print("Mock infinity_polling: Starting polling...")

    def message_handler(self, func):
        def decorator(function):
            print(f"Mock message_handler: {func}")
            return function
        return decorator

def main():
    """Main function to start the bot and keep it running."""
    config = load_config()
    if not config or "telegram_bot_token" not in config:
        print("Error: Telegram bot token not found in config.")
        return

    bot_token = config["telegram_bot_token"]
    try:
        bot = MockTeleBot(bot_token)
        message_handler = MessageHandler()

        @bot.message_handler(func=lambda message: True)
        def handle_message(message):
            message_handler.handle_message(message)
            bot.reply_to(message, "Hello! I'm listening...")     

        print("Telegram bot started. Waiting for messages...")
        bot.infinity_polling()

    except Exception as e:
        print(f"Error: Unable to start Telegram bot: {e}")

if __name__ == "__main__":
    main()
