import json


def load_config(config_path="config.json"):
    
    'Loads configuration from a JSON file.'
    try:
        with open(config_path, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: Configuration file \'{config_path}\' not found.")
        return None
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in \'{config_path}\'.")
        return None    

class DialogManager:    
    def __init__(self):        
        self.tone = 'normal'        
        self.current_dialog_state = None
        self.dialog_state = {}
        self.language = 'en'

    def translate(self, text, language):
        if language == 'ru':
            if text == 'Hello!':
                return 'Привет!'
            elif text == 'Nice to meet you':
                return 'Приятно познакомиться'
            elif text == 'I am not sure I understand you':
                return 'Я не уверен, что понимаю вас'
        return text

    def fallback_response(self):
        response = "I am not sure I understand you"
        if self.tone == 'sarcastic':
            response = "Oh, how original."
        response = self.translate(response, self.language)
        return response

    def handle_dialog(self, message):
        response = self.process_dialog(message)
        return response

    def process_dialog(self, message):
        response = None
        if self.current_dialog_state is None:
            if message.lower().find("my name is") != -1:
                name = message.split("my name is", 1)[1].strip()
                self.dialog_state["name"] = name
                self.current_dialog_state = "name_given"
                response = self.translate('Nice to meet you', self.language)
            elif message.lower().find('hello') != -1:
                response = self.translate('Hello!', self.language)
            
            else:
                pass
        elif self.current_dialog_state == "name_given":
            if "hello" in message.lower():                
                response = "Ok"                
                self.current_dialog_state = None                
            pass
        elif self.current_dialog_state == "name_given":
            if "hello" in message.lower():                
                response = "Ok"                
                self.current_dialog_state = None                            
            else:
                pass
        return response

    
class MessageHandler:
    def __init__(self):
        self.dialog_manager = DialogManager()
    

    def handle_message(self, message):
        return self.dialog_manager.handle_dialog(message.text)


class Backend:
    def __init__(self, bot_token):
        print(f'Backend initialized with token: {bot_token}')        
    
    def run(self):
        config = load_config()        
        
        if not config or "telegram_bot_token" not in config:
            print("Error: Telegram bot token not found in config.")
            return

        bot_token = config["telegram_bot_token"]
        try:

            message_handler = MessageHandler()
            message_handler.dialog_manager.tone = 'normal'
            message_handler.dialog_manager.language = 'ru'
            

            class MockMessage:                
                def __init__(self):                    
                    self.text = None                    
            
            class MockFromUser:
                def __init__(self):                    
                    
                    self.username = None
            
            def handle_message(message):                
                response = message_handler.handle_message(message)                
                print(f'DialogManager response: {response}, dialog_state: {message_handler.dialog_manager.dialog_state}')

            messages = ['привет', 'как дела?', 'меня зовут Вася', 'как дела?', 'привет']
            mock_message = MockMessage()
            mock_from_user = MockFromUser()            
            mock_from_user.username = 'user'            
            
            for message in messages:                                
                mock_message.text = message
                print('Mock infinity_polling: Waiting for message...')
                handle_message(mock_message)          
        except Exception as e:
            print(f"Error: Unable to start Backend: {e}")
Backend(bot_token="your_random_telegram_bot_token").run()
