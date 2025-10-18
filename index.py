import json
import asyncio
import logging
from typing import Optional, Dict, Any
import aiohttp
from datetime import datetime


def load_config(config_path="config.json"):
    """Loads configuration from a JSON file."""
    try:
        with open(config_path, "r", encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: Configuration file '{config_path}' not found.")
        return None
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in '{config_path}'.")
        return None
    except PermissionError:
        print(f"Error: Permission denied accessing '{config_path}'.")
        return None
    except Exception as e:
        print(f"Error loading config: {e}")
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
                if name:  # Проверяем, что имя не пустое
                    self.dialog_state["name"] = name
                    self.current_dialog_state = "name_given"
                    response = self.translate('Nice to meet you', self.language)
                else:
                    response = self.fallback_response()
            elif message.lower().find('hello') != -1:
                response = self.translate('Hello!', self.language)
            else:
                response = self.fallback_response()
        elif self.current_dialog_state == "name_given":
            if "hello" in message.lower():                
                response = "Ok"                
                self.current_dialog_state = None
            else:
                response = self.fallback_response()
        
        # Fallback если response остался None
        if response is None:
            response = self.fallback_response()
            
        return response

    
class UnifiedMessageHandler:
    """Unified message handler for all messaging platforms"""
    
    def __init__(self):
        self.dialog_manager = DialogManager()
        self.logger = logging.getLogger(__name__)
    
    async def handle_telegram_message(self, bot: TelegramBot, update: Dict[str, Any]):
        """Handle incoming Telegram message"""
        if "message" in update:
            message = update["message"]
            chat_id = message["chat"]["id"]
            user_id = message["from"]["id"]
            username = message["from"].get("username", "Unknown")
            
            if "text" in message:
                text = message["text"]
                self.logger.info(f"Telegram message from {username}: {text}")
                
                response = self.dialog_manager.handle_dialog(text)
                await bot.send_message(chat_id, response)
                self.logger.info(f"Sent Telegram response: {response}")
    
    async def handle_whatsapp_message(self, bot: WhatsAppBot, webhook_data: Dict[str, Any]):
        """Handle incoming WhatsApp message"""
        if "entry" in webhook_data:
            for entry in webhook_data["entry"]:
                if "changes" in entry:
                    for change in entry["changes"]:
                        if "value" in change and "messages" in change["value"]:
                            for message in change["value"]["messages"]:
                                from_number = message["from"]
                                if "text" in message:
                                    text = message["text"]["body"]
                                    self.logger.info(f"WhatsApp message from {from_number}: {text}")
                                    
                                    response = self.dialog_manager.handle_dialog(text)
                                    await bot.send_message(from_number, response)
                                    self.logger.info(f"Sent WhatsApp response: {response}")
    
    async def handle_line_message(self, bot: LineBot, webhook_data: Dict[str, Any]):
        """Handle incoming Line message"""
        if "events" in webhook_data:
            for event in webhook_data["events"]:
                if event["type"] == "message" and event["message"]["type"] == "text":
                    user_id = event["source"]["userId"]
                    text = event["message"]["text"]
                    self.logger.info(f"Line message from {user_id}: {text}")
                    
                    response = self.dialog_manager.handle_dialog(text)
                    await bot.send_message(user_id, response)
                    self.logger.info(f"Sent Line response: {response}")
    
    async def handle_wechat_message(self, bot: WeChatBot, xml_data: str):
        """Handle incoming WeChat message"""
        # Parse XML data (simplified)
        if "<Content>" in xml_data and "</Content>" in xml_data:
            start = xml_data.find("<Content>") + 9
            end = xml_data.find("</Content>")
            text = xml_data[start:end]
            
            if "<FromUserName>" in xml_data and "</FromUserName>" in xml_data:
                start = xml_data.find("<FromUserName>") + 14
                end = xml_data.find("</FromUserName>")
                openid = xml_data[start:end]
                
                self.logger.info(f"WeChat message from {openid}: {text}")
                
                response = self.dialog_manager.handle_dialog(text)
                await bot.send_message(openid, response)
                self.logger.info(f"Sent WeChat response: {response}")
    
    async def handle_instagram_message(self, bot: InstagramBot, webhook_data: Dict[str, Any]):
        """Handle incoming Instagram message"""
        if "entry" in webhook_data:
            for entry in webhook_data["entry"]:
                if "messaging" in entry:
                    for messaging in entry["messaging"]:
                        if "message" in messaging and "text" in messaging["message"]:
                            sender_id = messaging["sender"]["id"]
                            text = messaging["message"]["text"]
                            self.logger.info(f"Instagram message from {sender_id}: {text}")
                            
                            response = self.dialog_manager.handle_dialog(text)
                            await bot.send_message(sender_id, response)
                            self.logger.info(f"Sent Instagram response: {response}")


class MessageHandler:
    def __init__(self):
        self.dialog_manager = DialogManager()
        self.unified_handler = UnifiedMessageHandler()
    

    def handle_message(self, message):
        return self.dialog_manager.handle_dialog(message.text)


class LineBot:
    """Line Bot integration using Line Messaging API"""
    
    def __init__(self, channel_access_token: str, channel_secret: str):
        self.channel_access_token = channel_access_token
        self.channel_secret = channel_secret
        self.base_url = "https://api.line.me/v2/bot"
        self.session = None
        self.logger = logging.getLogger(__name__)
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def send_message(self, user_id: str, message: str) -> bool:
        """Send text message via Line"""
        url = f"{self.base_url}/message/push"
        headers = {
            "Authorization": f"Bearer {self.channel_access_token}",
            "Content-Type": "application/json"
        }
        data = {
            "to": user_id,
            "messages": [{"type": "text", "text": message}]
        }
        
        try:
            async with self.session.post(url, headers=headers, json=data) as response:
                if response.status == 200:
                    return True
                else:
                    self.logger.error(f"Failed to send Line message: {response.status}")
                    return False
        except Exception as e:
            self.logger.error(f"Error sending Line message: {e}")
            return False


class WeChatBot:
    """WeChat Bot integration using WeChat Official Account API"""
    
    def __init__(self, app_id: str, app_secret: str):
        self.app_id = app_id
        self.app_secret = app_secret
        self.access_token = None
        self.session = None
        self.logger = logging.getLogger(__name__)
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        await self._get_access_token()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def _get_access_token(self):
        """Get WeChat access token"""
        url = "https://api.weixin.qq.com/cgi-bin/token"
        params = {
            "grant_type": "client_credential",
            "appid": self.app_id,
            "secret": self.app_secret
        }
        
        try:
            async with self.session.get(url, params=params) as response:
                if response.status == 200:
                    result = await response.json()
                    self.access_token = result.get("access_token")
        except Exception as e:
            self.logger.error(f"Error getting WeChat access token: {e}")
    
    async def send_message(self, openid: str, message: str) -> bool:
        """Send text message via WeChat"""
        if not self.access_token:
            await self._get_access_token()
            
        url = f"https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token={self.access_token}"
        data = {
            "touser": openid,
            "msgtype": "text",
            "text": {"content": message}
        }
        
        try:
            async with self.session.post(url, json=data) as response:
                if response.status == 200:
                    result = await response.json()
                    return result.get("errcode") == 0
                else:
                    self.logger.error(f"Failed to send WeChat message: {response.status}")
                    return False
        except Exception as e:
            self.logger.error(f"Error sending WeChat message: {e}")
            return False


class InstagramBot:
    """Instagram Direct Bot integration using Instagram Basic Display API"""
    
    def __init__(self, access_token: str, user_id: str):
        self.access_token = access_token
        self.user_id = user_id
        self.base_url = "https://graph.instagram.com"
        self.session = None
        self.logger = logging.getLogger(__name__)
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def send_message(self, recipient_id: str, message: str) -> bool:
        """Send direct message via Instagram"""
        url = f"{self.base_url}/v18.0/me/messages"
        headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }
        data = {
            "recipient": {"id": recipient_id},
            "message": {"text": message}
        }
        
        try:
            async with self.session.post(url, headers=headers, json=data) as response:
                if response.status == 200:
                    result = await response.json()
                    return result.get("id") is not None
                else:
                    self.logger.error(f"Failed to send Instagram message: {response.status}")
                    return False
        except Exception as e:
            self.logger.error(f"Error sending Instagram message: {e}")
            return False


