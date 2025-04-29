class DialogManager:
    def __init__(self):
        print("DialogManager initialized")
    
    def handle_dialog(self, message):
       if "hello" in message.lower():
           print("Hello!")
       else:
           print("I do not understand")