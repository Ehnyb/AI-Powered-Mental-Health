from flask import Flask, request, jsonify  
from flask_cors import CORS  
from transformers import AutoModelForCausalLM, AutoTokenizer
import random  
import logging

app = Flask(__name__)
CORS(app)  

model_name = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

anime_quotes = {
    "happy": [
        "“A smile is the best way to get yourself out of a tight spot, even if it’s fake.” — Sai (Naruto)",
        "“The world isn’t as bad as you think.” — Celty Sturluson (Durarara!!)",
        "“Enjoy the little detours. You may not like where you end up, but you’ll love the memories you make along the way.” — Ging Freecss (Hunter x Hunter)"
    ],
    "excited": [
        "“Power comes in response to a need, not a desire. You have to create that need.” — Goku (Dragon Ball Z)",
        "“Adventure is out there!” — Edward Elric (Fullmetal Alchemist)",
        "“Go beyond your limits! Plus Ultra!” — All Might (My Hero Academia)"
    ],
    "content": [
        "“A lesson without pain is meaningless. But after you endure it, you will gain a heart strong enough to overcome anything.” — Edward Elric (Fullmetal Alchemist)",
        "“Sometimes, we have to live in the moment to appreciate the calm.” — Misaki Ayuzawa (Maid Sama)"
    ],
    "joyful": [
        "“Happiness depends on each person. If you think you're happy, then you must be happy.” — Rin Okumura (Blue Exorcist)"
    ],
    "grateful": [
        "“Be thankful for what you have. You’ll end up having more.” — Lucy Heartfilia (Fairy Tail)",
        "“Cherish every single experience.” — Hinata Hyuga (Naruto)"
    ],
    "proud": [
        "“If you don’t take pride in what you do, you’re bound to fail.” — Kakashi Hatake (Naruto)",
        "“I am me! I’m not anyone else!” — Rukia Kuchiki (Bleach)"
    ],
    "motivated": [
        "“Forgetting is like a wound. The wound may heal, but it has already left a scar.” — Monkey D. Luffy (One Piece)",
        "“Whether a fish lives in a clear stream or a water ditch, so long as it continues swimming forward, it will grow up beautifully.” — Koro Sensei (Assassination Classroom)"
    ],
    "hopeful": [
        "“A lesson without pain is meaningless. But with pain, you learn to grow.” — Edward Elric",
        "“It’s not the world that’s messed up; it’s the way people look at it.” — Kaneki Ken (Tokyo Ghoul)"
    ],
    "sad": [
        "“Fear is not evil. It tells you what your weakness is. And once you know your weakness, you can become stronger.” — Gildarts Clive (Fairy Tail)",
        "“Forgetting something doesn't mean it never happened.” — Celty Sturluson (Durarara!!)"
    ],
    "lonely": [
        "“A person grows up when they’re able to overcome hardships. Protection is important, but there are some things a person must learn on their own.” — Jiraiya (Naruto)"
    ],
    "frustrated": [
        "“If you don’t take risks, you can’t create a future.” — Monkey D. Luffy (One Piece)"
    ],
    "angry": [
        "“Anger only makes things worse. Calm your heart.” — Haku (Naruto)"
    ],
    "fearful": [
        "“Fear is a necessary evil. Without it, you won’t grow stronger.” — Gildarts Clive (Fairy Tail)"
    ],
    "anxious": [
        "“Take a deep breath and remind yourself: You’ve got this.” — Hinata Shoyo (Haikyuu!!)"
    ],
    "jealous": [
        "“You should enjoy the little detours.” — Ging Freecss (Hunter x Hunter)"
    ],
    "insecure": [
        "“To know sorrow is not terrifying. What is terrifying is to know you can’t go back to the happiness you could have.” — Matsumoto Rangiku (Bleach)"
    ],
    "overwhelmed": [
        "“The world is not beautiful, therefore it is.” — Kino (Kino’s Journey)"
    ],
    "disappointed": [
        "“The moment you think of giving up, think of the reason why you held on so long.” — Natsu Dragneel (Fairy Tail)"
    ],
    "neutral": [
        "“Keep moving forward.” — Eren Yeager (Attack on Titan)"
    ],
    "bored": [
        "“Don’t sit around waiting for something to happen; make it happen.” — Yato (Noragami)"
    ],
    "curious": [
        "“Isn’t it interesting how life surprises you in unexpected ways?” — Lelouch (Code Geass)"
    ],
    "confused": [
        "“Even when you’re lost, keep going.” — Guts (Berserk)"
    ],
    "tired": [
        "“Rest when you need to, but never give up.” — Jiraiya (Naruto)"
    ],
    "restless": [
        "“There is no shortcut to peace.” — Kakashi Hatake (Naruto)"
    ],
    "indifferent": [
        "“Whether you care or not, life keeps moving.” — Shikamaru (Naruto)"
    ],
    "stressed": [
        "“Calm your mind, breathe, and take things one step at a time.” — Tanjiro Kamado (Demon Slayer)"
    ],
    "peaceful": [
        "“Peace isn’t always a destination; sometimes, it’s a journey.” — Kenshin Himura (Rurouni Kenshin)"
    ],
    "nostalgic": [
        "“Cherish your memories, for they are the proof of your existence.” — Ginko (Mushishi)"
    ],
    "love": [
        "“Being able to love is a gift.” — Taiga Aisaka (Toradora!)"
    ],
    "romantic": [
        "“When you fall in love, you see the world differently.” — Yui Hirasawa (K-On!)"
    ],
    "betrayed": [
        "“Even if you feel betrayed, don’t lose your kindness.” — Misaki Ayuzawa (Maid Sama)"
    ],
    "guilty": [
        "“Everyone makes mistakes. It’s how we grow.” — Kamado Tanjiro (Demon Slayer)"
    ],
    "determined": [
        "“Believe in yourself and create your own destiny.” — Naruto Uzumaki (Naruto)"
    ]
}

def get_suggestions(mood):
    if mood in anime_quotes:
        return random.choice(anime_quotes[mood])
    else:
        return f"We don’t have a specific quote for '{mood}', but remember: 'The journey of life is about moving forward, even in uncertainty.'"

logging.basicConfig(level=logging.INFO)

@app.route('/checkin', methods=['POST'])
def check_in():
    try:
        data = request.get_json()
        if not data or 'mood' not in data:
            return jsonify({"error": "Invalid request, 'mood' is missing"}), 400
        
        mood = data.get('mood', 'neutral').lower()
        logging.info(f"Received mood: {mood}")
        suggestion = get_suggestions(mood)
        logging.info(f"Generated suggestion: {suggestion}")
        return jsonify({"suggestion": f"Hey Bestie! {suggestion}"})
    
    except Exception as e:
        logging.error(f"Error: {str(e)}")
        return jsonify({"error": "An error occurred. Please try again."}), 500

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Mental Health Check-In API!"

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001)