class WhatsAppBot:
    """WhatsApp Bot integration using WhatsApp Business API"""
    
    def __init__(self, access_token: str, phone_number_id: str, verify_token: str):
        self.access_token = access_token
        self.phone_number_id = phone_number_id
        self.verify_token = verify_token
        self.base_url = f"https://graph.facebook.com/v18.0/{phone_number_id}"
        self.session = None
        self.logger = logging.getLogger(__name__)
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def send_message(self, to: str, message: str) -> bool:
        """Send text message via WhatsApp"""
        url = f"{self.base_url}/messages"
        headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }
        data = {
            "messaging_product": "whatsapp",
            "to": to,
            "type": "text",
            "text": {"body": message}
        }
        
        try:
            async with self.session.post(url, headers=headers, json=data) as response:
                if response.status == 200:
                    result = await response.json()
                    return result.get("messages", [{}])[0].get("id") is not None
                else:
                    self.logger.error(f"Failed to send WhatsApp message: {response.status}")
                    return False
        except Exception as e:
            self.logger.error(f"Error sending WhatsApp message: {e}")
            return False
    
    async def send_media(self, to: str, media_url: str, media_type: str, caption: str = "") -> bool:
        """Send media (image, document, etc.) via WhatsApp"""
        url = f"{self.base_url}/messages"
        headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }
        data = {
            "messaging_product": "whatsapp",
            "to": to,
            "type": media_type,
            media_type: {
                "link": media_url,
                "caption": caption
            }
        }
        
        try:
            async with self.session.post(url, headers=headers, json=data) as response:
                if response.status == 200:
                    result = await response.json()
                    return result.get("messages", [{}])[0].get("id") is not None
                else:
                    self.logger.error(f"Failed to send WhatsApp media: {response.status}")
                    return False
        except Exception as e:
            self.logger.error(f"Error sending WhatsApp media: {e}")
            return False
    
    async def verify_webhook(self, mode: str, token: str, challenge: str) -> Optional[str]:
        """Verify webhook for WhatsApp"""
        if mode == "subscribe" and token == self.verify_token:
            return challenge
        return None


