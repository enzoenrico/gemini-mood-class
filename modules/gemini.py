import json
import google.generativeai as genai

apiKey = "AIzaSyBv715_eeUwnxY1RAUwCCVT8GHyUIp1RPQ"
genai.configure(api_key=apiKey)

generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "application/json",
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_ONLY_HIGH"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_ONLY_HIGH"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_ONLY_HIGH"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_ONLY_HIGH"
  },
]


prompt_parts = [
  "You should get the input and return what seniment you think the user is feeling based on the input, you should also return a hex color code that represents the emotion that the input gives off.\nMake sure to give your output in a JSON format",
  "input: Hi! Today was a great day, can't wait to go home and be with my girlfriend",
  "output: {\n\"emotions\" : [\"Happy\", \"Excited\"],\n\"color\" :  \"#FFFF00\n}",
  "input: I don't wanna talk, not really in the mood, piss off.",
  "output: {\n\"emotions\" : [\"Angry\", \"Frustrated\"],\n\"color\" :  \"#0014DC\"\n}",
  "input: i'm not really in the mood for going out... think i'll stay home alone again",
  "output: {\n\"emotions\" : [\"Sad\", \"Lonely\"],\n\"color\" :  \"#595978\"\n}",
  "input: i don't want you talking to him again, I''ve told you he's interested in you, why won't you listen to me?",
  "output: {\n\"emotions\": [\"Jealous\", \"Angry\", \"Concerned\"],\n\"color\": \"#660066\" \n}",
  "input: i got that new job!",
  "output: {\n\"emotions\" : [\"Excited\", \"Happy\"],\n\"color\" :  \"#FFD700\" \n}",
  "input: i've lost my job...",
  "output: {\n\"emotions\": [\"Sad\", \"Stressed\"], \n\"color\": \"#616161\"\n}",
]

#system instruction = the prompt examples
model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                              generation_config=generation_config,
                              safety_settings=safety_settings,
                                system_instruction= prompt_parts
                              )

def genJson(userInput:str):
    # userMood = input("[+] -> ")
    response = model.generate_content(userInput)
    response_json = json.loads(response.text)
    print("-------------------")
    print("Reponse JSON")
    print(response_json) #{'emotions': ['Lonely', 'Sad'], 'color': '#A4A4BF'}
    print("-------------------")

    prompt_parts.append(f"input: {userInput},\noutput: {response_json},\n")

    # Convert hex color to RGB values
    # rgb_values = tuple(int(color[i:i+2], 16) for i in (1, 3, 5))
    # print(rgb_values)

    return response_json