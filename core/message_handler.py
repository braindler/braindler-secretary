from dialog_manager import DialogManager


class MessageHandler:
    def __init__(self):
        print("MessageHandler initialized")
        self.dialog_manager = DialogManager()

    def handle_message(self, message):
        print(f"Received message: {message}")       
        self.dialog_manager.handle_dialog(message.text)