class TelegramBot:
    """Telegram Bot integration using Telegram Bot API"""
    
    def __init__(self, token: str):
        self.token = token
        self.base_url = f"https://api.telegram.org/bot{token}"
        self.session = None
        self.logger = logging.getLogger(__name__)
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def get_updates(self, offset: Optional[int] = None, timeout: int = 30) -> Dict[str, Any]:
        """Get updates from Telegram"""
        url = f"{self.base_url}/getUpdates"
        params = {"timeout": timeout}
        if offset:
            params["offset"] = offset
            
        try:
            async with self.session.get(url, params=params) as response:
                if response.status == 200:
                    return await response.json()
                else:
                    self.logger.error(f"Failed to get updates: {response.status}")
                    return {"ok": False, "result": []}
        except Exception as e:
            self.logger.error(f"Error getting updates: {e}")
            return {"ok": False, "result": []}
    
    async def send_message(self, chat_id: int, text: str, parse_mode: str = "HTML") -> bool:
        """Send message to Telegram chat"""
        url = f"{self.base_url}/sendMessage"
        data = {
            "chat_id": chat_id,
            "text": text,
            "parse_mode": parse_mode
        }
        
        try:
            async with self.session.post(url, json=data) as response:
                if response.status == 200:
                    result = await response.json()
                    return result.get("ok", False)
                else:
                    self.logger.error(f"Failed to send message: {response.status}")
                    return False
        except Exception as e:
            self.logger.error(f"Error sending message: {e}")
            return False
    
    async def send_photo(self, chat_id: int, photo: str, caption: str = "") -> bool:
        """Send photo to Telegram chat"""
        url = f"{self.base_url}/sendPhoto"
        data = {
            "chat_id": chat_id,
            "photo": photo,
            "caption": caption
        }
        
        try:
            async with self.session.post(url, json=data) as response:
                if response.status == 200:
                    result = await response.json()
                    return result.get("ok", False)
                else:
                    self.logger.error(f"Failed to send photo: {response.status}")
                    return False
        except Exception as e:
            self.logger.error(f"Error sending photo: {e}")
            return False
    
    async def send_document(self, chat_id: int, document: str, caption: str = "") -> bool:
        """Send document to Telegram chat"""
        url = f"{self.base_url}/sendDocument"
        data = {
            "chat_id": chat_id,
            "document": document,
            "caption": caption
        }
        
        try:
            async with self.session.post(url, json=data) as response:
                if response.status == 200:
                    result = await response.json()
                    return result.get("ok", False)
                else:
                    self.logger.error(f"Failed to send document: {response.status}")
                    return False
        except Exception as e:
            self.logger.error(f"Error sending document: {e}")
            return False


class Backend:
    def __init__(self, bot_token):
        print(f'Backend initialized with token: {bot_token}')        
    
    async def run_telegram_bot(self):
        """Run the Telegram bot with real API integration"""
        config = load_config()        
        
        if not config or "telegram_bot_token" not in config:
            print("Error: Telegram bot token not found in config.")
            return

        bot_token = config["telegram_bot_token"]
        
        # Setup logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        logger = logging.getLogger(__name__)
        
        try:
            message_handler = MessageHandler()
            message_handler.dialog_manager.tone = 'normal'
            message_handler.dialog_manager.language = 'ru'
            
            last_update_id = 0
            
            async with TelegramBot(bot_token) as bot:
                logger.info("Telegram bot started successfully")
                
                while True:
                    try:
                        # Get updates from Telegram
                        updates = await bot.get_updates(offset=last_update_id + 1, timeout=30)
                        
                        if updates.get("ok") and updates.get("result"):
                            for update in updates["result"]:
                                last_update_id = update["update_id"]
                                
                                if "message" in update:
                                    message = update["message"]
                                    chat_id = message["chat"]["id"]
                                    user_id = message["from"]["id"]
                                    username = message["from"].get("username", "Unknown")
                                    
                                    # Handle text messages
                                    if "text" in message:
                                        text = message["text"]
                                        logger.info(f"Received message from {username} ({user_id}): {text}")
                                        
                                        # Process message through dialog manager
                                        response = message_handler.dialog_manager.handle_dialog(text)
                                        
                                        # Send response back to user
                                        await bot.send_message(chat_id, response)
                                        logger.info(f"Sent response to {username}: {response}")
                                    
                                    # Handle photo messages
                                    elif "photo" in message:
                                        photo = message["photo"][-1]  # Get highest resolution
                                        caption = message.get("caption", "")
                                        logger.info(f"Received photo from {username} with caption: {caption}")
                                        
                                        response = "Спасибо за фото! Я получил ваше изображение."
                                        await bot.send_message(chat_id, response)
                                    
                                    # Handle document messages
                                    elif "document" in message:
                                        document = message["document"]
                                        filename = document.get("file_name", "Unknown")
                                        logger.info(f"Received document from {username}: {filename}")
                                        
                                        response = f"Получил документ: {filename}"
                                        await bot.send_message(chat_id, response)
                                    
                                    # Handle other message types
                                    else:
                                        response = "Я пока не умею обрабатывать этот тип сообщений."
                                        await bot.send_message(chat_id, response)
                        
                        # Small delay to prevent overwhelming the API
                        await asyncio.sleep(1)
                        
                    except Exception as e:
                        logger.error(f"Error processing updates: {e}")
                        await asyncio.sleep(5)  # Wait before retrying
                        
        except Exception as e:
            logger.error(f"Error: Unable to start Telegram bot: {e}")
    
    def run(self):
        """Run the bot (legacy method for backward compatibility)"""
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


if __name__ == "__main__":
    # Run the Telegram bot
    backend = Backend("your_random_telegram_bot_token")
    asyncio.run(backend.run_telegram_bot())
